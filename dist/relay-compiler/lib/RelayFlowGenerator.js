/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayFlowGenerator
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

var _keys2 = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));

var _map2 = _interopRequireDefault(require('babel-runtime/core-js/map'));

var _from2 = _interopRequireDefault(require('babel-runtime/core-js/array/from'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var babelGenerator = require('babel-generator')['default'];

var _require = require('graphql'),
    GraphQLEnumType = _require.GraphQLEnumType,
    GraphQLInputType = _require.GraphQLInputType,
    GraphQLInputObjectType = _require.GraphQLInputObjectType,
    GraphQLInterfaceType = _require.GraphQLInterfaceType,
    GraphQLList = _require.GraphQLList,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLScalarType = _require.GraphQLScalarType,
    GraphQLType = _require.GraphQLType,
    GraphQLUnionType = _require.GraphQLUnionType;

var _require2 = require('./RelaySchemaUtils'),
    isAbstractType = _require2.isAbstractType;

var printBabel = function printBabel(ast) {
  return babelGenerator(ast).code;
};

function generate(node, inputFieldWhiteList) {
  var output = [];
  if (node.kind === 'Root' && node.operation !== 'query') {
    var inputAST = generateInputVariablesType(node, inputFieldWhiteList);
    output.push(printBabel(inputAST));
  }
  var responseAST = require('./RelayIRVisitor').visit(node, RelayCodeGenVisitor);
  output.push(printBabel(responseAST));
  return output.join('\n\n');
}

function makeProp(_ref, concreteType) {
  var key = _ref.key,
      schemaName = _ref.schemaName,
      value = _ref.value,
      conditional = _ref.conditional,
      nodeType = _ref.nodeType,
      nodeSelections = _ref.nodeSelections;

  if (nodeType) {
    value = transformScalarField(nodeType, selectionsToBabel([(0, _from2['default'])(nodeSelections.values())]));
  }
  if (schemaName === '__typename' && concreteType) {
    value = stringLiteralTypeAnnotation(concreteType);
  }
  var typeProperty = readOnlyObjectTypeProperty(key, value);
  if (conditional) {
    typeProperty.optional = true;
  }
  return typeProperty;
}

var isTypenameSelection = function isTypenameSelection(selection) {
  return selection.schemaName === '__typename';
};
var hasTypenameSelection = function hasTypenameSelection(selections) {
  return selections.some(isTypenameSelection);
};
var onlySelectsTypename = function onlySelectsTypename(selections) {
  return selections.every(isTypenameSelection);
};

function selectionsToBabel(selections) {
  var baseFields = new _map2['default']();
  var byConcreteType = {};

  flattenArray(selections).forEach(function (selection) {
    var concreteType = selection.concreteType;

    if (concreteType) {
      byConcreteType[concreteType] = byConcreteType[concreteType] || [];
      byConcreteType[concreteType].push(selection);
    } else {
      var previousSel = baseFields.get(selection.key);

      baseFields.set(selection.key, previousSel ? mergeSelection(selection, previousSel) : selection);
    }
  });

  var types = [];

  if ((0, _keys2['default'])(byConcreteType).length && onlySelectsTypename((0, _from2['default'])(baseFields.values())) && (hasTypenameSelection((0, _from2['default'])(baseFields.values())) || (0, _keys2['default'])(byConcreteType).every(function (type) {
    return hasTypenameSelection(byConcreteType[type]);
  }))) {
    var _loop = function _loop(concreteType) {
      types.push(exactObjectTypeAnnotation([].concat((0, _toConsumableArray3['default'])((0, _from2['default'])(baseFields.values()).map(function (selection) {
        return makeProp(selection, concreteType);
      })), (0, _toConsumableArray3['default'])(byConcreteType[concreteType].map(function (selection) {
        return makeProp(selection, concreteType);
      })))));
    };

    for (var concreteType in byConcreteType) {
      _loop(concreteType);
    }
    // It might be some other type then the listed concrete types. Ideally, we
    // would set the type to diff(string, set of listed concrete types), but
    // this doesn't exist in Flow at the time.
    var otherProp = readOnlyObjectTypeProperty('__typename', stringLiteralTypeAnnotation('%other'));
    otherProp.leadingComments = lineComments("This will never be '%other', but we need some", 'value in case none of the concrete values match.');
    types.push(exactObjectTypeAnnotation([otherProp]));
  } else {
    var selectionMap = selectionsToMap((0, _from2['default'])(baseFields.values()));
    for (var concreteType in byConcreteType) {
      selectionMap = mergeSelections(selectionMap, selectionsToMap(byConcreteType[concreteType].map(function (sel) {
        return (0, _extends3['default'])({}, sel, {
          conditional: true
        });
      })));
    }
    types.push(exactObjectTypeAnnotation((0, _from2['default'])(selectionMap.values()).map(function (sel) {
      return makeProp(sel);
    })));
  }

  if (!types.length) {
    return exactObjectTypeAnnotation([]);
  }

  return types.length > 1 ? require('babel-types').unionTypeAnnotation(types) : types[0];
}

function lineComments() {
  for (var _len = arguments.length, lines = Array(_len), _key = 0; _key < _len; _key++) {
    lines[_key] = arguments[_key];
  }

  return lines.map(function (line) {
    return { type: 'CommentLine', value: ' ' + line };
  });
}

function stringLiteralTypeAnnotation(value) {
  var annotation = require('babel-types').stringLiteralTypeAnnotation();
  annotation.value = value;
  return annotation;
}

function mergeSelection(a, b) {
  if (!a) {
    return (0, _extends3['default'])({}, b, {
      conditional: true
    });
  }
  return (0, _extends3['default'])({}, a, {
    nodeSelections: a.nodeSelections ? mergeSelections(a.nodeSelections, b.nodeSelections) : null,
    conditional: a.conditional && b.conditional
  });
}

function mergeSelections(a, b) {
  var merged = new _map2['default']();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = a.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          key = _step$value[0],
          value = _step$value[1];

      merged.set(key, value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = b.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _step2.value,
          key = _step2$value[0],
          value = _step2$value[1];

      merged.set(key, mergeSelection(a.get(key), value));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return merged;
}

var RelayCodeGenVisitor = {
  leave: {
    Root: function Root(node) {
      return require('babel-types').exportNamedDeclaration(require('babel-types').typeAlias(require('babel-types').identifier(node.name + 'Response'), null, selectionsToBabel(node.selections)), [], null);
    },
    Fragment: function Fragment(node) {
      return require('babel-types').exportNamedDeclaration(require('babel-types').typeAlias(require('babel-types').identifier(node.name), null, selectionsToBabel(node.selections)), [], null);
    },
    InlineFragment: function InlineFragment(node) {
      var typeCondition = node.typeCondition;
      return flattenArray(node.selections).map(function (typeSelection) {
        return isAbstractType(typeCondition) ? (0, _extends3['default'])({}, typeSelection, {
          conditional: true
        }) : (0, _extends3['default'])({}, typeSelection, {
          concreteType: typeCondition.toString()
        });
      });
    },
    Condition: function Condition(node) {
      return flattenArray(node.selections).map(function (selection) {
        return (0, _extends3['default'])({}, selection, {
          conditional: true
        });
      });
    },
    ScalarField: function ScalarField(node) {
      return [{
        key: node.alias || node.name,
        schemaName: node.name,
        value: transformScalarField(node.type)
      }];
    },
    LinkedField: function LinkedField(node) {
      return [{
        key: node.alias || node.name,
        schemaName: node.name,
        nodeType: node.type,
        nodeSelections: selectionsToMap(flattenArray(node.selections))
      }];
    },
    FragmentSpread: function FragmentSpread(node) {
      return [];
    }
  }
};

function selectionsToMap(selections) {
  var map = new _map2['default']();
  selections.forEach(function (selection) {
    var previousSel = map.get(selection.key);
    map.set(selection.key, previousSel ? mergeSelection(previousSel, selection) : selection);
  });
  return map;
}

function flattenArray(arrayOfArrays) {
  var result = [];
  arrayOfArrays.forEach(function (array) {
    return result.push.apply(result, (0, _toConsumableArray3['default'])(array));
  });
  return result;
}

function transformScalarField(type, objectProps) {
  if (type instanceof GraphQLNonNull) {
    return transformNonNullableScalarField(type.ofType, objectProps);
  } else {
    return require('babel-types').nullableTypeAnnotation(transformNonNullableScalarField(type, objectProps));
  }
}

function arrayOfType(thing) {
  return require('babel-types').genericTypeAnnotation(require('babel-types').identifier('$ReadOnlyArray'), require('babel-types').typeParameterInstantiation([thing]));
}

function exactObjectTypeAnnotation(props) {
  var typeAnnotation = require('babel-types').objectTypeAnnotation(props);
  typeAnnotation.exact = true;
  return typeAnnotation;
}

function readOnlyObjectTypeProperty(key, value) {
  var prop = require('babel-types').objectTypeProperty(require('babel-types').identifier(key), value);
  prop.variance = 'plus';
  return prop;
}

function transformGraphQLScalarType(type) {
  switch (type.name) {
    case 'ID':
    case 'String':
    case 'Url':
      return require('babel-types').stringTypeAnnotation();
    case 'Float':
    case 'Int':
      return require('babel-types').numberTypeAnnotation();
    case 'Boolean':
      return require('babel-types').booleanTypeAnnotation();
    default:
      return require('babel-types').anyTypeAnnotation();
  }
}

function transformGraphQLEnumType(type) {
  // TODO create a flow type for enums
  return require('babel-types').unionTypeAnnotation(type.getValues().map(function (_ref2) {
    var value = _ref2.value;
    return stringLiteralTypeAnnotation(value);
  }));
}

function transformNonNullableScalarField(type, objectProps) {
  if (type instanceof GraphQLList) {
    return arrayOfType(transformScalarField(type.ofType, objectProps));
  } else if (type instanceof GraphQLObjectType || type instanceof GraphQLUnionType || type instanceof GraphQLInterfaceType) {
    return objectProps;
  } else if (type instanceof GraphQLScalarType) {
    return transformGraphQLScalarType(type);
  } else if (type instanceof GraphQLEnumType) {
    return transformGraphQLEnumType(type);
  } else {
    throw new Error('Could not convert from GraphQL type ' + type.toString());
  }
}

function transformNonNullableInputType(type, inputFieldWhiteList) {
  if (type instanceof GraphQLList) {
    return arrayOfType(transformInputType(type.ofType, inputFieldWhiteList));
  } else if (type instanceof GraphQLScalarType) {
    return transformGraphQLScalarType(type);
  } else if (type instanceof GraphQLEnumType) {
    return transformGraphQLEnumType(type);
  } else if (type instanceof GraphQLInputObjectType) {
    var fields = type.getFields();
    var props = (0, _keys2['default'])(fields).map(function (key) {
      return fields[key];
    }).filter(function (field) {
      return !inputFieldWhiteList || inputFieldWhiteList.indexOf(field.name) < 0;
    }).map(function (field) {
      var property = require('babel-types').objectTypeProperty(require('babel-types').identifier(field.name), transformInputType(field.type, inputFieldWhiteList));
      if (!(field.type instanceof GraphQLNonNull)) {
        property.optional = true;
      }
      return property;
    });
    return exactObjectTypeAnnotation(props);
  } else {
    throw new Error('Could not convert from GraphQL type ' + type.toString());
  }
}

function transformInputType(type, inputFieldWhiteList) {
  if (type instanceof GraphQLNonNull) {
    return transformNonNullableInputType(type.ofType, inputFieldWhiteList);
  } else {
    return require('babel-types').nullableTypeAnnotation(transformNonNullableInputType(type, inputFieldWhiteList));
  }
}

function generateInputVariablesType(node, inputFieldWhiteList) {
  return require('babel-types').exportNamedDeclaration(require('babel-types').typeAlias(require('babel-types').identifier(node.name + 'Variables'), null, exactObjectTypeAnnotation(node.argumentDefinitions.map(function (arg) {
    var property = require('babel-types').objectTypeProperty(require('babel-types').identifier(arg.name), transformInputType(arg.type, inputFieldWhiteList));
    if (!(arg.type instanceof GraphQLNonNull)) {
      property.optional = true;
    }
    return property;
  }))), [], null);
}

module.exports = { generate: generate };
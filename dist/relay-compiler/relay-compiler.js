/**
 * Relay v1.0.0-rc.4
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayCompilerPublic
	 * @format
	 */

	'use strict';

	module.exports = {
	  Compiler: __webpack_require__(34),
	  FileIRParser: __webpack_require__(56),
	  FileWriter: __webpack_require__(57),
	  IRTransforms: __webpack_require__(61),
	  Runner: __webpack_require__(52)
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/invariant");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-types");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelaySchemaUtils
	 * 
	 * @format
	 */

	'use strict';

	var assertAbstractType = __webpack_require__(3).assertAbstractType,
	    getNamedType = __webpack_require__(3).getNamedType,
	    getNullableType = __webpack_require__(3).getNullableType,
	    isType = __webpack_require__(3).isType,
	    GraphQLInterfaceType = __webpack_require__(3).GraphQLInterfaceType,
	    GraphQLList = __webpack_require__(3).GraphQLList,
	    GraphQLObjectType = __webpack_require__(3).GraphQLObjectType,
	    GraphQLSchema = __webpack_require__(3).GraphQLSchema,
	    GraphQLUnionType = __webpack_require__(3).GraphQLUnionType,
	    print = __webpack_require__(3).print,
	    typeFromAST = __webpack_require__(3).typeFromAST;

	var ID = 'id';
	var ID_TYPE = 'ID';

	/**
	 * Determine if the given type may implement the named type:
	 * - it is the named type
	 * - it implements the named interface
	 * - it is an abstract type and *some* of its concrete types may
	 *   implement the named type
	 */
	function mayImplement(schema, type, typeName) {
	  var unmodifiedType = getRawType(type);
	  return unmodifiedType.toString() === typeName || implementsInterface(unmodifiedType, typeName) || isAbstractType(unmodifiedType) && hasConcreteTypeThatImplements(schema, unmodifiedType, typeName);
	}

	function canHaveSelections(type) {
	  return type instanceof GraphQLObjectType || type instanceof GraphQLInterfaceType;
	}

	/**
	 * Implements duck typing that checks whether a type has an id field of the ID
	 * type. This is approximating what we can hopefully do with the __id proposal
	 * a bit more cleanly.
	 *
	 * https://github.com/graphql/graphql-future/blob/master/01%20-%20__id.md
	 */
	function hasID(schema, type) {
	  var unmodifiedType = getRawType(type);
	  __webpack_require__(1)(unmodifiedType instanceof GraphQLObjectType || unmodifiedType instanceof GraphQLInterfaceType, 'RelaySchemaUtils.hasID(): Expected a concrete type or interface, ' + 'got type `%s`.', type);
	  var idType = schema.getType(ID_TYPE);
	  var idField = unmodifiedType.getFields()[ID];
	  return idField && getRawType(idField.type) === idType;
	}

	/**
	 * Determine if a type is abstract (not concrete).
	 *
	 * Note: This is used in place of the `graphql` version of the function in order
	 * to not break `instanceof` checks with Jest. This version also unwraps
	 * non-null/list wrapper types.
	 */
	function isAbstractType(type) {
	  var rawType = getRawType(type);
	  return rawType instanceof GraphQLInterfaceType || rawType instanceof GraphQLUnionType;
	}

	/**
	 * Get the unmodified type, with list/null wrappers removed.
	 */
	function getRawType(type) {
	  return __webpack_require__(80)(getNamedType(type));
	}

	/**
	 * Gets the non-list type, removing the list wrapper if present.
	 */
	function getSingularType(type) {
	  var unmodifiedType = type;
	  while (unmodifiedType instanceof GraphQLList) {
	    unmodifiedType = unmodifiedType.ofType;
	  }
	  return unmodifiedType;
	}

	/**
	 * @public
	 */
	function implementsInterface(type, interfaceName) {
	  return getInterfaces(type).some(function (interfaceType) {
	    return interfaceType.toString() === interfaceName;
	  });
	}

	/**
	 * @private
	 */
	function hasConcreteTypeThatImplements(schema, type, interfaceName) {
	  return isAbstractType(type) && getConcreteTypes(schema, type).some(function (concreteType) {
	    return implementsInterface(concreteType, interfaceName);
	  });
	}

	/**
	 * @private
	 */
	function getConcreteTypes(schema, type) {
	  return schema.getPossibleTypes(assertAbstractType(type));
	}

	/**
	 * @private
	 */
	function getInterfaces(type) {
	  if (type instanceof GraphQLObjectType) {
	    return type.getInterfaces();
	  }
	  return [];
	}

	/**
	 * @public
	 *
	 * Determine if an AST node contains a fragment/operation definition.
	 */
	function isOperationDefinitionAST(ast) {
	  return ast.kind === 'FragmentDefinition' || ast.kind === 'OperationDefinition';
	}

	/**
	 * @public
	 *
	 * Determine if an AST node contains a schema definition.
	 */
	function isSchemaDefinitionAST(ast) {
	  return ast.kind === 'DirectiveDefinition' || ast.kind === 'EnumTypeDefinition' || ast.kind === 'InputObjectTypeDefinition' || ast.kind === 'InterfaceTypeDefinition' || ast.kind === 'ObjectTypeDefinition' || ast.kind === 'ScalarTypeDefinition' || ast.kind === 'TypeExtensionDefinition' || ast.kind === 'UnionTypeDefinition';
	}

	function assertTypeWithFields(type) {
	  __webpack_require__(1)(type instanceof GraphQLObjectType || type instanceof GraphQLInterfaceType, 'RelaySchemaUtils: Expected type `%s` to be an object or interface type.', type);
	  return type;
	}

	/**
	 * Helper for calling `typeFromAST()` with a clear warning when the type does
	 * not exist. This enables the pattern `assertXXXType(getTypeFromAST(...))`,
	 * emitting distinct errors for unknown types vs types of the wrong category.
	 */
	function getTypeFromAST(schema, ast) {
	  var type = typeFromAST(schema, ast);
	  __webpack_require__(1)(isType(type), 'RelaySchemaUtils: Unknown type `%s`.', print(ast));
	  return type;
	}

	/**
	 * Given a defitinition AST node, gives us a unique name for that node.
	 * Note: this can be tricky for type extensions: while types always have one
	 * name, type extensions are defined by everything inside them.
	 *
	 * TODO @mmahoney: t16495627 write tests or remove uses of this
	 */
	function definitionName(definition) {
	  switch (definition.kind) {
	    case 'DirectiveDefinition':
	    case 'EnumTypeDefinition':
	    case 'FragmentDefinition':
	    case 'InputObjectTypeDefinition':
	    case 'InterfaceTypeDefinition':
	    case 'ObjectTypeDefinition':
	    case 'ScalarTypeDefinition':
	    case 'UnionTypeDefinition':
	      return definition.name.value;
	    case 'OperationDefinition':
	      return definition.name ? definition.name.value : '';
	    case 'TypeExtensionDefinition':
	      return definition.toString();
	    case 'SchemaDefinition':
	      return 'schema';
	  }
	  throw new Error('Unkown definition kind: ' + definition.kind);
	}

	module.exports = {
	  assertTypeWithFields: assertTypeWithFields,
	  definitionName: definitionName,
	  canHaveSelections: canHaveSelections,
	  getNullableType: getNullableType,
	  getRawType: getRawType,
	  getSingularType: getSingularType,
	  getTypeFromAST: getTypeFromAST,
	  hasID: hasID,
	  implementsInterface: implementsInterface,
	  isAbstractType: isAbstractType,
	  isOperationDefinitionAST: isOperationDefinitionAST,
	  isSchemaDefinitionAST: isSchemaDefinitionAST,
	  mayImplement: mayImplement
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayCompilerContext
	 * @format
	 */

	'use strict';

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ImmutableList = __webpack_require__(12).List,
	    ImmutableOrderedMap = __webpack_require__(12).OrderedMap,
	    Record = __webpack_require__(12).Record;

	var Document = Record({
	  errors: null,
	  name: null,
	  node: null
	});

	/**
	 * An immutable representation of a corpus of documents being compiled together.
	 * For each document, the context stores the IR and any validation errors.
	 */

	var RelayCompilerContext = function () {
	  function RelayCompilerContext(schema) {
	    (0, _classCallCheck3['default'])(this, RelayCompilerContext);

	    this._documents = new ImmutableOrderedMap();
	    this.schema = schema;
	  }

	  /**
	   * Returns the documents for the context in the order they were added.
	   */


	  RelayCompilerContext.prototype.documents = function documents() {
	    return this._documents.valueSeq().map(function (doc) {
	      return doc.get('node');
	    }).toJS();
	  };

	  RelayCompilerContext.prototype.updateSchema = function updateSchema(schema) {
	    var context = new RelayCompilerContext(schema);
	    context._documents = this._documents;
	    return context;
	  };

	  RelayCompilerContext.prototype.add = function add(node) {
	    __webpack_require__(1)(!this._documents.has(node.name), 'RelayCompilerContext: Duplicate document named `%s`. GraphQL ' + 'fragments and roots must have unique names.', node.name);
	    return this._update(this._documents.set(node.name, new Document({
	      name: node.name,
	      node: node
	    })));
	  };

	  RelayCompilerContext.prototype.addAll = function addAll(nodes) {
	    return nodes.reduce(function (ctx, definition) {
	      return ctx.add(definition);
	    }, this);
	  };

	  RelayCompilerContext.prototype.addError = function addError(name, error) {
	    var record = this._get(name);
	    var errors = record.get('errors');
	    if (errors) {
	      errors = errors.push(error);
	    } else {
	      errors = ImmutableList([error]);
	    }
	    return this._update(this._documents.set(name, record.set('errors', errors)));
	  };

	  RelayCompilerContext.prototype.get = function get(name) {
	    var record = this._documents.get(name);
	    return record && record.get('node');
	  };

	  RelayCompilerContext.prototype.getFragment = function getFragment(name) {
	    var record = this._documents.get(name);
	    var node = record && record.get('node');
	    __webpack_require__(1)(node && node.kind === 'Fragment', 'RelayCompilerContext: Expected `%s` to be a fragment, got `%s`.', name, node && node.kind);
	    return node;
	  };

	  RelayCompilerContext.prototype.getRoot = function getRoot(name) {
	    var record = this._documents.get(name);
	    var node = record && record.get('node');
	    __webpack_require__(1)(node && node.kind === 'Root', 'RelayCompilerContext: Expected `%s` to be a root, got `%s`.', name, node && node.kind);
	    return node;
	  };

	  RelayCompilerContext.prototype.getErrors = function getErrors(name) {
	    return this._get(name).get('errors');
	  };

	  RelayCompilerContext.prototype.remove = function remove(name) {
	    return this._update(this._documents['delete'](name));
	  };

	  RelayCompilerContext.prototype._get = function _get(name) {
	    var record = this._documents.get(name);
	    __webpack_require__(1)(record, 'RelayCompilerContext: Unknown document `%s`.', name);
	    return record;
	  };

	  RelayCompilerContext.prototype._update = function _update(documents) {
	    var context = new RelayCompilerContext(this.schema);
	    context._documents = documents;
	    return context;
	  };

	  return RelayCompilerContext;
	}();

	module.exports = RelayCompilerContext;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayIRTransformer
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * @public
	 *
	 * Helper for writing compiler transforms that apply "map" and/or "filter"-style
	 * operations to compiler contexts. The `visitor` argument accepts a map of IR
	 * kinds to user-defined functions that can map nodes of that kind to new values
	 * (of the same kind).
	 *
	 * If a visitor function is defined for a kind, the visitor function is
	 * responsible for traversing its children (by calling `this.traverse(node)`)
	 * and returning either the input (to indicate no changes), a new node (to
	 * indicate changes), or null/undefined (to indicate the removal of that node
	 * from the output).
	 *
	 * If a visitor function is *not* defined for a kind, a default traversal is
	 * used to evaluate its children.
	 *
	 * The `stateInitializer` argument accepts a function to construct the state for
	 * each document (fragment or root) in the context. Any documents for which the
	 * initializer returns null/undefined is deleted from the context without being
	 * traversed.
	 *
	 * Example: Alias all scalar fields with the reverse of their name:
	 *
	 * ```
	 * transform(
	 *   context,
	 *   {
	 *     ScalarField: visitScalarField,
	 *   },
	 *   () => ({}) // dummy non-null state
	 * );
	 *
	 * function visitScalarField(field: ScalarField, state: State): ?ScalarField {
	 *   // Traverse child nodes - for a scalar field these are the arguments &
	 *   // directives.
	 *   const nextField = this.traverse(field, state);
	 *   // Return a new node with a different alias.
	 *   return {
	 *     ...nextField,
	 *     alias: nextField.name.split('').reverse().join(''),
	 *   };
	 * }
	 * ```
	 */
	function transform(context, visitor, stateInitializer) {
	  var transformer = new Transformer(context, visitor);
	  var nextContext = context;
	  context.documents().forEach(function (prevNode) {
	    var state = stateInitializer(prevNode);
	    var nextNode = void 0;
	    if (state != null) {
	      nextNode = transformer.visit(prevNode, state);
	    }
	    if (!nextNode) {
	      nextContext = nextContext.remove(prevNode.name);
	    } else if (nextNode !== prevNode) {
	      nextContext = nextContext.remove(prevNode.name);
	      nextContext = nextContext.add(nextNode);
	    }
	  });
	  return nextContext;
	}

	/**
	 * @internal
	 */

	var Transformer = function () {
	  function Transformer(context, visitor) {
	    (0, _classCallCheck3['default'])(this, Transformer);

	    this._context = context;
	    this._states = [];
	    this._visitor = visitor;
	  }

	  /**
	   * @public
	   *
	   * Returns the original compiler context that is being transformed. This can
	   * be used to look up fragments by name, for example.
	   */


	  Transformer.prototype.getContext = function getContext() {
	    return this._context;
	  };

	  /**
	   * @public
	   *
	   * Transforms the node, calling a user-defined visitor function if defined for
	   * the node's kind. Uses the given state for this portion of the traversal.
	   *
	   * Note: This differs from `traverse` in that it calls a visitor function for
	   * the node itself.
	   */


	  Transformer.prototype.visit = function visit(node, state) {
	    this._states.push(state);
	    var nextNode = this._visit(node);
	    this._states.pop();
	    return nextNode;
	  };

	  /**
	   * @public
	   *
	   * Transforms the children of the given node, skipping the user-defined
	   * visitor function for the node itself. Uses the given state for this portion
	   * of the traversal.
	   *
	   * Note: This differs from `visit` in that it does not call a visitor function
	   * for the node itself.
	   */


	  Transformer.prototype.traverse = function traverse(node, state) {
	    this._states.push(state);
	    var nextNode = this._traverse(node);
	    this._states.pop();
	    return nextNode;
	  };

	  Transformer.prototype._visit = function _visit(node) {
	    var nodeVisitor = this._visitor[node.kind];
	    if (nodeVisitor) {
	      // If a handler for the kind is defined, it is responsible for calling
	      // `traverse` to transform children as necessary.
	      var _state = this._getState();
	      var nextNode = nodeVisitor.call(this, node, _state);
	      return nextNode;
	    }
	    // Otherwise traverse is called automatically.
	    return this._traverse(node);
	  };

	  Transformer.prototype._traverse = function _traverse(prevNode) {
	    var nextNode = void 0;
	    switch (prevNode.kind) {
	      case 'Argument':
	        nextNode = this._traverseChildren(prevNode, null, ['value']);
	        break;
	      case 'Literal':
	      case 'LocalArgumentDefinition':
	      case 'RootArgumentDefinition':
	      case 'Variable':
	        nextNode = prevNode;
	        break;
	      case 'Directive':
	        nextNode = this._traverseChildren(prevNode, ['args']);
	        break;
	      case 'FragmentSpread':
	      case 'ScalarField':
	        nextNode = this._traverseChildren(prevNode, ['args', 'directives']);
	        break;
	      case 'LinkedField':
	        nextNode = this._traverseChildren(prevNode, ['args', 'directives', 'selections']);
	        if (!nextNode.selections.length) {
	          nextNode = null;
	        }
	        break;
	      case 'ListValue':
	        nextNode = this._traverseChildren(prevNode, ['items']);
	        break;
	      case 'ObjectFieldValue':
	        nextNode = this._traverseChildren(prevNode, null, ['value']);
	        break;
	      case 'ObjectValue':
	        nextNode = this._traverseChildren(prevNode, ['fields']);
	        break;
	      case 'Condition':
	      case 'InlineFragment':
	        nextNode = this._traverseChildren(prevNode, ['directives', 'selections']);
	        if (!nextNode.selections.length) {
	          nextNode = null;
	        }
	        break;
	      case 'Fragment':
	      case 'Root':
	        nextNode = this._traverseChildren(prevNode, ['argumentDefinitions', 'directives', 'selections']);
	        if (!nextNode.selections.length) {
	          nextNode = null;
	        }
	        break;
	      default:
	        __webpack_require__(1)(false, 'RelayIRTransformer: Unknown kind `%s`.', prevNode.kind);
	    }
	    return nextNode;
	  };

	  Transformer.prototype._traverseChildren = function _traverseChildren(prevNode, pluralKeys, singularKeys) {
	    var _this = this;

	    var nextNode = void 0;
	    pluralKeys && pluralKeys.forEach(function (key) {
	      var prevItems = prevNode[key];
	      if (!prevItems) {
	        return;
	      }
	      __webpack_require__(1)(Array.isArray(prevItems), 'RelayIRTransformer: Expected data for `%s` to be an array, got `%s`.', key, prevItems);
	      var nextItems = _this._map(prevItems);
	      if (nextNode || nextItems !== prevItems) {
	        nextNode = nextNode || (0, _extends3['default'])({}, prevNode);
	        nextNode[key] = nextItems;
	      }
	    });
	    singularKeys && singularKeys.forEach(function (key) {
	      var prevItem = prevNode[key];
	      if (!prevItem) {
	        return;
	      }
	      var nextItem = _this._visit(prevItem);
	      if (nextNode || nextItem !== prevItem) {
	        nextNode = nextNode || (0, _extends3['default'])({}, prevNode);
	        nextNode[key] = nextItem;
	      }
	    });
	    return nextNode || prevNode;
	  };

	  Transformer.prototype._map = function _map(prevItems) {
	    var _this2 = this;

	    var nextItems = void 0;
	    prevItems.forEach(function (prevItem, index) {
	      var nextItem = _this2._visit(prevItem);
	      if (nextItems || nextItem !== prevItem) {
	        nextItems = nextItems || prevItems.slice(0, index);
	        if (nextItem) {
	          nextItems.push(nextItem);
	        }
	      }
	    });
	    return nextItems || prevItems;
	  };

	  Transformer.prototype._getState = function _getState() {
	    __webpack_require__(1)(this._states.length, 'RelayIRTransformer: Expected a current state to be set but found none. ' + 'This is usually the result of mismatched number of pushState()/popState() ' + 'calls.');
	    return this._states[this._states.length - 1];
	  };

	  return Transformer;
	}();

	module.exports = { transform: transform };

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/map");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayDefaultHandleKey
	 * 
	 * @format
	 */

	'use strict';

	module.exports = {
	  DEFAULT_HANDLE_KEY: ''
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/array/from");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/set");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("signedsource");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ASTConvert
	 * 
	 * @format
	 */

	'use strict';

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	var _map2 = _interopRequireDefault(__webpack_require__(14));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(4),
	    isOperationDefinitionAST = _require.isOperationDefinitionAST,
	    isSchemaDefinitionAST = _require.isSchemaDefinitionAST;

	var _require2 = __webpack_require__(3),
	    extendSchema = _require2.extendSchema,
	    visit = _require2.visit;

	function convertASTDocuments(schema, documents, validationRules) {
	  var definitions = definitionsFromDocuments(documents);

	  var astDefinitions = [];
	  documents.forEach(function (doc) {
	    doc.definitions.forEach(function (definition) {
	      if (isOperationDefinitionAST(definition)) {
	        astDefinitions.push(definition);
	      }
	    });
	  });

	  return convertASTDefinitions(schema, definitions, validationRules);
	}

	function convertASTDocumentsWithBase(schema, baseDocuments, documents, validationRules) {
	  var baseDefinitions = definitionsFromDocuments(baseDocuments);
	  var definitions = definitionsFromDocuments(documents);

	  var requiredDefinitions = new _map2['default']();
	  var baseMap = new _map2['default']();
	  baseDefinitions.forEach(function (definition) {
	    if (isOperationDefinitionAST(definition)) {
	      if (definition.name) {
	        // If there's no name, no reason to put in the map
	        baseMap.set(definition.name.value, definition);
	      }
	    }
	  });

	  var definitionsToVisit = [];
	  definitions.forEach(function (definition) {
	    if (isOperationDefinitionAST(definition)) {
	      definitionsToVisit.push(definition);
	    }
	  });
	  while (definitionsToVisit.length > 0) {
	    var definition = definitionsToVisit.pop();
	    var name = definition.name;
	    if (!name || requiredDefinitions.has(name.value)) {
	      continue;
	    }
	    requiredDefinitions.set(name.value, definition);
	    visit(definition, {
	      FragmentSpread: function FragmentSpread(spread) {
	        var baseDefinition = baseMap.get(spread.name.value);
	        if (baseDefinition) {
	          // We only need to add those definitions not already included
	          // in definitions
	          definitionsToVisit.push(baseDefinition);
	        }
	      }
	    });
	  }

	  var definitionsToConvert = [];
	  requiredDefinitions.forEach(function (definition) {
	    return definitionsToConvert.push(definition);
	  });
	  return convertASTDefinitions(schema, definitionsToConvert, validationRules);
	}

	function convertASTDefinitions(schema, definitions, validationRules) {
	  var operationDefinitions = [];
	  definitions.forEach(function (definition) {
	    if (isOperationDefinitionAST(definition)) {
	      operationDefinitions.push(definition);
	    }
	  });

	  var validationAST = {
	    kind: 'Document',
	    // DocumentNode doesn't accept that a node of type
	    // FragmentDefinitionNode | OperationDefinitionNode is a DefinitionNode
	    definitions: operationDefinitions
	  };
	  // Will throw an error if there are validation issues
	  __webpack_require__(39).validate(validationAST, schema, validationRules);
	  return operationDefinitions.map(function (definition) {
	    return __webpack_require__(26).transform(schema, definition);
	  });
	}

	function definitionsFromDocuments(documents) {
	  var definitions = [];
	  documents.forEach(function (doc) {
	    doc.definitions.forEach(function (definition) {
	      return definitions.push(definition);
	    });
	  });
	  return definitions;
	}

	function transformASTSchema(baseSchema, schemaTransforms) {
	  return schemaTransforms.reduce(function (acc, transform) {
	    return transform(acc);
	  }, baseSchema);
	}

	function extendASTSchema(baseSchema, documents) {
	  // Should be TypeSystemDefinitionNode
	  var schemaExtensions = [];
	  documents.forEach(function (doc) {
	    // TODO: isSchemaDefinitionAST should %checks, once %checks is available
	    schemaExtensions.push.apply(schemaExtensions, (0, _toConsumableArray3['default'])(doc.definitions.filter(isSchemaDefinitionAST)));
	  });

	  if (schemaExtensions.length <= 0) {
	    return baseSchema;
	  }

	  return extendSchema(baseSchema, {
	    kind: 'Document',
	    // Flow doesn't recognize that TypeSystemDefinitionNode is a subset of DefinitionNode
	    definitions: schemaExtensions
	  });
	}

	module.exports = {
	  convertASTDocuments: convertASTDocuments,
	  convertASTDocumentsWithBase: convertASTDocumentsWithBase,
	  extendASTSchema: extendASTSchema,
	  transformASTSchema: transformASTSchema
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayCodeGenerator
	 * 
	 * @format
	 */

	'use strict';

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var GraphQLList = __webpack_require__(3).GraphQLList;

	var getRawType = __webpack_require__(4).getRawType,
	    isAbstractType = __webpack_require__(4).isAbstractType,
	    getNullableType = __webpack_require__(4).getNullableType;

	/* eslint-disable no-redeclare */


	/**
	 * @public
	 *
	 * Converts a Relay IR node into a plain JS object representation that can be
	 * used at runtime.
	 */
	function generate(node) {
	  __webpack_require__(1)(['Root', 'Fragment'].indexOf(node.kind) >= 0, 'RelayCodeGenerator: Unknown AST kind `%s`. Source: %s.', node.kind, getErrorMessage(node));
	  return __webpack_require__(25).visit(node, RelayCodeGenVisitor);
	}
	/* eslint-enable no-redeclare */

	var RelayCodeGenVisitor = {
	  leave: {
	    Root: function Root(node) {
	      return {
	        argumentDefinitions: node.argumentDefinitions,
	        kind: 'Root',
	        name: node.name,
	        operation: node.operation,
	        selections: flattenArray(node.selections)
	      };
	    },
	    Fragment: function Fragment(node) {
	      return {
	        argumentDefinitions: node.argumentDefinitions,
	        kind: 'Fragment',
	        metadata: node.metadata || null,
	        name: node.name,
	        selections: flattenArray(node.selections),
	        type: node.type.toString()
	      };
	    },
	    LocalArgumentDefinition: function LocalArgumentDefinition(node) {
	      return {
	        kind: 'LocalArgument',
	        name: node.name,
	        type: node.type.toString(),
	        defaultValue: node.defaultValue
	      };
	    },
	    RootArgumentDefinition: function RootArgumentDefinition(node) {
	      return {
	        kind: 'RootArgument',
	        name: node.name,
	        type: node.type ? node.type.toString() : null
	      };
	    },
	    Condition: function Condition(node, key, parent, ancestors) {
	      __webpack_require__(1)(node.condition.kind === 'Variable', 'RelayCodeGenerator: Expected static `Condition` node to be ' + 'pruned or inlined. Source: %s.', getErrorMessage(ancestors[0]));
	      return {
	        kind: 'Condition',
	        passingValue: node.passingValue,
	        condition: node.condition.variableName,
	        selections: flattenArray(node.selections)
	      };
	    },
	    FragmentSpread: function FragmentSpread(node) {
	      return {
	        kind: 'FragmentSpread',
	        name: node.name,
	        args: valuesOrNull(sortByName(node.args))
	      };
	    },
	    InlineFragment: function InlineFragment(node) {
	      return {
	        kind: 'InlineFragment',
	        type: node.typeCondition.toString(),
	        selections: flattenArray(node.selections)
	      };
	    },
	    LinkedField: function LinkedField(node) {
	      var handles = node.handles && node.handles.map(function (handle) {
	        return {
	          kind: 'LinkedHandle',
	          alias: node.alias,
	          args: valuesOrNull(sortByName(node.args)),
	          handle: handle.name,
	          name: node.name,
	          key: handle.key,
	          filters: handle.filters
	        };
	      }) || [];
	      var type = getRawType(node.type);
	      return [{
	        kind: 'LinkedField',
	        alias: node.alias,
	        args: valuesOrNull(sortByName(node.args)),
	        concreteType: !isAbstractType(type) ? type.toString() : null,
	        name: node.name,
	        plural: isPlural(node.type),
	        selections: flattenArray(node.selections),
	        storageKey: getStorageKey(node.name, node.args)
	      }].concat((0, _toConsumableArray3['default'])(handles));
	    },
	    ScalarField: function ScalarField(node) {
	      var handles = node.handles && node.handles.map(function (handle) {
	        return {
	          kind: 'ScalarHandle',
	          alias: node.alias,
	          args: valuesOrNull(sortByName(node.args)),
	          handle: handle.name,
	          name: node.name,
	          key: handle.key,
	          filters: handle.filters
	        };
	      }) || [];
	      return [{
	        kind: 'ScalarField',
	        alias: node.alias,
	        args: valuesOrNull(sortByName(node.args)),
	        name: node.name,
	        selections: valuesOrUndefined(flattenArray(node.selections)),
	        storageKey: getStorageKey(node.name, node.args)
	      }].concat((0, _toConsumableArray3['default'])(handles));
	    },
	    Variable: function Variable(node, key, parent) {
	      return {
	        kind: 'Variable',
	        name: parent.name,
	        variableName: node.variableName,
	        type: parent.type ? parent.type.toString() : null
	      };
	    },
	    Literal: function Literal(node, key, parent) {
	      return {
	        kind: 'Literal',
	        name: parent.name,
	        value: node.value,
	        type: parent.type ? parent.type.toString() : null
	      };
	    },
	    Argument: function Argument(node, key, parent, ancestors) {
	      __webpack_require__(1)(['Variable', 'Literal'].indexOf(node.value.kind) >= 0, 'RelayCodeGenerator: Complex argument values (Lists or ' + 'InputObjects with nested variables) are not supported, argument ' + '`%s` had value `%s`. Source: %s.', node.name, __webpack_require__(43)(node.value), getErrorMessage(ancestors[0]));
	      return node.value.value !== null ? node.value : null;
	    }
	  }
	};

	function isPlural(type) {
	  return getNullableType(type) instanceof GraphQLList;
	}

	function valuesOrUndefined(array) {
	  return !array || array.length === 0 ? undefined : array;
	}

	function valuesOrNull(array) {
	  return !array || array.length === 0 ? null : array;
	}

	function flattenArray(array) {
	  return array ? Array.prototype.concat.apply([], array) : [];
	}

	function sortByName(array) {
	  return array instanceof Array ? array.sort(function (a, b) {
	    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	  }) : array;
	}

	function getErrorMessage(node) {
	  return 'document ' + node.name;
	}

	/**
	 * Computes storage key if possible.
	 *
	 * Storage keys which can be known ahead of runtime are:
	 *
	 * - Fields that do not take arguments.
	 * - Fields whose arguments are all statically known (ie. literals) at build
	 *   time.
	 */
	function getStorageKey(fieldName, args) {
	  if (!args || !args.length) {
	    return null;
	  }
	  var isLiteral = true;
	  var preparedArgs = {};
	  args.forEach(function (arg) {
	    if (arg.kind !== 'Literal') {
	      isLiteral = false;
	    } else {
	      preparedArgs[arg.name] = arg.value;
	    }
	  });
	  return isLiteral ? __webpack_require__(68)(fieldName, preparedArgs) : null;
	}

	module.exports = { generate: generate };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayConnectionTransform
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(53),
	    AFTER = _require.AFTER,
	    BEFORE = _require.BEFORE,
	    FIRST = _require.FIRST,
	    KEY = _require.KEY,
	    LAST = _require.LAST;

	var _require2 = __webpack_require__(54),
	    CURSOR = _require2.CURSOR,
	    EDGES = _require2.EDGES,
	    END_CURSOR = _require2.END_CURSOR,
	    HAS_NEXT_PAGE = _require2.HAS_NEXT_PAGE,
	    HAS_PREV_PAGE = _require2.HAS_PREV_PAGE,
	    NODE = _require2.NODE,
	    PAGE_INFO = _require2.PAGE_INFO,
	    START_CURSOR = _require2.START_CURSOR,
	    isConnectionCall = _require2.isConnectionCall;

	var assertCompositeType = __webpack_require__(3).assertCompositeType,
	    GraphQLInterfaceType = __webpack_require__(3).GraphQLInterfaceType,
	    GraphQLList = __webpack_require__(3).GraphQLList,
	    GraphQLObjectType = __webpack_require__(3).GraphQLObjectType,
	    GraphQLScalarType = __webpack_require__(3).GraphQLScalarType,
	    GraphQLUnionType = __webpack_require__(3).GraphQLUnionType;

	var CONNECTION = 'connection';

	/**
	 * @public
	 *
	 * Transforms fields with the `@connection` directive:
	 * - Verifies that the field type is connection-like.
	 * - Adds a `handle` property to the field, either the user-provided `handle`
	 *   argument or the default value "connection".
	 * - When the `generateRequisiteFields` option is set to true, inserts a
	 *   sub-fragment on the field to ensure that standard connection fields are
	 *   fetched (e.g. cursors, node ids, page info).
	 */
	function transform(context, options) {
	  var generateRequisiteFields = !!(options && options.generateRequisiteFields);
	  return __webpack_require__(11).transform(context, {
	    Fragment: visitFragmentOrRoot,
	    LinkedField: visitLinkedField,
	    Root: visitFragmentOrRoot
	  }, function () {
	    return {
	      path: [],
	      connectionMetadata: [],
	      definitionName: null,
	      generateRequisiteFields: generateRequisiteFields
	    };
	  });
	}

	/**
	 * @public
	 *
	 * Extend the original schema with support for the `@connection` directive.
	 */
	function transformSchema(schema) {
	  return __webpack_require__(3).extendSchema(schema, __webpack_require__(3).parse('directive @connection(key: String!, filters: [String]) on FIELD'));
	}

	/**
	 * @internal
	 */
	function visitFragmentOrRoot(node, options) {
	  var passedOptions = (0, _extends3['default'])({}, options, {
	    definitionName: node.name
	  });
	  var transformedNode = this.traverse(node, passedOptions);
	  var connectionMetadata = passedOptions.connectionMetadata;
	  if (connectionMetadata.length) {
	    return (0, _extends3['default'])({}, transformedNode, {
	      metadata: (0, _extends3['default'])({}, transformedNode.metadata, {
	        connection: connectionMetadata
	      })
	    });
	  }
	  return transformedNode;
	}

	/**
	 * @internal
	 */
	function visitLinkedField(field, options) {
	  var isPlural = __webpack_require__(4).getNullableType(field.type) instanceof GraphQLList;
	  options.path.push(isPlural ? null : field.alias || field.name);
	  var transformedField = this.traverse(field, options);
	  var connectionDirective = field.directives.find(function (directive) {
	    return directive.name === CONNECTION;
	  });
	  if (!connectionDirective) {
	    options.path.pop();
	    return transformedField;
	  }
	  var definitionName = options.definitionName;

	  __webpack_require__(1)(definitionName, 'RelayConnectionTransform: Transform error, expected a name to have ' + 'been set by the parent operation or fragment definition.');
	  validateConnectionSelection(definitionName, transformedField);
	  validateConnectionType(definitionName, transformedField.type);

	  var pathHasPlural = options.path.includes(null);
	  var firstArg = findArg(transformedField, FIRST);
	  var lastArg = findArg(transformedField, LAST);
	  var direction = null;
	  var countArg = null;
	  var cursorArg = null;
	  if (firstArg && !lastArg) {
	    direction = 'forward';
	    countArg = firstArg;
	    cursorArg = findArg(transformedField, AFTER);
	  } else if (lastArg && !firstArg) {
	    direction = 'backward';
	    countArg = lastArg;
	    cursorArg = findArg(transformedField, BEFORE);
	  }
	  var countVariable = countArg && countArg.value.kind === 'Variable' ? countArg.value.variableName : null;
	  var cursorVariable = cursorArg && cursorArg.value.kind === 'Variable' ? cursorArg.value.variableName : null;
	  options.connectionMetadata.push({
	    count: countVariable,
	    cursor: cursorVariable,
	    direction: direction,
	    path: pathHasPlural ? null : [].concat((0, _toConsumableArray3['default'])(options.path))
	  });
	  options.path.pop();

	  var _getRelayLiteralArgum = __webpack_require__(42)(connectionDirective.args),
	      key = _getRelayLiteralArgum.key,
	      filters = _getRelayLiteralArgum.filters;

	  __webpack_require__(1)(typeof key === 'string', 'RelayConnectionTransform: Expected the %s argument to @%s to ' + 'be a string literal for field %s', KEY, CONNECTION, field.name);
	  var postfix = '' + (field.alias || field.name);
	  // TODO: t16785208 Change error message to point to OSS doc once ready.
	  __webpack_require__(1)(key.endsWith('_' + postfix), 'RelayConnectionTransform: Expected the %s argument to @%s to ' + 'be of form <SomeName>_%s, but get %s. For detailed explanation, check out the dex page ' + 'https://fburl.com/oillie0v', KEY, CONNECTION, postfix, key);

	  var generateFilters = function generateFilters() {
	    var filteredVariableArgs = field.args.filter(function (arg) {
	      return !isConnectionCall({ name: arg.name, value: null });
	    }).map(function (arg) {
	      return arg.name;
	    });
	    return filteredVariableArgs.length === 0 ? null : filteredVariableArgs;
	  };

	  var handle = {
	    name: CONNECTION,
	    key: key,
	    filters: filters || generateFilters()
	  };

	  if (options.generateRequisiteFields) {
	    var fragment = generateConnectionFragment(this.getContext(), transformedField.type);
	    transformedField = (0, _extends3['default'])({}, transformedField, {
	      selections: transformedField.selections.concat(fragment)
	    });
	  }
	  return (0, _extends3['default'])({}, transformedField, {
	    directives: transformedField.directives.filter(function (directive) {
	      return directive.name !== CONNECTION;
	    }),
	    handles: transformedField.handles ? [].concat((0, _toConsumableArray3['default'])(transformedField.handles), [handle]) : [handle]
	  });
	}

	/**
	 * @internal
	 *
	 * Generates a fragment on the given type that fetches the minimal connection
	 * fields in order to merge different pagination results together at runtime.
	 */
	function generateConnectionFragment(context, type) {
	  var compositeType = assertCompositeType(__webpack_require__(4).getNullableType(type));
	  var ast = __webpack_require__(3).parse('\n    fragment ConnectionFragment on ' + String(compositeType) + ' {\n      ' + EDGES + ' {\n        ' + CURSOR + '\n        ' + NODE + ' {\n          __typename # rely on GenerateRequisiteFieldTransform to add "id"\n        }\n      }\n      ' + PAGE_INFO + ' {\n        ' + END_CURSOR + '\n        ' + HAS_NEXT_PAGE + '\n        ' + HAS_PREV_PAGE + '\n        ' + START_CURSOR + '\n      }\n    }\n  ');
	  var fragmentAST = ast.definitions[0];
	  __webpack_require__(1)(fragmentAST && fragmentAST.kind === 'FragmentDefinition', 'RelayConnectionTransform: Expected a fragment definition AST.');
	  var fragment = __webpack_require__(26).transform(context.schema, fragmentAST);
	  __webpack_require__(1)(fragment && fragment.kind === 'Fragment', 'RelayConnectionTransform: Expected a connection fragment.');
	  return {
	    directives: [],
	    kind: 'InlineFragment',
	    metadata: null,
	    selections: fragment.selections,
	    typeCondition: compositeType
	  };
	}

	function findArg(field, argName) {
	  return field.args && field.args.find(function (arg) {
	    return arg.name === argName;
	  });
	}

	/**
	 * @internal
	 *
	 * Validates that the selection is a valid connection:
	 * - Specifies a first or last argument to prevent accidental, unconstrained
	 *   data access.
	 * - Has an `edges` selection, otherwise there is nothing to paginate.
	 *
	 * TODO: This implementation requires the edges field to be a direct selection
	 * and not contained within an inline fragment or fragment spread. It's
	 * technically possible to remove this restriction if this pattern becomes
	 * common/necessary.
	 */
	function validateConnectionSelection(definitionName, field) {
	  __webpack_require__(1)(findArg(field, FIRST) || findArg(field, LAST), 'RelayConnectionTransform: Expected field `%s: %s` to have a %s or %s ' + 'argument in document `%s`.', field.name, field.type, FIRST, LAST, definitionName);
	  __webpack_require__(1)(field.selections.some(function (selection) {
	    return selection.kind === 'LinkedField' && selection.name === EDGES;
	  }), 'RelayConnectionTransform: Expected field `%s: %s` to have a %s ' + 'selection in document `%s`.', field.name, field.type, EDGES, definitionName);
	}

	/**
	 * @internal
	 *
	 * Validates that the type satisfies the Connection specification:
	 * - The type has an edges field, and edges have scalar `cursor` and object
	 *   `node` fields.
	 * - The type has a page info field which is an object with the correct
	 *   subfields.
	 */
	function validateConnectionType(definitionName, type) {
	  var typeWithFields = __webpack_require__(4).assertTypeWithFields(__webpack_require__(4).getNullableType(type));
	  var typeFields = typeWithFields.getFields();
	  var edges = typeFields[EDGES];

	  __webpack_require__(1)(edges, 'RelayConnectionTransform: Expected type `%s` to have an %s field in ' + 'document `%s`.', type, EDGES, definitionName);

	  var edgesType = __webpack_require__(4).getNullableType(edges.type);
	  __webpack_require__(1)(edgesType instanceof GraphQLList, 'RelayConnectionTransform: Expected `%s` field on type `%s` to be a ' + 'list type in document `%s`.', EDGES, type, definitionName);
	  var edgeType = __webpack_require__(4).getNullableType(edgesType.ofType);
	  __webpack_require__(1)(edgeType instanceof GraphQLObjectType, 'RelayConnectionTransform: Expected %s field on type `%s` to be a list ' + 'of objects in document `%s`.', EDGES, type, definitionName);

	  var node = edgeType.getFields()[NODE];
	  __webpack_require__(1)(node, 'RelayConnectionTransform: Expected type `%s` to have an %s.%s field in ' + 'document `%s`.', type, EDGES, NODE, definitionName);
	  var nodeType = __webpack_require__(4).getNullableType(node.type);
	  if (!(nodeType instanceof GraphQLInterfaceType || nodeType instanceof GraphQLUnionType || nodeType instanceof GraphQLObjectType)) {
	    __webpack_require__(1)(false, 'RelayConnectionTransform: Expected type `%s` to have an %s.%s field' + 'for which the type is an interface, object, or union in document `%s`.', type, EDGES, NODE, definitionName);
	  }

	  var cursor = edgeType.getFields()[CURSOR];
	  if (!cursor || !(__webpack_require__(4).getNullableType(cursor.type) instanceof GraphQLScalarType)) {
	    __webpack_require__(1)(false, 'RelayConnectionTransform: Expected type `%s` to have an ' + '%s.%s field for which the type is a scalar in document `%s`.', type, EDGES, CURSOR, definitionName);
	  }

	  var pageInfo = typeFields[PAGE_INFO];
	  __webpack_require__(1)(pageInfo, 'RelayConnectionTransform: Expected type `%s` to have a %s field ' + 'in document `%s`.', type, PAGE_INFO, definitionName);
	  var pageInfoType = __webpack_require__(4).getNullableType(pageInfo.type);
	  if (!(pageInfoType instanceof GraphQLObjectType)) {
	    __webpack_require__(1)(false, 'RelayConnectionTransform: Expected type `%s` to have a %s field for ' + 'which the type is an object in document `%s`.', type, PAGE_INFO, definitionName);
	  }

	  [END_CURSOR, HAS_NEXT_PAGE, HAS_PREV_PAGE, START_CURSOR].forEach(function (fieldName) {
	    var pageInfoField = pageInfoType.getFields()[fieldName];
	    if (!pageInfoField || !(__webpack_require__(4).getNullableType(pageInfoField.type) instanceof GraphQLScalarType)) {
	      __webpack_require__(1)(false, 'RelayConnectionTransform: Expected type `%s` to have an ' + '%s field for which the type is an scalar in document `%s`.', pageInfo.type, fieldName, definitionName);
	    }
	  });
	}

	module.exports = {
	  CONNECTION: CONNECTION,
	  transform: transform,
	  transformSchema: transformSchema
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayFlattenTransform
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _from2 = _interopRequireDefault(__webpack_require__(17));

	var _map2 = _interopRequireDefault(__webpack_require__(14));

	var _stringify2 = _interopRequireDefault(__webpack_require__(13));

	var _keys2 = _interopRequireDefault(__webpack_require__(15));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(3),
	    GraphQLNonNull = _require.GraphQLNonNull,
	    GraphQLList = _require.GraphQLList;

	var getRawType = __webpack_require__(4).getRawType,
	    isAbstractType = __webpack_require__(4).isAbstractType;

	/**
	 * Transform that flattens inline fragments, fragment spreads, and conditionals.
	 *
	 * Inline fragments are inlined (replaced with their selections) when:
	 * - The fragment type matches the type of its parent.
	 * - The fragment has an abstract type and the `flattenAbstractTypes` option has
	 *   been set.
	 * - The 'flattenInlineFragments' option has been set.
	 *
	 * Fragment spreads are inlined when the `flattenFragmentSpreads` option is set.
	 * In this case the fragment is converted to an inline fragment, which is
	 * then inlined according to the rules above.
	 *
	 * Conditions are inlined when the `flattenConditions` option is set.
	 * In this case the condition is converted to an inline fragment, which is then
	 * inlined according to the rules above.
	 */
	function transform(context, options) {
	  var flattenOptions = {
	    flattenAbstractTypes: !!(options && options.flattenAbstractTypes),
	    flattenFragmentSpreads: !!(options && options.flattenFragmentSpreads),
	    flattenInlineFragments: !!(options && options.flattenInlineFragments),
	    flattenConditions: !!(options && options.flattenConditions)
	  };
	  return context.documents().reduce(function (ctx, node) {
	    if (flattenOptions.flattenFragmentSpreads && node.kind === 'Fragment') {
	      return ctx;
	    }
	    var state = {
	      kind: 'FlattenState',
	      node: node,
	      selections: {},
	      type: node.type
	    };
	    visitNode(context, flattenOptions, state, node);
	    var flattenedNode = buildNode(state);
	    __webpack_require__(1)(flattenedNode.kind === 'Root' || flattenedNode.kind === 'Fragment', 'RelayFlattenTransform: Expected Root `%s` to flatten back to a Root ' + ' or Fragment.', node.name);
	    return ctx.add(flattenedNode);
	  }, new (__webpack_require__(10))(context.schema));
	}

	function buildNode(state) {
	  return (0, _extends3['default'])({}, state.node, {
	    selections: (0, _keys2['default'])(state.selections).map(function (key) {
	      var selectionState = state.selections[key];
	      if (selectionState.kind === 'FragmentSpread' || selectionState.kind === 'ScalarField') {
	        return selectionState;
	      } else if (selectionState.kind === 'FlattenState') {
	        var _node = buildNode(selectionState);
	        __webpack_require__(1)(_node.kind !== 'Root' && _node.kind !== 'Fragment', 'RelayFlattenTransform: got a `%s`, expected a selection.', _node.kind);
	        return _node;
	      } else {
	        // $FlowIssue: this is provably unreachable
	        __webpack_require__(1)(false, 'RelayFlattenTransform: Unexpected kind `%s`.', selectionState.kind);
	      }
	    })
	  });
	}

	/**
	 * @internal
	 */
	function visitNode(context, options, state, node) {
	  node.selections.forEach(function (selection) {
	    if (selection.kind === 'FragmentSpread' && options.flattenFragmentSpreads) {
	      __webpack_require__(1)(!selection.args.length, 'RelayFlattenTransform: Cannot flatten fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', selection.name);
	      var fragment = context.get(selection.name);
	      __webpack_require__(1)(fragment && fragment.kind === 'Fragment', 'RelayFlattenTransform: Unknown fragment `%s`.', selection.name);
	      // Replace the spread with an inline fragment containing the fragment's
	      // contents
	      selection = {
	        directives: selection.directives,
	        kind: 'InlineFragment',
	        selections: fragment.selections,
	        typeCondition: fragment.type
	      };
	    }
	    if (selection.kind === 'Condition' && options.flattenConditions) {
	      selection = {
	        directives: [],
	        kind: 'InlineFragment',
	        selections: selection.selections,
	        typeCondition: state.type
	      };
	    }
	    if (selection.kind === 'InlineFragment' && shouldFlattenFragment(selection, options, state)) {
	      visitNode(context, options, state, selection);
	      return;
	    }
	    var nodeIdentifier = __webpack_require__(41)(selection);
	    if (selection.kind === 'Condition' || selection.kind === 'InlineFragment') {
	      var selectionState = state.selections[nodeIdentifier];
	      if (!selectionState) {
	        selectionState = state.selections[nodeIdentifier] = {
	          kind: 'FlattenState',
	          node: selection,
	          selections: {},
	          type: selection.kind === 'InlineFragment' ? selection.typeCondition : selection.type
	        };
	      }
	      visitNode(context, options, selectionState, selection);
	    } else if (selection.kind === 'FragmentSpread') {
	      state.selections[nodeIdentifier] = selection;
	    } else if (selection.kind === 'LinkedField') {
	      var _selectionState = state.selections[nodeIdentifier];
	      if (!_selectionState) {
	        _selectionState = state.selections[nodeIdentifier] = {
	          kind: 'FlattenState',
	          node: selection,
	          selections: {},
	          type: selection.type
	        };
	      } else {
	        var prevSelection = _selectionState.node;
	        // Validate unique args for a given alias
	        __webpack_require__(1)(areEqualFields(selection, prevSelection), 'RelayFlattenTransform: Expected all fields with the alias `%s` ' + 'to have the same name/arguments. Got `%s` and `%s`.', nodeIdentifier, showField(selection), showField(prevSelection));
	        // merge fields
	        var handles = dedupe(prevSelection.handles, selection.handles);
	        _selectionState.node = (0, _extends3['default'])({}, selection, {
	          handles: handles
	        });
	      }
	      visitNode(context, options, _selectionState, selection);
	    } else if (selection.kind === 'ScalarField') {
	      var _prevSelection = state.selections[nodeIdentifier];
	      if (_prevSelection) {
	        __webpack_require__(1)(areEqualFields(selection, _prevSelection), 'RelayFlattenTransform: Expected all fields with the alias `%s` ' + 'to have the same name/arguments. Got `%s` and `%s`.', nodeIdentifier, showField(selection), showField(_prevSelection));
	        if (selection.handles || _prevSelection.handles) {
	          var _handles = dedupe(selection.handles, _prevSelection.handles);
	          selection = (0, _extends3['default'])({}, selection, {
	            handles: _handles
	          });
	        }
	      }
	      state.selections[nodeIdentifier] = selection;
	    } else {
	      __webpack_require__(1)(false, 'RelayFlattenTransform: Unknown kind `%s`.', selection.kind);
	    }
	  });
	}

	/**
	 * @internal
	 */
	function shouldFlattenFragment(fragment, options, state) {
	  // Right now, both the fragment's and state's types could be undefined.
	  if (!fragment.typeCondition) {
	    return !state.type;
	  } else if (!state.type) {
	    return false;
	  }
	  return isEquivalentType(fragment.typeCondition, state.type) || options.flattenInlineFragments || options.flattenAbstractTypes && isAbstractType(getRawType(fragment.typeCondition));
	}

	/**
	 * @internal
	 */
	function showField(field) {
	  var alias = field.alias ? field.alias + ' ' : '';
	  return '' + alias + field.name + '(' + (0, _stringify2['default'])(field.args) + ')';
	}

	/**
	 * @internal
	 *
	 * Verify that two fields are equal in all properties other than their
	 * selections.
	 */
	function areEqualFields(thisField, thatField) {
	  return thisField.kind === thatField.kind && thisField.name === thatField.name && thisField.alias === thatField.alias && __webpack_require__(79)(thisField.args, thatField.args);
	}

	/**
	 * @internal
	 */
	function dedupe() {
	  var uniqueItems = new _map2['default']();

	  for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
	    arrays[_key] = arguments[_key];
	  }

	  arrays.forEach(function (items) {
	    items && items.forEach(function (item) {
	      uniqueItems.set(__webpack_require__(28)(item), item);
	    });
	  });
	  return (0, _from2['default'])(uniqueItems.values());
	}

	/**
	 *
	 * @internal
	 * Determine if a type is the same type (same name and class) as another type.
	 * Needed if we're comparing IRs created at different times: we don't yet have
	 * an IR schema, so the type we assign to an IR field could be !== than
	 * what we assign to it after adding some schema definitions or extensions.
	 */
	function isEquivalentType(typeA, typeB) {
	  // Easy short-circuit: equal types are equal.
	  if (typeA === typeB) {
	    return true;
	  }

	  // If either type is non-null, the other must also be non-null.
	  if (typeA instanceof GraphQLNonNull && typeB instanceof GraphQLNonNull) {
	    return isEquivalentType(typeA.ofType, typeB.ofType);
	  }

	  // If either type is a list, the other must also be a list.
	  if (typeA instanceof GraphQLList && typeB instanceof GraphQLList) {
	    return isEquivalentType(typeA.ofType, typeB.ofType);
	  }

	  // Make sure the two types are of the same class
	  if (typeA.constructor.name === typeB.constructor.name) {
	    var rawA = getRawType(typeA);
	    var rawB = getRawType(typeB);

	    // And they must have the exact same name
	    return rawA.name === rawB.name;
	  }

	  // Otherwise the types are not equal.
	  return false;
	}

	module.exports = { transform: transform };

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayIRVisitor
	 * 
	 * @format
	 */
	'use strict';

	var visit = __webpack_require__(3).visit;

	var NodeKeys = {
	  Argument: ['value'],
	  Condition: ['condition', 'selections'],
	  Directive: ['args'],
	  Fragment: ['argumentDefinitions', 'directives', 'selections'],
	  FragmentSpread: ['args', 'directives'],
	  InlineFragment: ['directives', 'selections'],
	  LinkedField: ['args', 'directives', 'selections'],
	  Literal: [],
	  LocalArgumentDefinition: [],
	  Root: ['argumentDefinitions', 'directives', 'selections'],
	  RootArgumentDefinition: [],
	  ScalarField: ['args', 'directives'],
	  Variable: []
	};

	function visitIR(root, visitor) {
	  return visit(root, visitor, NodeKeys);
	}

	module.exports = { visit: visitIR };

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayParser
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(16),
	    DEFAULT_HANDLE_KEY = _require.DEFAULT_HANDLE_KEY;

	var _require2 = __webpack_require__(4),
	    getNullableType = _require2.getNullableType,
	    getRawType = _require2.getRawType,
	    getTypeFromAST = _require2.getTypeFromAST,
	    isOperationDefinitionAST = _require2.isOperationDefinitionAST;

	var _require3 = __webpack_require__(3),
	    assertAbstractType = _require3.assertAbstractType,
	    assertCompositeType = _require3.assertCompositeType,
	    assertInputType = _require3.assertInputType,
	    assertOutputType = _require3.assertOutputType,
	    extendSchema = _require3.extendSchema,
	    getNamedType = _require3.getNamedType,
	    GraphQLEnumType = _require3.GraphQLEnumType,
	    GraphQLInputObjectType = _require3.GraphQLInputObjectType,
	    GraphQLInterfaceType = _require3.GraphQLInterfaceType,
	    GraphQLList = _require3.GraphQLList,
	    GraphQLObjectType = _require3.GraphQLObjectType,
	    GraphQLScalarType = _require3.GraphQLScalarType,
	    GraphQLUnionType = _require3.GraphQLUnionType,
	    isAbstractType = _require3.isAbstractType,
	    isLeafType = _require3.isLeafType,
	    isTypeSubTypeOf = _require3.isTypeSubTypeOf,
	    parse = _require3.parse,
	    parseType = _require3.parseType,
	    SchemaMetaFieldDef = _require3.SchemaMetaFieldDef,
	    Source = _require3.Source,
	    TypeMetaFieldDef = _require3.TypeMetaFieldDef,
	    TypeNameMetaFieldDef = _require3.TypeNameMetaFieldDef;

	var ARGUMENT_DEFINITIONS = 'argumentDefinitions';
	var ARGUMENTS = 'arguments';

	/**
	 * @internal
	 *
	 * This directive is not intended for use by developers directly. To set a field
	 * handle in product code use a compiler plugin.
	 */
	var CLIENT_FIELD = '__clientField';
	var CLIENT_FIELD_HANDLE = 'handle';
	var CLIENT_FIELD_KEY = 'key';
	var CLIENT_FIELD_FILTERS = 'filters';

	var INCLUDE = 'include';
	var SKIP = 'skip';
	var IF = 'if';

	function parseRelay(schema, text, filename) {
	  var ast = parse(new Source(text, filename));
	  var nodes = [];
	  schema = extendSchema(schema, ast);
	  ast.definitions.forEach(function (definition) {
	    if (isOperationDefinitionAST(definition)) {
	      nodes.push(transform(schema, definition));
	    }
	  });
	  return nodes;
	}

	/**
	 * Transforms a raw GraphQL AST into a simpler representation with type
	 * information.
	 */
	function transform(schema, definition) {
	  var parser = new RelayParser(schema, definition);
	  return parser.transform();
	}

	var RelayParser = function () {
	  function RelayParser(schema, definition) {
	    (0, _classCallCheck3['default'])(this, RelayParser);

	    this._definition = definition;
	    this._referencedVariables = {};
	    this._schema = schema;
	  }

	  RelayParser.prototype._getErrorContext = function _getErrorContext() {
	    var message = 'document `' + getName(this._definition) + '`';
	    if (this._definition.loc && this._definition.loc.source) {
	      message += ' file: `' + this._definition.loc.source.name + '`';
	    }
	    return message;
	  };

	  RelayParser.prototype._recordVariableReference = function _recordVariableReference(name, type) {
	    var prevType = this._referencedVariables[name];
	    if (type && prevType) {
	      __webpack_require__(1)(this._referencedVariables[name] == null || isTypeSubTypeOf(this._schema, this._referencedVariables[name], type), 'RelayParser: Variable `$%s` was used in locations expecting ' + 'the conflicting types `%s` and `%s`. Source: %s.', getName(this._definition), prevType, type, this._getErrorContext());
	    }
	    this._referencedVariables[name] = prevType || type;
	  };

	  RelayParser.prototype.transform = function transform() {
	    switch (this._definition.kind) {
	      case 'OperationDefinition':
	        return this._transformOperation(this._definition);
	      case 'FragmentDefinition':
	        return this._transformFragment(this._definition);
	      default:
	        __webpack_require__(1)(false, 'RelayParser: Unknown AST kind `%s`. Source: %s.', this._definition.kind, this._getErrorContext());
	    }
	  };

	  RelayParser.prototype._transformFragment = function _transformFragment(fragment) {
	    var _this = this;

	    var argumentDefinitions = this._buildArgumentDefinitions(fragment);
	    var directives = this._transformDirectives((fragment.directives || []).filter(function (directive) {
	      return getName(directive) !== ARGUMENT_DEFINITIONS;
	    }));
	    var type = assertCompositeType(getTypeFromAST(this._schema, fragment.typeCondition));
	    var selections = this._transformSelections(fragment.selectionSet, type);
	    __webpack_require__(30)(this._referencedVariables, function (variableType, name) {
	      var localArgument = argumentDefinitions.find(function (argDef) {
	        return argDef.name === name;
	      });
	      if (localArgument) {
	        __webpack_require__(1)(variableType == null || isTypeSubTypeOf(_this._schema, localArgument.type, variableType), 'RelayParser: Variable `$%s` was defined as type `%s`, but used in a ' + 'location that expects type `%s`. Source: %s.', name, localArgument.type, variableType, _this._getErrorContext());
	      } else {
	        argumentDefinitions.push({
	          kind: 'RootArgumentDefinition',
	          metadata: null,
	          name: name,
	          type: variableType
	        });
	      }
	    });
	    return {
	      kind: 'Fragment',
	      directives: directives,
	      metadata: null,
	      name: getName(fragment),
	      selections: selections,
	      type: type,
	      argumentDefinitions: argumentDefinitions
	    };
	  };

	  /**
	   * Polyfills suport for fragment variable definitions via the
	   * @argumentDefinitions directive. Returns the equivalent AST
	   * to the `argumentDefinitions` property on queries/mutations/etc.
	   */


	  RelayParser.prototype._buildArgumentDefinitions = function _buildArgumentDefinitions(fragment) {
	    var _this2 = this;

	    var variableDirectives = (fragment.directives || []).filter(function (directive) {
	      return getName(directive) === ARGUMENT_DEFINITIONS;
	    });
	    if (!variableDirectives.length) {
	      return [];
	    }
	    __webpack_require__(1)(variableDirectives.length === 1, 'RelayParser: Directive %s may be defined at most once on fragment ' + '`%s`. Source: %s.', ARGUMENT_DEFINITIONS, getName(fragment), this._getErrorContext());
	    var variableDirective = variableDirectives[0];
	    // $FlowIssue: refining directly on `variableDirective.arguments` doesn't
	    // work, below accesses all report arguments could still be null/undefined.
	    var args = variableDirective.arguments;
	    if (variableDirective == null || !Array.isArray(args)) {
	      return [];
	    }
	    __webpack_require__(1)(args.length, 'RelayParser: Directive %s requires arguments: remove the directive to ' + 'skip defining local variables for this fragment `%s`. Source: %s.', ARGUMENT_DEFINITIONS, getName(fragment), this._getErrorContext());
	    return args.map(function (arg) {
	      var argName = getName(arg);
	      var argValue = _this2._transformValue(arg.value);
	      __webpack_require__(1)(argValue.kind === 'Literal', 'RelayParser: Expected definition for variable `%s` to be an object ' + 'with the following shape: `{type: string, defaultValue?: mixed}`, got ' + '`%s`. Source: %s.', argValue, _this2._getErrorContext());
	      var value = argValue.value;
	      __webpack_require__(1)(!Array.isArray(value) && typeof value === 'object' && value !== null && typeof value.type === 'string', 'RelayParser: Expected definition for variable `%s` to be an object ' + 'with the following shape: `{type: string, defaultValue?: mixed}`, got ' + '`%s`. Source: %s.', argName, argValue, _this2._getErrorContext());
	      var typeAST = parseType(value.type);
	      var type = assertInputType(getTypeFromAST(_this2._schema, typeAST));
	      return {
	        kind: 'LocalArgumentDefinition',
	        defaultValue: value.defaultValue != null ? value.defaultValue : null,
	        metadata: null,
	        name: argName,
	        type: type
	      };
	    });
	  };

	  RelayParser.prototype._transformOperation = function _transformOperation(definition) {
	    var name = getName(definition);
	    var argumentDefinitions = this._transformArgumentDefinitions(definition.variableDefinitions || []);
	    var directives = this._transformDirectives(definition.directives || []);
	    var type = void 0;
	    var operation = void 0;
	    switch (definition.operation) {
	      case 'query':
	        operation = 'query';
	        type = assertCompositeType(this._schema.getQueryType());
	        break;
	      case 'mutation':
	        operation = 'mutation';
	        type = assertCompositeType(this._schema.getMutationType());
	        break;
	      case 'subscription':
	        operation = 'subscription';
	        type = assertCompositeType(this._schema.getSubscriptionType());
	        break;
	      default:
	        __webpack_require__(1)(false, 'RelayParser: Unknown AST kind `%s`. Source: %s.', definition.operation, this._getErrorContext());
	    }
	    __webpack_require__(1)(definition.selectionSet, 'RelayParser: Expected %s `%s` to have selections. Source: %s.', operation, name, this._getErrorContext());
	    var selections = this._transformSelections(definition.selectionSet, type);
	    return {
	      kind: 'Root',
	      operation: operation,
	      metadata: null,
	      name: name,
	      argumentDefinitions: argumentDefinitions,
	      directives: directives,
	      selections: selections,
	      type: type
	    };
	  };

	  RelayParser.prototype._transformArgumentDefinitions = function _transformArgumentDefinitions(argumentDefinitions) {
	    var _this3 = this;

	    return argumentDefinitions.map(function (def) {
	      var name = getName(def.variable);
	      var type = assertInputType(getTypeFromAST(_this3._schema, def.type));
	      var defaultLiteral = def.defaultValue ? _this3._transformValue(def.defaultValue) : null;
	      __webpack_require__(1)(defaultLiteral === null || defaultLiteral.kind === 'Literal', 'RelayParser: Expected null or Literal default value, got: `%s`. ' + 'Source: %s.', defaultLiteral && defaultLiteral.kind, _this3._getErrorContext());
	      return {
	        kind: 'LocalArgumentDefinition',
	        metadata: null,
	        name: name,
	        defaultValue: defaultLiteral ? defaultLiteral.value : null,
	        type: type
	      };
	    });
	  };

	  RelayParser.prototype._transformSelections = function _transformSelections(selectionSet, parentType) {
	    var _this4 = this;

	    return selectionSet.selections.map(function (selection) {
	      var node = void 0;
	      if (selection.kind === 'Field') {
	        node = _this4._transformField(selection, parentType);
	      } else if (selection.kind === 'FragmentSpread') {
	        node = _this4._transformFragmentSpread(selection, parentType);
	      } else if (selection.kind === 'InlineFragment') {
	        node = _this4._transformInlineFragment(selection, parentType);
	      } else {
	        __webpack_require__(1)(false, 'RelayParser: Unexpected AST kind `%s`. Source: %s.', selection.kind, _this4._getErrorContext());
	      }

	      var _splitConditions2 = _this4._splitConditions(node.directives),
	          conditions = _splitConditions2[0],
	          directives = _splitConditions2[1];

	      var conditionalNodes = applyConditions(conditions,
	      // $FlowFixMe(>=0.28.0)
	      [(0, _extends3['default'])({}, node, { directives: directives })]);
	      __webpack_require__(1)(conditionalNodes.length === 1, 'RelayParser: Expected exactly one conditional node, got `%s`. ' + 'Source: %s.', conditionalNodes.length, _this4._getErrorContext());
	      return conditionalNodes[0];
	    });
	  };

	  RelayParser.prototype._transformInlineFragment = function _transformInlineFragment(fragment, parentType) {
	    var typeCondition = assertCompositeType(fragment.typeCondition ? getTypeFromAST(this._schema, fragment.typeCondition) : parentType);
	    var directives = this._transformDirectives(fragment.directives || []);
	    var selections = this._transformSelections(fragment.selectionSet, typeCondition);
	    return {
	      kind: 'InlineFragment',
	      directives: directives,
	      metadata: null,
	      selections: selections,
	      typeCondition: typeCondition
	    };
	  };

	  RelayParser.prototype._transformFragmentSpread = function _transformFragmentSpread(fragment, parentType) {
	    var _this5 = this;

	    var fragmentName = getName(fragment);

	    var _partitionArray = __webpack_require__(31)(fragment.directives || [], function (directive) {
	      return getName(directive) !== ARGUMENTS;
	    }),
	        otherDirectives = _partitionArray[0],
	        argumentDirectives = _partitionArray[1];

	    __webpack_require__(1)(argumentDirectives.length <= 1, 'RelayParser: Directive %s may be used at most once in fragment ' + 'spread `...%s`. Source: %s.', ARGUMENTS, fragmentName, this._getErrorContext());
	    var args = void 0;
	    if (argumentDirectives.length) {
	      args = (argumentDirectives[0].arguments || []).map(function (arg) {
	        var argValue = arg.value;
	        __webpack_require__(1)(argValue.kind === 'Variable', 'RelayParser: All @arguments() args must be variables, got %s. ' + 'Source: %s.', argValue.kind, _this5._getErrorContext());

	        return {
	          kind: 'Argument',
	          metadata: null,
	          name: getName(arg),
	          value: _this5._transformVariable(argValue),
	          type: null };
	      });
	    }
	    var directives = this._transformDirectives(otherDirectives);
	    return {
	      kind: 'FragmentSpread',
	      args: args || [],
	      metadata: null,
	      name: fragmentName,
	      directives: directives
	    };
	  };

	  RelayParser.prototype._transformField = function _transformField(field, parentType) {
	    var name = getName(field);
	    var fieldDef = getFieldDefinition(this._schema, parentType, name, field);
	    __webpack_require__(1)(fieldDef, 'RelayParser: Unknown field `%s` on type `%s`. Source: %s.', name, parentType, this._getErrorContext());
	    var alias = field.alias ? field.alias.value : null;
	    var args = this._transformArguments(field.arguments || [], fieldDef.args);

	    var _partitionArray2 = __webpack_require__(31)(field.directives || [], function (directive) {
	      return getName(directive) !== CLIENT_FIELD;
	    }),
	        otherDirectives = _partitionArray2[0],
	        clientFieldDirectives = _partitionArray2[1];

	    var directives = this._transformDirectives(otherDirectives);
	    var type = assertOutputType(fieldDef.type);
	    var handles = this._transformHandle(name, args, clientFieldDirectives);
	    if (isLeafType(getNamedType(type))) {
	      __webpack_require__(1)(!field.selectionSet || !field.selectionSet.selections || !field.selectionSet.selections.length, 'RelayParser: Expected no selections for scalar field `%s` on type ' + '`%s`. Source: %s.', name, this._getErrorContext());
	      return {
	        kind: 'ScalarField',
	        alias: alias,
	        args: args,
	        directives: directives,
	        handles: handles,
	        metadata: null,
	        name: name,
	        type: assertScalarFieldType(type)
	      };
	    } else {
	      var selections = field.selectionSet ? this._transformSelections(field.selectionSet, type) : null;
	      __webpack_require__(1)(selections && selections.length, 'RelayParser: Expected at least one selection for non-scalar field ' + '`%s` on type `%s`. Source: %s.', name, type, this._getErrorContext());
	      return {
	        kind: 'LinkedField',
	        alias: alias,
	        args: args,
	        directives: directives,
	        handles: handles,
	        metadata: null,
	        name: name,
	        selections: selections,
	        type: type
	      };
	    }
	  };

	  RelayParser.prototype._transformHandle = function _transformHandle(fieldName, fieldArgs, clientFieldDirectives) {
	    var _this6 = this;

	    var handles = void 0;
	    clientFieldDirectives.forEach(function (clientFieldDirective) {
	      var handleArgument = (clientFieldDirective.arguments || []).find(function (arg) {
	        return getName(arg) === CLIENT_FIELD_HANDLE;
	      });
	      if (handleArgument) {
	        var _name = null;
	        var key = DEFAULT_HANDLE_KEY;
	        var filters = null;
	        var maybeHandle = _this6._transformValue(handleArgument.value);
	        __webpack_require__(1)(maybeHandle.kind === 'Literal' && typeof maybeHandle.value === 'string', 'RelayParser: Expected the %s argument to @%s to be a literal ' + 'string, got `%s` on field `%s`. Source: %s.', CLIENT_FIELD_HANDLE, CLIENT_FIELD, maybeHandle, fieldName, _this6._getErrorContext());
	        _name = maybeHandle.value;

	        var keyArgument = (clientFieldDirective.arguments || []).find(function (arg) {
	          return getName(arg) === CLIENT_FIELD_KEY;
	        });
	        if (keyArgument) {
	          var maybeKey = _this6._transformValue(keyArgument.value);
	          __webpack_require__(1)(maybeKey.kind === 'Literal' && typeof maybeKey.value === 'string', 'RelayParser: Expected %s argument to @%s to be a literal ' + 'string, got `%s` on field `%s`. Source: %s.', CLIENT_FIELD_KEY, CLIENT_FIELD, maybeKey, fieldName, _this6._getErrorContext());
	          key = maybeKey.value;
	        }
	        var filtersArgument = (clientFieldDirective.arguments || []).find(function (arg) {
	          return getName(arg) === CLIENT_FIELD_FILTERS;
	        });
	        if (filtersArgument) {
	          var maybeFilters = _this6._transformValue(filtersArgument.value);
	          __webpack_require__(1)(maybeFilters.kind === 'Literal' && Array.isArray(maybeFilters.value) && maybeFilters.value.every(function (filter) {
	            return fieldArgs.some(function (fieldArg) {
	              return fieldArg.name === filter;
	            });
	          }), 'RelayParser: Expected %s argument to @%s to be an array of ' + 'argument names on field `%s`, but get %s. Source: %s.', CLIENT_FIELD_FILTERS, CLIENT_FIELD, fieldName, maybeFilters, _this6._getErrorContext());
	          // $FlowFixMe
	          filters = maybeFilters.value;
	        }
	        handles = handles || [];
	        handles.push({ name: _name, key: key, filters: filters });
	      }
	    });
	    return handles;
	  };

	  RelayParser.prototype._transformDirectives = function _transformDirectives(directives) {
	    var _this7 = this;

	    return directives.map(function (directive) {
	      var name = getName(directive);
	      var directiveDef = _this7._schema.getDirective(name);
	      __webpack_require__(1)(directiveDef, 'RelayParser: Unknown directive `@%s`. Source: %s.', name, _this7._getErrorContext());
	      var args = _this7._transformArguments(directive.arguments || [], directiveDef.args);
	      return {
	        kind: 'Directive',
	        metadata: null,
	        name: name,
	        args: args
	      };
	    });
	  };

	  RelayParser.prototype._transformArguments = function _transformArguments(args, argumentDefinitions) {
	    var _this8 = this;

	    return args.map(function (arg) {
	      var argName = getName(arg);
	      var argDef = argumentDefinitions.find(function (def) {
	        return def.name === argName;
	      });
	      __webpack_require__(1)(argDef, 'RelayParser: Unknown argument `%s`. Source: %s.', argName, _this8._getErrorContext());
	      var value = _this8._transformValue(arg.value, argDef.type);
	      return {
	        kind: 'Argument',
	        metadata: null,
	        name: argName,
	        value: value,
	        type: argDef.type
	      };
	    });
	  };

	  RelayParser.prototype._splitConditions = function _splitConditions(mixedDirectives) {
	    var _this9 = this;

	    var conditions = [];
	    var directives = [];
	    mixedDirectives.forEach(function (directive) {
	      if (directive.name === INCLUDE || directive.name === SKIP) {
	        var passingValue = directive.name === INCLUDE;
	        var arg = directive.args[0];
	        __webpack_require__(1)(arg && arg.name === IF, 'RelayParser: Expected an `if` argument to @%s. Source: %s.', directive.name, _this9._getErrorContext());
	        __webpack_require__(1)(arg.value.kind === 'Variable' || arg.value.kind === 'Literal', 'RelayParser: Expected the `if` argument to @%s to be a variable. ' + 'Source: %s.', directive.name, _this9._getErrorContext());
	        conditions.push({
	          kind: 'Condition',
	          condition: arg.value,
	          metadata: null,
	          passingValue: passingValue,
	          selections: []
	        });
	      } else {
	        directives.push(directive);
	      }
	    });
	    var sortedConditions = [].concat(conditions).sort(function (a, b) {
	      if (a.condition.kind === 'Variable' && b.condition.kind === 'Variable') {
	        return a.condition.variableName < b.condition.variableName ? -1 : a.condition.variableName > b.condition.variableName ? 1 : 0;
	      } else {
	        // sort literals earlier, variables later
	        return a.condition.kind === 'Variable' ? 1 : b.condition.kind === 'Variable' ? -1 : 0;
	      }
	    });
	    return [sortedConditions, directives];
	  };

	  RelayParser.prototype._transformVariable = function _transformVariable(ast, type) {
	    var variableName = getName(ast);
	    this._recordVariableReference(variableName, type);
	    return {
	      kind: 'Variable',
	      metadata: null,
	      variableName: variableName
	    };
	  };

	  /**
	   * Transforms AST values into IR values, extracting the literal JS values of any
	   * subtree of the AST that does not contain a variable.
	   */


	  RelayParser.prototype._transformValue = function _transformValue(ast, type) {
	    var _this10 = this;

	    switch (ast.kind) {
	      case 'IntValue':
	        return {
	          kind: 'Literal',
	          metadata: null,
	          value: parseInt(ast.value, 10)
	        };
	      case 'FloatValue':
	        return {
	          kind: 'Literal',
	          metadata: null,
	          value: parseFloat(ast.value)
	        };
	      case 'StringValue':
	      case 'BooleanValue':
	      case 'EnumValue':
	        return {
	          kind: 'Literal',
	          metadata: null,
	          value: ast.value
	        };
	      case 'ListValue':
	        var itemType = void 0;
	        if (type) {
	          var listType = getNullableType(type);
	          // The user entered a list, a `type` was expected; this is only valid
	          // if `type` is a List.
	          __webpack_require__(1)(listType instanceof GraphQLList, 'RelayParser: Expected a value matching type `%s`, but ' + 'got a list value. Source: %s.', type, this._getErrorContext());
	          itemType = assertInputType(listType.ofType);
	        }
	        var literalList = [];
	        var items = [];
	        var areAllItemsScalar = true;
	        ast.values.forEach(function (item) {
	          var itemValue = _this10._transformValue(item, itemType);
	          if (itemValue.kind === 'Literal') {
	            literalList.push(itemValue.value);
	          }
	          items.push(itemValue);
	          areAllItemsScalar = areAllItemsScalar && itemValue.kind === 'Literal';
	        });
	        if (areAllItemsScalar) {
	          return {
	            kind: 'Literal',
	            metadata: null,
	            value: literalList
	          };
	        } else {
	          return {
	            kind: 'ListValue',
	            metadata: null,
	            items: items
	          };
	        }
	      case 'ObjectValue':
	        var literalObject = {};
	        var fields = [];
	        var areAllFieldsScalar = true;
	        ast.fields.forEach(function (field) {
	          var fieldName = getName(field);
	          var fieldType = void 0;
	          if (type) {
	            var objectType = getNullableType(type);
	            // The user entered an object, a `type` was expected; this is only
	            // valid if `type` is an Object.
	            __webpack_require__(1)(objectType instanceof GraphQLInputObjectType, 'RelayParser: Expected a value matching type `%s`, but ' + 'got an object value. Source: %s.', type, _this10._getErrorContext());
	            var fieldConfig = objectType.getFields()[fieldName];
	            __webpack_require__(1)(fieldConfig, 'RelayParser: Unknown field `%s` on type `%s`. Source: %s.', fieldName, type, _this10._getErrorContext());
	            fieldType = assertInputType(fieldConfig.type);
	          }
	          var fieldValue = _this10._transformValue(field.value, fieldType);
	          if (fieldValue.kind === 'Literal') {
	            literalObject[field.name.value] = fieldValue.value;
	          }
	          fields.push({
	            kind: 'ObjectFieldValue',
	            metadata: null,
	            name: fieldName,
	            value: fieldValue
	          });
	          areAllFieldsScalar = areAllFieldsScalar && fieldValue.kind === 'Literal';
	        });
	        if (areAllFieldsScalar) {
	          return {
	            kind: 'Literal',
	            metadata: null,
	            value: literalObject
	          };
	        } else {
	          return {
	            kind: 'ObjectValue',
	            metadata: null,
	            fields: fields
	          };
	        }
	      case 'Variable':
	        return this._transformVariable(ast, type);
	      // eslint-disable: no-fallthrough
	      default:
	        __webpack_require__(1)(false, 'RelayParser: Unknown ast kind: %s. Source: %s.', ast.kind, this._getErrorContext());
	      // eslint-enable
	    }
	  };

	  return RelayParser;
	}();

	function isScalarFieldType(type) {
	  var namedType = getNamedType(type);
	  return namedType instanceof GraphQLScalarType || namedType instanceof GraphQLEnumType;
	}

	function assertScalarFieldType(type) {
	  __webpack_require__(1)(isScalarFieldType(type), 'Expected %s to be a Scalar Field type.', type);
	  return type;
	}

	function applyConditions(conditions, selections) {
	  var nextSelections = selections;
	  conditions.forEach(function (condition) {
	    nextSelections = [(0, _extends3['default'])({}, condition, {
	      selections: nextSelections
	    })];
	  });
	  return nextSelections;
	}

	function getName(ast) {
	  var name = ast.name ? ast.name.value : null;
	  __webpack_require__(1)(typeof name === 'string', 'RelayParser: Expected ast node `%s` to have a name.', ast);
	  return name;
	}

	/**
	 * Find the definition of a field of the specified type.
	 */
	function getFieldDefinition(schema, parentType, fieldName, fieldAST) {
	  var type = getRawType(parentType);
	  var isQueryType = type === schema.getQueryType();
	  var hasTypeName = type instanceof GraphQLObjectType || type instanceof GraphQLInterfaceType || type instanceof GraphQLUnionType;

	  var schemaFieldDef = void 0;
	  if (isQueryType && fieldName === SchemaMetaFieldDef.name) {
	    schemaFieldDef = SchemaMetaFieldDef;
	  } else if (isQueryType && fieldName === TypeMetaFieldDef.name) {
	    schemaFieldDef = TypeMetaFieldDef;
	  } else if (hasTypeName && fieldName === TypeNameMetaFieldDef.name) {
	    schemaFieldDef = TypeNameMetaFieldDef;
	  } else if (type instanceof GraphQLInterfaceType || type instanceof GraphQLObjectType) {
	    schemaFieldDef = type.getFields()[fieldName];
	  }

	  if (!schemaFieldDef) {
	    schemaFieldDef = getClassicFieldDefinition(schema, type, fieldName, fieldAST);
	  }

	  return schemaFieldDef || null;
	}

	function getClassicFieldDefinition(schema, type, fieldName, fieldAST) {
	  if (isAbstractType(type) && fieldAST && fieldAST.directives && fieldAST.directives.some(function (directive) {
	    return getName(directive) === 'fixme_fat_interface';
	  })) {
	    var possibleTypes = schema.getPossibleTypes(assertAbstractType(type));
	    var schemaFieldDef = void 0;

	    var _loop = function _loop(ii) {
	      var possibleField = possibleTypes[ii].getFields()[fieldName];
	      if (possibleField) {
	        // Fat interface fields can have differing arguments. Try to return
	        // a field with matching arguments, but still return a field if the
	        // arguments do not match.
	        schemaFieldDef = possibleField;
	        if (fieldAST && fieldAST.arguments) {
	          var argumentsAllExist = fieldAST.arguments.every(function (argument) {
	            return possibleField.args.find(function (argDef) {
	              return argDef.name === getName(argument);
	            });
	          });
	          if (argumentsAllExist) {
	            return 'break';
	          }
	        }
	      }
	    };

	    for (var ii = 0; ii < possibleTypes.length; ii++) {
	      var _ret = _loop(ii);

	      if (_ret === 'break') break;
	    }
	    return schemaFieldDef;
	  }
	}

	module.exports = {
	  parse: parseRelay,
	  transform: transform
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayRelayDirectiveTransform
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var RELAY = 'relay';
	var PLURAL = 'plural';

	function transformSchema(schema) {
	  if (schema.getDirectives().find(function (directive) {
	    return directive.name === RELAY;
	  })) {
	    return schema;
	  }
	  return __webpack_require__(3).extendSchema(schema, __webpack_require__(3).parse('directive @relay(plural: Boolean) on FRAGMENT'));
	}

	/**
	 * A transform that extracts `@relay(plural: Boolean)` directives and converts
	 * them to metadata that can be accessed at runtime.
	 */
	function transform(context) {
	  return __webpack_require__(11).transform(context, {
	    Fragment: visitFragment
	  }, function () {
	    return {};
	  });
	}

	function visitFragment(fragment) {
	  var relayDirective = fragment.directives.find(function (_ref) {
	    var name = _ref.name;
	    return name === RELAY;
	  });
	  if (!relayDirective) {
	    return fragment;
	  }

	  var _getRelayLiteralArgum = __webpack_require__(42)(relayDirective.args),
	      plural = _getRelayLiteralArgum.plural;

	  __webpack_require__(1)(plural === undefined || typeof plural === 'boolean', 'RelayRelayDirectiveTransform: Expected the %s argument to @%s to be ' + 'a boolean literal or not specified.', PLURAL, RELAY);
	  return (0, _extends3['default'])({}, fragment, {
	    directives: fragment.directives.filter(function (directive) {
	      return directive !== relayDirective;
	    }),
	    metadata: (0, _extends3['default'])({}, fragment.metadata || {}, {
	      plural: plural
	    })
	  });
	}

	module.exports = {
	  transform: transform,
	  transformSchema: transformSchema
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule stableJSONStringify
	 * @format
	 */

	'use strict';

	/**
	 * Simple recursive stringifier that produces a stable JSON string suitable for
	 * use as a cache key. Does not handle corner-cases such as circular references
	 * or exotic types.
	 */

	var _stringify2 = _interopRequireDefault(__webpack_require__(13));

	var _keys2 = _interopRequireDefault(__webpack_require__(15));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function stableJSONStringify(obj) {
	  if (Array.isArray(obj)) {
	    var result = [];
	    for (var ii = 0; ii < obj.length; ii++) {
	      var value = obj[ii] !== undefined ? obj[ii] : null;
	      result.push(stableJSONStringify(value));
	    }
	    return '[' + result.join(',') + ']';
	  } else if (typeof obj === 'object' && obj) {
	    var _result = [];
	    var keys = (0, _keys2['default'])(obj);
	    keys.sort();
	    for (var _ii = 0; _ii < keys.length; _ii++) {
	      var key = keys[_ii];
	      var _value = stableJSONStringify(obj[key]);
	      _result.push('"' + key + '":' + _value);
	    }
	    return '{' + _result.join(',') + '}';
	  } else {
	    return (0, _stringify2['default'])(obj);
	  }
	}

	module.exports = stableJSONStringify;

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/Promise");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/forEachObject");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/partitionArray");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayCodegenWatcher
	 * 
	 * @format
	 */
	'use strict';

	var _asyncToGenerator2 = __webpack_require__(19);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	var _promise2 = _interopRequireDefault(__webpack_require__(29));

	var _set2 = _interopRequireDefault(__webpack_require__(18));

	let queryFiles = (() => {
	  var _ref2 = (0, _asyncToGenerator3.default)(function* (baseDir, expression, filter) {
	    var client = new PromiseClient();
	    var watchResp = yield client.watchProject(baseDir);
	    var resp = yield client.command('query', watchResp.root, makeQuery(watchResp.relativePath, expression));
	    client.end();
	    return updateFiles(new _set2['default'](), filter, resp.files);
	  });

	  return function queryFiles(_x, _x2, _x3) {
	    return _ref2.apply(this, arguments);
	  };
	})();

	/**
	 * Provides a simplified API to the watchman API.
	 * Given some base directory and a list of subdirectories it calls the callback
	 * with watchman change events on file changes.
	 */


	let watch = (() => {
	  var _ref3 = (0, _asyncToGenerator3.default)(function* (baseDir, expression, callback) {
	    var client = new PromiseClient();
	    var watchResp = yield client.watchProject(baseDir);

	    yield makeSubscription(client, watchResp.root, watchResp.relativePath, expression, callback);
	  });

	  return function watch(_x4, _x5, _x6) {
	    return _ref3.apply(this, arguments);
	  };
	})();

	let makeSubscription = (() => {
	  var _ref4 = (0, _asyncToGenerator3.default)(function* (client, root, relativePath, expression, callback) {
	    client.on('subscription', function (resp) {
	      if (resp.subscription === SUBSCRIPTION_NAME) {
	        callback(resp);
	      }
	    });
	    yield client.command('subscribe', root, SUBSCRIPTION_NAME, makeQuery(relativePath, expression));
	  });

	  return function makeSubscription(_x7, _x8, _x9, _x10, _x11) {
	    return _ref4.apply(this, arguments);
	  };
	})();

	/**
	 * Further simplifies `watch` and calls the callback on every change with a
	 * full list of files that match the conditions.
	 */


	let watchFiles = (() => {
	  var _ref5 = (0, _asyncToGenerator3.default)(function* (baseDir, expression, filter, callback) {
	    var files = new _set2['default']();
	    yield watch(baseDir, expression, function (changes) {
	      if (!changes.files) {
	        // Watchmen fires a change without files when a watchman state changes,
	        // for example during an hg update.
	        return;
	      }
	      files = updateFiles(files, filter, changes.files);
	      callback(files);
	    });
	  });

	  return function watchFiles(_x12, _x13, _x14, _x15) {
	    return _ref5.apply(this, arguments);
	  };
	})();

	/**
	 * Similar to watchFiles, but takes an async function. The `compile` function
	 * is awaited and not called in parallel. If multiple changes are triggered
	 * before a compile finishes, the latest version is called after the compile
	 * finished.
	 *
	 * TODO: Consider changing from a Promise to abortable, so we can abort mid
	 *       compilation.
	 */


	let watchCompile = (() => {
	  var _ref6 = (0, _asyncToGenerator3.default)(function* (baseDir, expression, filter, compile) {
	    var compiling = false;
	    var needsCompiling = false;
	    var latestFiles = null;

	    watchFiles(baseDir, expression, filter, (() => {
	      var _ref7 = (0, _asyncToGenerator3.default)(function* (files) {
	        needsCompiling = true;
	        latestFiles = files;
	        if (compiling) {
	          return;
	        }
	        compiling = true;
	        while (needsCompiling) {
	          needsCompiling = false;
	          yield compile(latestFiles);
	        }
	        compiling = false;
	      });

	      return function (_x20) {
	        return _ref7.apply(this, arguments);
	      };
	    })());
	  });

	  return function watchCompile(_x16, _x17, _x18, _x19) {
	    return _ref6.apply(this, arguments);
	  };
	})();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var SUBSCRIPTION_NAME = 'relay-codegen';

	function updateFiles(files, filter, fileChanges) {
	  var newFiles = new _set2['default'](files);
	  fileChanges.forEach(function (_ref) {
	    var name = _ref.name,
	        exists = _ref.exists;

	    if (exists && filter(name)) {
	      newFiles.add(name);
	    } else {
	      newFiles['delete'](name);
	    }
	  });
	  return newFiles;
	}

	function makeQuery(relativePath, expression) {
	  return {
	    expression: expression,
	    fields: ['name', 'exists'],
	    relative_root: relativePath
	  };
	}

	var PromiseClient = function () {
	  function PromiseClient() {
	    (0, _classCallCheck3['default'])(this, PromiseClient);

	    this._client = new (__webpack_require__(78).Client)();
	  }

	  PromiseClient.prototype.command = function command() {
	    var _this = this;

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return new _promise2['default'](function (resolve, reject) {
	      _this._client.command(args, function (error, response) {
	        if (error) {
	          reject(error);
	        } else {
	          resolve(response);
	        }
	      });
	    });
	  };

	  PromiseClient.prototype.watchProject = (() => {
	    var _ref8 = (0, _asyncToGenerator3.default)(function* (baseDir) {
	      var resp = yield this.command('watch-project', baseDir);
	      if ('warning' in resp) {
	        console.error('Warning:', resp.warning);
	      }
	      return {
	        root: resp.watch,
	        relativePath: resp.relative_path
	      };
	    });

	    function watchProject(_x21) {
	      return _ref8.apply(this, arguments);
	    }

	    return watchProject;
	  })();

	  PromiseClient.prototype.on = function on(event, callback) {
	    this._client.on(event, callback);
	  };

	  PromiseClient.prototype.end = function end() {
	    this._client.end();
	  };

	  return PromiseClient;
	}();

	module.exports = {
	  queryFiles: queryFiles,
	  watch: watch,
	  watchFiles: watchFiles,
	  watchCompile: watchCompile
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayCompiler
	 * @format
	 */

	'use strict';

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	var _map2 = _interopRequireDefault(__webpack_require__(14));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * A utility class for parsing a corpus of GraphQL documents, transforming them
	 * with a standardized set of transforms, and generating runtime representations
	 * of each definition.
	 */
	var RelayCompiler = function () {

	  // The context passed in must already have any Relay-specific schema extensions
	  function RelayCompiler(schema, context, transforms) {
	    (0, _classCallCheck3['default'])(this, RelayCompiler);

	    this._context = context;
	    // some transforms depend on this being the original schema,
	    // not the transformed schema/context's schema
	    this._schema = schema;
	    this._transforms = transforms;
	  }

	  RelayCompiler.prototype.clone = function clone() {
	    return new RelayCompiler(this._schema, this._context, this._transforms);
	  };

	  RelayCompiler.prototype.context = function context() {
	    return this._context;
	  };

	  RelayCompiler.prototype.addDefinitions = function addDefinitions(definitions) {
	    this._context = this._context.addAll(definitions);
	    return this._context.documents();
	  };

	  // Can only be called once per compiler. Once run, will use cached context
	  // To re-run, clone the compiler.


	  RelayCompiler.prototype.transformedQueryContext = function transformedQueryContext() {
	    var _this = this;

	    if (this._transformedQueryContext) {
	      return this._transformedQueryContext;
	    }
	    this._transformedQueryContext = this._transforms.queryTransforms.reduce(function (ctx, transform) {
	      return transform(ctx, _this._schema);
	    }, this._context);
	    return this._transformedQueryContext;
	  };

	  RelayCompiler.prototype.compile = function compile() {
	    var _this2 = this;

	    var transformContext = function transformContext(ctx, transform) {
	      return transform(ctx, _this2._schema);
	    };
	    var fragmentContext = this._transforms.fragmentTransforms.reduce(transformContext, this._context);
	    var queryContext = this.transformedQueryContext();
	    var printContext = this._transforms.printTransforms.reduce(transformContext, queryContext);
	    var codeGenContext = this._transforms.codegenTransforms.reduce(transformContext, queryContext);

	    var compiledDocuments = new _map2['default']();
	    fragmentContext.documents().forEach(function (node) {
	      if (node.kind !== 'Fragment') {
	        return;
	      }
	      var generatedFragment = __webpack_require__(22).generate(node);
	      compiledDocuments.set(node.name, generatedFragment);
	    });
	    queryContext.documents().forEach(function (node) {
	      if (node.kind !== 'Root') {
	        return;
	      }
	      var name = node.name;
	      // The unflattened query is used for printing, since flattening creates an
	      // invalid query.

	      var text = __webpack_require__(67)(printContext.getRoot(name), printContext).documents().map(__webpack_require__(63).print).join('\n');
	      // The original query (with fragment spreads) is converted to a fragment
	      // for reading out the root data.
	      var sourceNode = fragmentContext.getRoot(name);
	      var rootFragment = buildFragmentForRoot(sourceNode);
	      var generatedFragment = __webpack_require__(22).generate(rootFragment);
	      // The flattened query is used for codegen in order to reduce the number of
	      // duplicate fields that must be processed during response normalization.
	      var codeGenNode = codeGenContext.getRoot(name);
	      var generatedQuery = __webpack_require__(22).generate(codeGenNode);

	      var batchQuery = {
	        fragment: generatedFragment,
	        id: null,
	        kind: 'Batch',
	        metadata: node.metadata || {},
	        name: name,
	        query: generatedQuery,
	        text: text
	      };

	      var res = __webpack_require__(81)('POST', 'http://server:8080/graphql/r', {
	        json: { name: batchQuery.name, text: batchQuery.text }
	      });

	      var data = JSON.parse(res.getBody('utf8'));

	      batchQuery.id = data.id;
	      compiledDocuments.set(name, batchQuery);
	    });
	    return compiledDocuments;
	  };

	  return RelayCompiler;
	}();

	/**
	 * Construct the fragment equivalent of a root node.
	 */


	function buildFragmentForRoot(root) {
	  return {
	    argumentDefinitions: root.argumentDefinitions,
	    directives: root.directives,
	    kind: 'Fragment',
	    metadata: null,
	    name: root.name,
	    selections: root.selections,
	    type: root.type
	  };
	}

	module.exports = RelayCompiler;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayCompilerScope
	 * 
	 * @format
	 */

	'use strict';

	var GraphQLNonNull = __webpack_require__(3).GraphQLNonNull;

	/**
	 * A scope is a mapping of the values for each argument defined by the nearest
	 * ancestor root or fragment of a given IR selection. A scope maps argument
	 * names to the argument's statically determined value, which can be either a
	 * variable or a literal.
	 *
	 * There are two categories of scopes: root scopes and fragment scopes.
	 *
	 * Root scopes apply to `Root` IR and their subselections, up until any fragment
	 * spreads. Root scopes have the property that any argument may be provided at
	 * runtime: even where a default value is defined, the compiler must consider
	 * the value to be variable. Therefore, root scopes are a mapping of argument
	 * name to variables of the same name:
	 *
	 *   Map {
	 *     foo: $foo
	 *   }
	 *
	 * Fragment scopes apply to `Fragment` IR nodes and their subselections, up
	 * until any fragment spreads. Fragment scopes differ from root scopes in
	 * several ways:
	 * - Arguments may be overridden by the including fragment spread.
	 * - Arguments may import values from the root scope.
	 * - All other arguments must have their default values, or be null.
	 *
	 * Fragment scopes are also a mapping of argument name to value, but the value
	 * may also be a literal:
	 *
	 *   Map {
	 *     foo: $foo
	 *     bar: 42
	 *   }
	 */


	/**
	 * Creates a scope for a `Root`, with each argument mapped to a variable of the
	 * same name. Example:
	 *
	 * Query:
	 * query Foo($id: ID, $size: Int = 42) { ... }
	 *
	 * Scope:
	 * {
	 *   id: $id,
	 *   size: $size,
	 * }
	 *
	 * Note that even though a default value is defined for $size, the scope must
	 * assume that this could be overridden at runtime. The value cannot be decided
	 * statically and therefore is set to a variable.
	 */
	function getRootScope(definitions) {
	  var scope = {};
	  definitions.forEach(function (definition) {
	    scope[definition.name] = {
	      kind: 'Variable',
	      variableName: definition.name
	    };
	  });
	  return scope;
	}

	/**
	 * Creates a scope for a `Fragment` by translating fragment spread arguments in
	 * the context of a parent scope into a new scope and validating them against
	 * the argument definitions.
	 *
	 *
	 * Parent Scope:
	 * {
	 *   active: $parentActive
	 * }
	 *
	 * Fragment Spread:
	 * ...Bar(size: 42, enabled: $active)
	 *
	 * Fragment:
	 * fragment Bar on Foo @argumentDefinitions(
	 *   id: {type: "ID"}
	 *   size: {type: "Int"}
	 *   enabled: {type: "Boolean}
	 *   scale: {type: "Int", imports: "pixelRatio"}
	 * )
	 *
	 * Scope:
	 * {
	 *   // No argument is provided for $id, it gets the default value which in this
	 *   // case is `null`:
	 *   id: null,
	 *
	 *   // The parent passes 42 as a literal value for $size:
	 *   size: 42,
	 *
	 *   // The parent passes a variable as the value of $enabled. This variable is
	 *   // resolved in the parent scope to the value $parentActive, which becomes
	 *   // the value of $enabled:
	 *   $enabled: $parentActive,
	 *
	 *   // $scale imports pixelRatio from the root scope. Since any argument in a
	 *   // root scope maps to a variable of the same name, that means the value of
	 *   // pixelRatio in the root is $pixelRatio:
	 *   $scale: $pixelRatio,
	 * }
	 */
	function getFragmentScope(definitions, args, parentScope) {
	  var argMap = {};
	  args.forEach(function (arg) {
	    if (arg.value.kind === 'Literal') {
	      argMap[arg.name] = arg.value;
	    } else if (arg.value.kind === 'Variable') {
	      argMap[arg.name] = parentScope[arg.value.variableName];
	    }
	  });

	  var fragmentScope = {};
	  definitions.forEach(function (definition) {
	    if (definition.kind === 'RootArgumentDefinition') {
	      __webpack_require__(1)(!argMap.hasOwnProperty(definition.name), 'RelayCompilerScope: Unexpected argument for global variable `%s`. ' + '@arguments may only be provided for variables defined in the ' + "fragment's @argumentDefinitions list.", definition.name);
	      fragmentScope[definition.name] = {
	        kind: 'Variable',
	        variableName: definition.name
	      };
	    } else {
	      var arg = argMap[definition.name];
	      if (arg == null || arg.kind === 'Literal' && arg.value == null) {
	        // No variable or literal null was passed, fall back to default
	        // value.
	        __webpack_require__(1)(definition.defaultValue != null || !(definition.type instanceof GraphQLNonNull), 'RelayCompilerScope: No value found for required argument ' + '`$%s: %s`.', definition.name, definition.type.toString());
	        fragmentScope[definition.name] = {
	          kind: 'Literal',
	          value: definition.defaultValue
	        };
	      } else {
	        // Variable or non-null literal.
	        fragmentScope[definition.name] = arg;
	      }
	    }
	  });
	  return fragmentScope;
	}

	module.exports = { getFragmentScope: getFragmentScope, getRootScope: getRootScope };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayExportTransform
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	var _keys2 = _interopRequireDefault(__webpack_require__(15));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var GraphQLList = __webpack_require__(3).GraphQLList;

	var EXPORT = 'export';
	var AS = 'as';

	function transformSchema(schema) {
	  return __webpack_require__(3).extendSchema(schema, __webpack_require__(3).parse('directive @export(as: String!) on FIELD'));
	}

	/**
	 * A transform that extracts `@export(as: "<name>")` directives and converts
	 * them to metadata that can be accessed at runtime.
	 */
	function transform(context) {
	  return context.documents().reduce(function (ctx, node) {
	    if (node.kind === 'Root') {
	      var metadata = {};
	      var path = [];
	      var transformedNode = transformNode(node, path, metadata);
	      transformedNode.metadata = transformedNode.metadata || {};
	      if ((0, _keys2['default'])(metadata).length) {
	        transformedNode.metadata[EXPORT] = metadata;
	      }
	      return ctx.add(transformedNode);
	    } else {
	      return ctx.add(node);
	    }
	  }, new (__webpack_require__(10))(context.schema));
	}

	function transformNode(node, path, metadata) {
	  var selections = node.selections.map(function (selection) {
	    var nextSelection = selection;
	    if (selection.kind === 'ScalarField') {
	      var _partitionArray = __webpack_require__(31)(selection.directives, function (directive) {
	        return directive.name === EXPORT;
	      }),
	          exports = _partitionArray[0],
	          directives = _partitionArray[1];

	      if (exports.length) {
	        // Extract export
	        __webpack_require__(1)(exports.length === 1, 'RelayExportTransform: Expected at most one `@${EXPORT}` ' + 'directive on field `%s`, got %s.', selection.name, exports.length);
	        var exportAs = exports[0].args.find(function (arg) {
	          return arg.name === AS;
	        });
	        __webpack_require__(1)(exportAs && exportAs.value.kind === 'Literal', 'RelayExportTransform: Expected a literal `%s` argument on ' + 'the `@${EXPORT}` directive on field `%s`.', AS, selection.name);
	        var exportName = exportAs.value.value;
	        __webpack_require__(1)(typeof exportName === 'string', 'RelayExportTransform: Expected the export name to be a string, ' + 'got `%s`.', exportName);
	        __webpack_require__(1)(!metadata.hasOwnProperty(exportName), 'RelayExportTransform: Expected a given name to be exported at ' + 'most once within a given query, `%s` was exported multiple times.', exportName);
	        var alias = selection.alias || selection.name;
	        var fieldPath = [].concat((0, _toConsumableArray3['default'])(path), [alias]);
	        if (selection.type instanceof GraphQLList) {
	          fieldPath.push('*');
	        }
	        metadata[exportName] = fieldPath;
	        nextSelection = (0, _extends3['default'])({}, selection, {
	          directives: directives
	        });
	      }
	    } else if (selection.kind === 'LinkedField') {
	      __webpack_require__(1)(selection.directives.every(function (directive) {
	        return directive.name !== EXPORT;
	      }), 'RelayExportTransform: Unexpected `@${EXPORT}` directive on linked ' + 'field `%s`. Only scalar fields such as `id` can be exported.', selection.name);
	      var _fieldPath = [].concat((0, _toConsumableArray3['default'])(path), [selection.alias || selection.name]);
	      if (selection.type instanceof GraphQLList) {
	        _fieldPath.push('*');
	      }
	      nextSelection = transformNode(selection, _fieldPath, metadata);
	    } else if (selection.kind === 'Condition' || selection.kind === 'InlineFragment') {
	      nextSelection = transformNode(selection, path, metadata);
	    }
	    return nextSelection; // provably the same type as `selection`
	  });
	  return (0, _extends3['default'])({}, node, {
	    selections: selections
	  }); // provably of the same type as `node`
	}

	module.exports = {
	  transform: transform,
	  transformSchema: transformSchema
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayFilterDirectivesTransform
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * A transform that removes any directives that were not present in the
	 * original schema.
	 */
	function transform(context, schema) {
	  return __webpack_require__(11).transform(context, { Directive: visitDirective }, function () {
	    return schema;
	  });
	}

	/**
	 * @internal
	 *
	 * Skip directives not defined in the original schema.
	 */
	function visitDirective(directive, state) {
	  if (state.getDirectives().some(function (schemaDirective) {
	    return schemaDirective.name === directive.name;
	  })) {
	    return directive;
	  }
	  return null;
	}

	module.exports = { transform: transform };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelaySkipRedundantNodesTransform
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var IMap = __webpack_require__(12).Map;

	/**
	 * A transform that removes redundant fields and fragment spreads. Redundancy is
	 * defined in this context as any selection that is guaranteed to already be
	 * fetched by an ancestor selection. This can occur in two cases:
	 *
	 * 1. Simple duplicates at the same level of the document can always be skipped:
	 *
	 * ```
	 * fragment Foo on FooType {
	 *   id
	 *   id
	 *   ...Bar
	 *   ...Bar
	 * }
	 * ```
	 *
	 * Becomes
	 *
	 * ```
	 * fragment Foo on FooType {
	 *   id
	 *   ...Bar
	 * }
	 * ```
	 *
	 * 2. Inline fragments and conditions introduce the possibility for duplication
	 * at different levels of the tree. Whenever a selection is fetched in a parent,
	 * it is redundant to also fetch it in a child:
	 *
	 * ```
	 * fragment Foo on FooType {
	 *   id
	 *   ... on OtherType {
	 *     id # 1
	 *   }
	 *   ... on FooType @include(if: $cond) {
	 *     id # 2
	 *   }
	 * }
	 * ```
	 *
	 * Becomes:
	 *
	 * ```
	 * fragment Foo on FooType {
	 *   id
	 * }
	 * ```
	 *
	 * In this example:
	 * - 1 can be skipped because `id` is already fetched by the parent. Even
	 *   though the type is different (FooType/OtherType), the inline fragment
	 *   cannot match without the outer fragment matching so the outer `id` is
	 *   guaranteed to already be fetched.
	 * - 2 can be skipped for similar reasons: it doesn't matter if the condition
	 *   holds, `id` is already fetched by the parent regardless.
	 *
	 * This transform also handles more complicated cases in which selections are
	 * nested:
	 *
	 * ```
	 * fragment Foo on FooType {
	 *   a {
	 *     bb
	 *   }
	 *   ... on OtherType {
	 *     a {
	 *       bb # 1
	 *       cc
	 *     }
	 *   }
	*  }
	 * ```
	 *
	 * Becomes
	 *
	 * ```
	 * fragment Foo on FooType {
	 *   a {
	 *     bb
	 *   }
	 *   ... on OtherType {
	 *     a {
	 *       cc
	 *     }
	 *   }
	*  }
	 * ```
	 *
	 * 1 can be skipped because it is already fetched at the outer level.
	 */


	/**
	 * A simplified representation of a document: keys in the map are unique
	 * identifiers for the selections of a node, values are either null (for scalars)
	 * or nested maps for items with subselections (linked fields, inline fragments,
	 * etc).
	 */
	function transform(context) {
	  return context.documents().reduce(function (ctx, node) {
	    var selectionMap = new IMap();
	    var transformed = transformNode(node, selectionMap);
	    if (transformed) {
	      return ctx.add(transformed.node);
	    } else {
	      return ctx;
	    }
	  }, new (__webpack_require__(10))(context.schema));
	}

	/**
	 * The most straightforward approach would be two passes: one to record the
	 * structure of the document, one to prune duplicates. This implementation uses
	 * a single pass. Selections are sorted with fields first, "conditionals"
	 * (inline fragments & conditions) last. This means that all fields that are
	 * guaranteed to be fetched are encountered prior to any duplicates that may be
	 * fetched within a conditional.
	 *
	 * Because selections fetched within a conditional are not guaranteed to be
	 * fetched in the parent, a fork of the selection map is created when entering a
	 * conditional. The sort ensures that guaranteed fields have already been seen
	 * prior to the clone.
	 */
	function transformNode(node, selectionMap) {
	  var selections = [];
	  sortSelections(node.selections).forEach(function (selection) {
	    var identifier = __webpack_require__(41)(selection);
	    switch (selection.kind) {
	      case 'ScalarField':
	      case 'FragmentSpread':
	        {
	          if (!selectionMap.has(identifier)) {
	            selections.push(selection);
	            selectionMap = selectionMap.set(identifier, null);
	          }
	          break;
	        }
	      case 'LinkedField':
	        {
	          var transformed = transformNode(selection, selectionMap.get(identifier) || new IMap());
	          if (transformed) {
	            selections.push(transformed.node);
	            selectionMap = selectionMap.set(identifier, transformed.selectionMap);
	          }
	          break;
	        }
	      case 'InlineFragment':
	      case 'Condition':
	        {
	          // Fork the selection map to prevent conditional selections from
	          // affecting the outer "guaranteed" selections.
	          var _transformed = transformNode(selection, selectionMap.get(identifier) || selectionMap);
	          if (_transformed) {
	            selections.push(_transformed.node);
	            selectionMap = selectionMap.set(identifier, _transformed.selectionMap);
	          }
	          break;
	        }
	      default:
	        __webpack_require__(1)(false, 'RelaySkipRedundantNodesTransform: Unexpected node kind `%s`.', selection.kind);
	    }
	  });
	  if (!selections.length) {
	    return null;
	  }
	  return {
	    selectionMap: selectionMap,
	    node: (0, _extends3['default'])({}, node, {
	      selections: selections
	    })
	  };
	}

	/**
	 * Sort inline fragments and conditions after other selections.
	 */
	function sortSelections(selections) {
	  return [].concat((0, _toConsumableArray3['default'])(selections)).sort(function (a, b) {
	    return a.kind === 'InlineFragment' || a.kind === 'Condition' ? 1 : b.kind === 'InlineFragment' || b.kind === 'Condition' ? -1 : 0;
	  });
	}

	module.exports = { transform: transform };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayValidator
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(3),
	    ArgumentsOfCorrectTypeRule = _require.ArgumentsOfCorrectTypeRule,
	    DefaultValuesOfCorrectTypeRule = _require.DefaultValuesOfCorrectTypeRule,
	    formatError = _require.formatError,
	    FragmentsOnCompositeTypesRule = _require.FragmentsOnCompositeTypesRule,
	    KnownArgumentNamesRule = _require.KnownArgumentNamesRule,
	    KnownFragmentNamesRule = _require.KnownFragmentNamesRule,
	    KnownTypeNamesRule = _require.KnownTypeNamesRule,
	    LoneAnonymousOperationRule = _require.LoneAnonymousOperationRule,
	    NoFragmentCyclesRule = _require.NoFragmentCyclesRule,
	    NoUndefinedVariablesRule = _require.NoUndefinedVariablesRule,
	    NoUnusedFragmentsRule = _require.NoUnusedFragmentsRule,
	    NoUnusedVariablesRule = _require.NoUnusedVariablesRule,
	    OverlappingFieldsCanBeMergedRule = _require.OverlappingFieldsCanBeMergedRule,
	    PossibleFragmentSpreadsRule = _require.PossibleFragmentSpreadsRule,
	    ProvidedNonNullArgumentsRule = _require.ProvidedNonNullArgumentsRule,
	    ScalarLeafsRule = _require.ScalarLeafsRule,
	    UniqueArgumentNamesRule = _require.UniqueArgumentNamesRule,
	    UniqueFragmentNamesRule = _require.UniqueFragmentNamesRule,
	    UniqueInputFieldNamesRule = _require.UniqueInputFieldNamesRule,
	    UniqueOperationNamesRule = _require.UniqueOperationNamesRule,
	    UniqueVariableNamesRule = _require.UniqueVariableNamesRule,
	    validate = _require.validate,
	    VariablesAreInputTypesRule = _require.VariablesAreInputTypesRule,
	    VariablesInAllowedPositionRule = _require.VariablesInAllowedPositionRule;

	function validateOrThrow(document, schema, rules) {
	  var validationErrors = validate(schema, document, rules);
	  if (validationErrors && validationErrors.length > 0) {
	    var formattedErrors = validationErrors.map(formatError);
	    var error = new Error(__webpack_require__(32).format('You supplied a GraphQL document with validation errors:\n%s', formattedErrors.map(function (e) {
	      return e.message;
	    }).join('\n')));
	    error.validationErrors = formattedErrors;
	    throw error;
	  }
	}

	function DisallowIdAsAliasValidationRule(context) {
	  return {
	    Field: function Field(field) {
	      if (field.alias && field.alias.value === 'id' && field.name.value !== 'id') {
	        throw new Error('RelayValidator: Relay does not allow aliasing fields to `id`. ' + 'This name is reserved for the globally unique `id` field on ' + '`Node`.');
	      }
	    }
	  };
	}

	module.exports = {
	  GLOBAL_RULES: [KnownArgumentNamesRule, KnownFragmentNamesRule, NoFragmentCyclesRule, NoUndefinedVariablesRule, NoUnusedFragmentsRule, NoUnusedVariablesRule, OverlappingFieldsCanBeMergedRule, ProvidedNonNullArgumentsRule, UniqueArgumentNamesRule, UniqueFragmentNamesRule, UniqueInputFieldNamesRule, UniqueOperationNamesRule, UniqueVariableNamesRule],
	  LOCAL_RULES: [ArgumentsOfCorrectTypeRule, DefaultValuesOfCorrectTypeRule,
	  // TODO #13818691: make this aware of @fixme_fat_interface
	  // FieldsOnCorrectTypeRule,
	  FragmentsOnCompositeTypesRule, KnownTypeNamesRule,
	  // TODO #17737009: Enable this after cleaning up existing issues
	  // KnownDirectivesRule,
	  LoneAnonymousOperationRule, PossibleFragmentSpreadsRule, ScalarLeafsRule, VariablesAreInputTypesRule, VariablesInAllowedPositionRule, DisallowIdAsAliasValidationRule],
	  validate: validateOrThrow
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayViewerHandleTransform
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(16),
	    DEFAULT_HANDLE_KEY = _require.DEFAULT_HANDLE_KEY;

	var _require2 = __webpack_require__(4),
	    getRawType = _require2.getRawType;

	var VIEWER_HANDLE = 'viewer';
	var VIEWER_TYPE = 'Viewer';

	/**
	 * A transform that adds a "viewer" handle to all fields whose type is `Viewer`.
	 */
	function transform(context, schema) {
	  var viewerType = schema.getType(VIEWER_TYPE);
	  if (viewerType == null) {
	    return context;
	  }
	  return __webpack_require__(11).transform(context, {
	    LinkedField: visitLinkedField
	  }, function () {
	    return {};
	  });
	}

	function visitLinkedField(field, state) {
	  var transformedNode = this.traverse(field, state);
	  if (getRawType(field.type).name !== VIEWER_TYPE) {
	    return transformedNode;
	  }
	  var handles = transformedNode.handles;
	  var viewerHandle = {
	    name: VIEWER_HANDLE,
	    key: DEFAULT_HANDLE_KEY,
	    filters: null
	  };

	  if (handles && !handles.find(function (handle) {
	    return handle.name === VIEWER_HANDLE;
	  })) {
	    handles = [].concat((0, _toConsumableArray3['default'])(handles), [viewerHandle]);
	  } else if (!handles) {
	    handles = [viewerHandle];
	  }
	  return handles !== transformedNode.handles ? (0, _extends3['default'])({}, transformedNode, { handles: handles }) : transformedNode;
	}

	module.exports = { transform: transform };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule getIdentifierForRelaySelection
	 * @format
	 */

	'use strict';

	/**
	 * Generates an identifier that is unique to a given selection: the alias for
	 * fields, the type for inline fragments, and a summary of the condition
	 * variable and passing value for conditions.
	 */
	function getIdentifierForRelaySelection(node) {
	  var obj = void 0;
	  switch (node.kind) {
	    case 'LinkedField':
	    case 'ScalarField':
	      obj = {
	        directives: node.directives,
	        field: node.alias || node.name
	      };
	      break;
	    case 'InlineFragment':
	      obj = {
	        inlineFragment: node.typeCondition.toString()
	      };
	      break;
	    case 'Condition':
	      obj = {
	        condition: node.condition,
	        passingValue: node.passingValue
	      };
	      break;
	    case 'FragmentSpread':
	      obj = {
	        fragmentSpread: node.name,
	        args: node.args
	      };
	      break;
	    default:
	      __webpack_require__(1)(false, 'RelayFlattenTransform: Unexpected kind `%s`.', node.kind);
	  }
	  return __webpack_require__(28)(obj);
	}

	module.exports = getIdentifierForRelaySelection;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getRelayLiteralArgumentValues
	 * 
	 * @format
	 */

	'use strict';

	function getRelayLiteralArgumentValues(args) {
	  var values = {};
	  args.forEach(function (arg) {
	    __webpack_require__(1)(arg.value.kind === 'Literal', 'getRelayLiteralArgumentValues(): Expected all args to be literals.');
	    values[arg.name] = arg.value.value;
	  });
	  return values;
	}

	module.exports = getRelayLiteralArgumentValues;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule prettyStringify
	 * @format
	 */

	'use strict';

	/**
	 * Simple wrapper for `JSON.stringify` that adds whitespace to aid readability:
	 *
	 * ```
	 * const object = {a: 1, b 2};
	 *
	 * JSON.stringify(object);  // {"a":1,"b":2}
	 *
	 * prettyStringify(object); // {
	 *                          //   "a": 1,
	 *                          //   "b": 2
	 *                          // }
	 * ```
	 */

	var _stringify2 = _interopRequireDefault(__webpack_require__(13));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function prettyStringify(stringifiable) {
	  return (0, _stringify2['default'])(stringifiable, null, 2);
	}

	module.exports = prettyStringify;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule printFlowTypes
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(59),
	    RELAY_CLASSIC_MUTATION = _require.RELAY_CLASSIC_MUTATION;

	var generate = __webpack_require__(45)['default'];

	var _require2 = __webpack_require__(4),
	    getRawType = _require2.getRawType;

	var traverse = __webpack_require__(76)['default'];

	var GraphQLEnumType = __webpack_require__(3).GraphQLEnumType,
	    GraphQLList = __webpack_require__(3).GraphQLList,
	    GraphQLNonNull = __webpack_require__(3).GraphQLNonNull,
	    GraphQLScalarType = __webpack_require__(3).GraphQLScalarType;

	var FIELD_BLACKLIST = ['clientMutationId', 'client_mutation_id'];

	/**
	 * Prints a given Root or Fragment into a Flow type declaration.
	 */
	function printFlowTypes(node) {
	  if (node.kind === 'Root') {
	    // for now, only fragments and mutations have flow types
	    if (node.operation === 'mutation') {
	      var selection = node.selections[0];
	      if (selection.kind === 'LinkedField') {
	        var argument = selection.args[0];
	        var inputIR = __webpack_require__(72)(argument);

	        var response = [];
	        if (node.name !== RELAY_CLASSIC_MUTATION) {
	          selection.name = node.name + 'Response';
	          response = normalize(transform(selection));
	        }
	        return normalize(transform(inputIR)).concat(response).map(function (n) {
	          return generate(n).code;
	        }).join('\n\n');
	      }
	    }
	  } else if (node.kind === 'Fragment') {
	    return normalize(transform(node)).map(function (n) {
	      return generate(n).code;
	    }).join('\n\n');
	  }
	}

	/**
	 * Transforms a "root" type (Fragment or LinkedField) into a Flow export type
	 * statement.
	 */
	function transform(node) {
	  return __webpack_require__(2).exportNamedDeclaration(__webpack_require__(2).typeAlias(__webpack_require__(2).identifier(node.name), null, __webpack_require__(2).objectTypeAnnotation(node.selections.map(function (selection) {
	    return transformSelection(selection);
	  }).reduce(function (prev, curr) {
	    if (!curr) {
	      return prev;
	    }
	    return prev.concat(curr);
	  }, []), null, null)), [], null);
	}

	function normalize(ast) {
	  var normalizedRoots = [ast];

	  var findObjectTypeProperty = {
	    enter: function enter(path) {
	      if (__webpack_require__(2).isObjectTypeProperty(path)) {
	        // Ignore object types that are direct children of the root Flow type
	        if (__webpack_require__(2).isTypeAlias(path.parent)) {
	          return;
	        }
	        var name = path.node.key.name;

	        path.traverse(findObjectTypeAnnotation, {
	          name: this.prevName + '_' + name
	        });
	      }
	    },

	    noScope: true
	  };
	  var findObjectTypeAnnotation = {
	    enter: function enter(path) {
	      if (__webpack_require__(2).isObjectTypeAnnotation(path)) {
	        // This has side effects on the path
	        path.traverse(findObjectTypeProperty, { prevName: this.name });

	        // Add the node of that transformed path to the array
	        normalizedRoots.push(__webpack_require__(2).exportNamedDeclaration(__webpack_require__(2).typeAlias(__webpack_require__(2).identifier(this.name), null, path.node), [], null));

	        // Replace that path with a reference to the extracted type
	        path.replaceWith(__webpack_require__(2).genericTypeAnnotation(__webpack_require__(2).identifier(this.name), null));
	      }
	    },

	    noScope: true
	  };

	  traverse(ast, findObjectTypeProperty, {}, { prevName: ast.declaration.id.name });

	  return normalizedRoots;
	}

	/**
	 * Transforms a ScalarField or LinkedField to a Flow objectTypeProperty.
	 * If `forceNull` is true, the selection will *always* be a nullable field.
	 */
	function transformSelection(node) {
	  var forceNull = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (node.name && FIELD_BLACKLIST.indexOf(node.name) !== -1) {
	    return;
	  }

	  var name = node.alias || node.name && node.name;
	  var annotation = void 0;
	  var body = void 0;
	  switch (node.kind) {
	    case 'ScalarField':
	      body = wrapNullOrArray(node.type, transformScalarField(getRawType(node.type)));
	      if (body.type !== 'NullableTypeAnnotation' && forceNull) {
	        body = __webpack_require__(2).nullableTypeAnnotation(body);
	      }
	      annotation = __webpack_require__(2).objectTypeProperty(__webpack_require__(2).identifier(name), body);
	      break;
	    case 'LinkedField':
	      body = wrapNullOrArray(node.type, transformLinkedField(node));
	      if (body.type !== 'NullableTypeAnnotation' && forceNull) {
	        body = __webpack_require__(2).nullableTypeAnnotation(body);
	      }
	      annotation = __webpack_require__(2).objectTypeProperty(__webpack_require__(2).identifier(name), body);
	      break;
	    case 'Condition':
	      annotation = node.selections.map(function (s) {
	        return transformSelection(s, true);
	      }).reduce(function (prev, curr) {
	        if (!curr) {
	          return prev;
	        }
	        return prev.concat(curr);
	      }, []);
	      break;
	    case 'FragmentSpread':
	      return; // noop
	    case 'InlineFragment':
	      return node.selections.map(function (s) {
	        return transformSelection(s);
	      }).reduce(function (prev, curr) {
	        if (!curr) {
	          return prev;
	        }
	        return prev.concat(curr);
	      }, []).map(function (s) {
	        s.optional = true;
	        return s;
	      });
	    default:
	      throw new Error('Unknown Selection type: ' + node.kind);
	  }

	  if (Array.isArray(annotation)) {
	    return annotation.map(function (a) {
	      if (!(node.type instanceof GraphQLNonNull)) {
	        a.optional = true;
	      }
	      return a;
	    });
	  }

	  if (!(node.type instanceof GraphQLNonNull)) {
	    annotation.optional = true;
	  }
	  return [annotation];
	}

	/**
	 * Wraps the given type annotation as a Flow Array.
	 */
	function getArrayTypeAnnotation(typeAnnotation) {
	  return __webpack_require__(2).genericTypeAnnotation(__webpack_require__(2).identifier('Array'), __webpack_require__(2).typeParameterInstantiation([typeAnnotation]));
	}

	/**
	 * Recursively wraps the given type with Array or NonNullable nodes until it
	 * reaches the root type.
	 */
	function wrapNullOrArray(type, child) {
	  var nullable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  if (!type) {
	    return child;
	  }

	  var annotation = void 0;
	  if (type instanceof GraphQLNonNull) {
	    return wrapNullOrArray(type.ofType, child, false);
	  } else if (type instanceof GraphQLList) {
	    annotation = getArrayTypeAnnotation(wrapNullOrArray(type.ofType, child));
	  } else {
	    annotation = child;
	  }

	  return nullable ? __webpack_require__(2).nullableTypeAnnotation(annotation) : annotation;
	}

	/**
	 * Transforms a LinkedField into a Flow objectTypeAnnotation.
	 */
	function transformLinkedField(node) {
	  var selections = node.selections.map(function (selection) {
	    return transformSelection(selection);
	  }).reduce(function (prev, curr) {
	    if (!curr) {
	      return prev;
	    }
	    return prev.concat(curr);
	  }, []);

	  // If there are no selections, then we know the only child was a FragmentSpread
	  // so we should make this field an 'any' type. (The alternative is an empty
	  // object!)
	  if (selections.length) {
	    return __webpack_require__(2).objectTypeAnnotation(selections, null, null);
	  } else {
	    return __webpack_require__(2).anyTypeAnnotation();
	  }
	}

	/**
	 * Transforms a ScalarField type into its corresponding Flow AST node.
	 */
	function transformScalarField(type) {
	  if (type instanceof GraphQLScalarType) {
	    switch (type.name) {
	      case 'Color':
	      case 'File':
	      case 'ID':
	      case 'String':
	      case 'Url':
	        return __webpack_require__(2).stringTypeAnnotation();
	      case 'Float':
	      case 'Int':
	      case 'Time':
	        return __webpack_require__(2).numberTypeAnnotation();
	      case 'Boolean':
	        return __webpack_require__(2).booleanTypeAnnotation();
	      default:
	        console.warn('Could not convert GraphQLScalarType(' + type.name + '), using \'any\'');
	        return __webpack_require__(2).anyTypeAnnotation();
	    }
	  } else if (type instanceof GraphQLEnumType) {
	    var stringLiterals = type.getValues().map(function (_ref) {
	      var value = _ref.value;

	      var literal = __webpack_require__(2).stringLiteralTypeAnnotation();
	      literal.value = value;
	      return literal;
	    });

	    return __webpack_require__(2).unionTypeAnnotation(stringLiterals);
	  } else {
	    throw new Error('Could not convert from GraphQL type ' + type.toString());
	  }
	}

	module.exports = printFlowTypes;

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("babel-generator");

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/Map");

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CodegenDirectory
	 * 
	 * @format
	 */

	'use strict';

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	var _set2 = _interopRequireDefault(__webpack_require__(18));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * CodegenDirectory is a helper class for scripts that generate code into one
	 * output directory. The purpose is to make it easy to only write files that
	 * have changed and delete files that are no longer generated.
	 * It gives statistics about added/removed/updated/unchanged in the end.
	 * The class also has an option to "validate" which means that no file
	 * operations are performed and only the statistics are created for what would
	 * have happened. If there's anything but "unchanged", someone probably forgot
	 * to run the codegen script.
	 *
	 * Example:
	 *
	 *   const dir = new CodegenDirectory('/some/path/generated');
	 *   // write files in case content changed (less watchman/mtime changes)
	 *   dir.writeFile('OneFile.js', contents);
	 *   dir.writeFile('OtherFile.js', contents);
	 *
	 *   // delete files that are not generated
	 *   dir.deleteExtraFiles();
	 *
	 *   // arrays of file names to print or whatever
	 *   dir.changes.created
	 *   dir.changes.updated
	 *   dir.changes.deleted
	 *   dir.changes.unchanged
	 */
	var CodegenDirectory = function () {
	  function CodegenDirectory(dir) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    (0, _classCallCheck3['default'])(this, CodegenDirectory);

	    this.onlyValidate = !!options.onlyValidate;
	    if (__webpack_require__(8).existsSync(dir)) {
	      __webpack_require__(1)(__webpack_require__(8).statSync(dir).isDirectory(), 'Expected `%s` to be a directory.', dir);
	    } else if (!this.onlyValidate) {
	      __webpack_require__(8).mkdirSync(dir);
	    }
	    this._files = new _set2['default']();
	    this.changes = {
	      deleted: [],
	      updated: [],
	      created: [],
	      unchanged: []
	    };
	    this._dir = dir;
	  }

	  CodegenDirectory.prototype.read = function read(filename) {
	    var filePath = __webpack_require__(7).join(this._dir, filename);
	    if (__webpack_require__(8).existsSync(filePath)) {
	      return __webpack_require__(8).readFileSync(filePath, 'utf8');
	    }
	    return null;
	  };

	  CodegenDirectory.prototype.markUnchanged = function markUnchanged(filename) {
	    this._addGenerated(filename);
	    this.changes.unchanged.push(filename);
	  };

	  /**
	   * Marks a files as updated or out of date without actually writing the file.
	   * This is probably only be useful when doing validation without intention to
	   * actually write to disk.
	   */


	  CodegenDirectory.prototype.markUpdated = function markUpdated(filename) {
	    this._addGenerated(filename);
	    this.changes.updated.push(filename);
	  };

	  CodegenDirectory.prototype.writeFile = function writeFile(filename, content) {
	    this._addGenerated(filename);
	    var filePath = __webpack_require__(7).join(this._dir, filename);
	    if (__webpack_require__(8).existsSync(filePath)) {
	      var existingContent = __webpack_require__(8).readFileSync(filePath, 'utf8');
	      if (existingContent === content) {
	        this.changes.unchanged.push(filename);
	      } else {
	        this._writeFile(filePath, content);
	        this.changes.updated.push(filename);
	      }
	    } else {
	      this._writeFile(filePath, content);
	      this.changes.created.push(filename);
	    }
	  };

	  CodegenDirectory.prototype._writeFile = function _writeFile(filePath, content) {
	    if (!this.onlyValidate) {
	      __webpack_require__(8).writeFileSync(filePath, content, 'utf8');
	    }
	  };

	  /**
	   * Deletes all non-generated files, except for invisible "dot" files (ie.
	   * files with names starting with ".").
	   */


	  CodegenDirectory.prototype.deleteExtraFiles = function deleteExtraFiles() {
	    var _this = this;

	    __webpack_require__(8).readdirSync(this._dir).forEach(function (actualFile) {
	      if (!_this._files.has(actualFile) && !/^\./.test(actualFile)) {
	        if (!_this.onlyValidate) {
	          __webpack_require__(8).unlinkSync(__webpack_require__(7).join(_this._dir, actualFile));
	        }
	        _this.changes.deleted.push(actualFile);
	      }
	    });
	  };

	  CodegenDirectory.prototype.getPath = function getPath(filename) {
	    return __webpack_require__(7).join(this._dir, filename);
	  };

	  CodegenDirectory.prototype._addGenerated = function _addGenerated(filename) {
	    __webpack_require__(1)(!this._files.has(filename), 'CodegenDirectory: Tried to generate `%s` twice in `%s`.', filename, this._dir);
	    this._files.add(filename);
	  };

	  return CodegenDirectory;
	}();

	module.exports = CodegenDirectory;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FileParser
	 * 
	 * @format
	 */

	'use strict';

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	var _map2 = _interopRequireDefault(__webpack_require__(14));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(12),
	    ImmutableMap = _require.Map;

	var FileParser = function () {
	  function FileParser(config) {
	    (0, _classCallCheck3['default'])(this, FileParser);
	    this._documents = new _map2['default']();

	    this._baseDir = config.baseDir;
	    this._parse = config.parse;
	  }

	  // Short-term: we don't do subscriptions/delta updates, instead always use all definitions


	  FileParser.prototype.documents = function documents() {
	    return ImmutableMap(this._documents);
	  };

	  // parse should return the set of changes


	  FileParser.prototype.parseFiles = function parseFiles(files) {
	    var _this = this;

	    var documents = ImmutableMap();

	    files.forEach(function (file) {
	      var doc = _this._parse(__webpack_require__(7).join(_this._baseDir, file));
	      if (!doc) {
	        _this._documents['delete'](file);
	        return;
	      }

	      documents = documents.set(file, doc);
	      _this._documents.set(file, doc);
	    });

	    return documents;
	  };

	  return FileParser;
	}();

	module.exports = FileParser;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FindGraphQLTags
	 * 
	 * @format
	 */

	'use strict';

	// Attempt to be as inclusive as possible of source text.
	var BABYLON_OPTIONS = {
	  allowImportExportEverywhere: true,
	  allowReturnOutsideFunction: true,
	  allowSuperOutsideMethod: true,
	  sourceType: 'module',
	  plugins: [
	  // Previously "*"
	  'asyncGenerators', 'classProperties', 'decorators', 'doExpressions', 'dynamicImport', 'exportExtensions', 'flow', 'functionBind', 'functionSent', 'jsx', 'objectRestSpread'],
	  strictMode: false
	};

	function find(text, filePath) {
	  var result = [];
	  var ast = __webpack_require__(77).parse(text, BABYLON_OPTIONS);
	  var moduleName = extractModuleName(text, filePath);

	  var visitors = {
	    CallExpression: function CallExpression(node) {
	      var callee = node.callee;
	      if (!(callee.type === 'Identifier' && CREATE_CONTAINER_FUNCTIONS[callee.name] || callee.kind === 'MemberExpression' && callee.object.type === 'Identifier' && callee.object.value === 'Relay' && callee.property.type === 'Identifier' && CREATE_CONTAINER_FUNCTIONS[callee.property.name])) {
	        traverse(node, visitors);
	        return;
	      }
	      var fragments = node.arguments[1];
	      if (fragments.type === 'ObjectExpression') {
	        fragments.properties.forEach(function (property) {
	          !(property.type === 'ObjectProperty' && property.key.type === 'Identifier' && property.value.type === 'TaggedTemplateExpression') ?  true ? invariant(false, 'FindGraphQLTags: `%s` expects fragment definitions to be ' + '`key: graphql`.', node.callee.name) : invariant(false) : void 0;
	          var keyName = property.key.name;
	          var tagName = getGraphQLTagName(property.value.tag);
	          !tagName ?  true ? invariant(false, 'FindGraphQLTags: `%s` expects fragment definitions to be tagged ' + 'with `graphql`, got `%s`.', node.callee.name, getSourceTextForLocation(text, property.value.tag.loc)) : invariant(false) : void 0;
	          var template = getGraphQLText(property.value.quasi);
	          if (tagName === 'graphql' || tagName === 'graphql.experimental') {
	            validateTemplate(template, moduleName, keyName);
	          }
	          result.push({
	            tag: tagName,
	            template: template
	          });
	        });
	      } else {
	        !(fragments && fragments.type === 'TaggedTemplateExpression') ?  true ? invariant(false, 'FindGraphQLTags: `%s` expects a second argument of fragment ' + 'definitions.', node.callee.name) : invariant(false) : void 0;
	        var tagName = getGraphQLTagName(fragments.tag);
	        !tagName ?  true ? invariant(false, 'FindGraphQLTags: `%s` expects fragment definitions to be tagged ' + 'with `graphql`, got `%s`.', node.callee.name, getSourceTextForLocation(text, fragments.tag.loc)) : invariant(false) : void 0;
	        var _template = getGraphQLText(fragments.quasi);
	        if (tagName === 'graphql' || tagName === 'graphql.experimental') {
	          validateTemplate(_template, moduleName);
	        }
	        result.push({
	          tag: tagName,
	          template: _template
	        });
	      }

	      // Visit remaining arguments
	      for (var ii = 2; ii < node.arguments.length; ii++) {
	        visit(node.arguments[ii], visitors);
	      }
	    },
	    TaggedTemplateExpression: function TaggedTemplateExpression(node) {
	      var tagName = getGraphQLTagName(node.tag);
	      if (tagName != null) {
	        var _template2 = getGraphQLText(node.quasi);
	        if (tagName === 'graphql' || tagName === 'graphql.experimental') {
	          validateTemplate(_template2, moduleName);
	        }
	        result.push({
	          tag: tagName,
	          template: node.quasi.quasis[0].value.raw
	        });
	      }
	    }
	  };
	  visit(ast, visitors);
	  return result;
	}

	var cache = {};
	function memoizedFind(text, filePath) {
	  var hash = __webpack_require__(46).createHash('md5').update(filePath).update(text).digest('hex');
	  var result = cache[hash];
	  if (!result) {
	    result = find(text, filePath);
	    cache[hash] = result;
	  }
	  return result;
	}

	var CREATE_CONTAINER_FUNCTIONS = {
	  createFragmentContainer: true,
	  createPaginationContainer: true,
	  createRefetchContainer: true
	};

	var IDENTIFIERS = {
	  graphql: true,
	  // TODO: remove this deprecated usage
	  Relay2QL: true
	};

	var IGNORED_KEYS = {
	  comments: true,
	  end: true,
	  leadingComments: true,
	  loc: true,
	  name: true,
	  start: true,
	  trailingComments: true,
	  type: true
	};

	function getGraphQLTagName(tag) {
	  if (tag.type === 'Identifier' && IDENTIFIERS.hasOwnProperty(tag.name)) {
	    return tag.name;
	  } else if (tag.type === 'MemberExpression' && tag.object.type === 'Identifier' && tag.object.name === 'graphql' && tag.property.type === 'Identifier' && tag.property.name === 'experimental') {
	    return 'graphql.experimental';
	  }
	  return null;
	}

	function getGraphQLText(quasi) {
	  var quasis = quasi.quasis;
	  !(quasis && quasis.length === 1) ?  true ? invariant(false, 'FindGraphQLTags: Substitutions are not allowed in graphql tags.') : invariant(false) : void 0;
	  return quasis[0].value.raw;
	}

	function getSourceTextForLocation(text, loc) {
	  if (loc == null) {
	    return '(source unavailable)';
	  }
	  var lines = text.split('\n').slice(loc.start.line - 1, loc.end.line);
	  lines[0] = lines[0].slice(loc.start.column);
	  lines[lines.length - 1] = lines[lines.length - 1].slice(0, loc.end.column);
	  return lines.join('\n');
	}

	function validateTemplate(template, moduleName, keyName) {
	  var ast = __webpack_require__(3).parse(template);
	  ast.definitions.forEach(function (def) {
	    !def.name ?  true ? invariant(false, 'FindGraphQLTags: In module `%s`, a definition of kind `%s` requires a name.', moduleName, def.kind) : invariant(false) : void 0;
	    var definitionName = def.name.value;
	    if (def.kind === 'OperationDefinition') {
	      var operationNameParts = definitionName.match(/^(.*)(Mutation|Query|Subscription)$/);
	      !(operationNameParts && definitionName.startsWith(moduleName)) ?  true ? invariant(false, 'FindGraphQLTags: Operation names in graphql tags must be prefixed ' + 'with the module name and end in "Mutation", "Query", or ' + '"Subscription". Got `%s` in module `%s`.', definitionName, moduleName) : invariant(false) : void 0;
	    } else if (def.kind === 'FragmentDefinition') {
	      if (keyName) {
	        !(definitionName === moduleName + '_' + keyName) ?  true ? invariant(false, 'FindGraphQLTags: Container fragment names must be ' + '`<ModuleName>_<propName>`. Got `%s`, expected `%s`.', definitionName, moduleName + '_' + keyName) : invariant(false) : void 0;
	      } else {
	        !definitionName.startsWith(moduleName) ?  true ? invariant(false, 'FindGraphQLTags: Fragment names in graphql tags must be prefixed ' + 'with the module name. Got `%s` in module `%s`.', definitionName, moduleName) : invariant(false) : void 0;
	      }
	    }
	  });
	}

	function extractModuleName(text, filePath) {
	  var rawModuleName = extractProvidesModuleName(text) || extractFileModuleName(filePath);
	  return rawModuleName.replace(/\.react$/, '').replace(/[^a-zA-Z0-9_]/g, '_');
	}

	function extractFileModuleName(filePath) {
	  var filename = __webpack_require__(7).basename(filePath, __webpack_require__(7).extname(filePath));
	  if (filename !== 'index') {
	    return filename;
	  }
	  return __webpack_require__(7).basename(__webpack_require__(7).dirname(filePath));
	}

	function extractProvidesModuleName(text) {
	  var propertyRegex = /@(\S+) *(\S*)/g;
	  var captures = void 0;
	  while (captures = propertyRegex.exec(text)) {
	    var prop = captures[1];
	    var value = captures[2];
	    if (prop === 'providesModule') {
	      return value;
	    }
	  }
	}

	function invariant(condition, msg) {
	  if (!condition) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    throw new Error(__webpack_require__(32).format.apply(__webpack_require__(32), [msg].concat(args)));
	  }
	}

	function visit(node, visitors) {
	  var fn = visitors[node.type];
	  if (fn != null) {
	    fn(node);
	    return;
	  }
	  traverse(node, visitors);
	}

	function traverse(node, visitors) {
	  for (var key in node) {
	    if (IGNORED_KEYS[key]) {
	      continue;
	    }
	    var prop = node[key];
	    if (prop && typeof prop === 'object' && typeof prop.type === 'string') {
	      visit(prop, visitors);
	    } else if (Array.isArray(prop)) {
	      prop.forEach(function (item) {
	        if (item && typeof item === 'object' && typeof item.type === 'string') {
	          visit(item, visitors);
	        }
	      });
	    }
	  }
	}

	module.exports = {
	  find: find,
	  memoizedFind: memoizedFind
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayApplyFragmentArgumentTransform
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _stringify2 = _interopRequireDefault(__webpack_require__(13));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	var _from2 = _interopRequireDefault(__webpack_require__(17));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var getFragmentScope = __webpack_require__(35).getFragmentScope,
	    getRootScope = __webpack_require__(35).getRootScope;

	/**
	 * A tranform that converts a set of documents containing fragments/fragment
	 * spreads *with* arguments to one where all arguments have been inlined. This
	 * is effectively static currying of functions. Nodes are changed as follows:
	 * - Fragment spreads with arguments are replaced with references to an inlined
	 *   version of the referenced fragment.
	 * - Fragments with argument definitions are cloned once per unique set of
	 *   arguments, with the name changed to original name + hash and all nested
	 *   variable references changed to the value of that variable given its
	 *   arguments.
	 * - Field & directive argument variables are replaced with the value of those
	 *   variables in context.
	 * - All nodes are cloned with updated children.
	 *
	 * The transform also handles statically passing/failing Condition nodes:
	 * - Literal Conditions with a passing value are elided and their selections
	 *   inlined in their parent.
	 * - Literal Conditions with a failing value are removed.
	 * - Nodes that would become empty as a result of the above are removed.
	 *
	 * Note that unreferenced fragments are not added to the output.
	 */


	function transform(context) {
	  var documents = context.documents();
	  var fragments = new (__webpack_require__(47))();
	  var nextContext = new (__webpack_require__(10))(context.schema);
	  nextContext = documents.reduce(function (ctx, node) {
	    if (node.kind === 'Root') {
	      var scope = getRootScope(node.argumentDefinitions);
	      var transformedNode = transformNode(context, fragments, scope, node);
	      return transformedNode ? ctx.add(transformedNode) : ctx;
	    } else {
	      // fragments are transformed when referenced; unreferenced fragments are
	      // not added to the output.
	      return ctx;
	    }
	  }, nextContext);
	  return (0, _from2['default'])(fragments.values()).reduce(function (ctx, fragment) {
	    return fragment ? ctx.add(fragment) : ctx;
	  }, nextContext);
	}

	function transformNode(context, fragments, scope, node) {
	  var selections = transformSelections(context, fragments, scope, node.selections);
	  if (!selections) {
	    return null;
	  }
	  if (node.hasOwnProperty('directives')) {
	    var directives = transformDirectives(scope, node.directives);
	    // $FlowIssue: this is a valid `Node`:
	    return (0, _extends3['default'])({}, node, {
	      directives: directives,
	      selections: selections
	    });
	  }
	  return (0, _extends3['default'])({}, node, {
	    selections: selections
	  });
	}

	function transformFragmentSpread(context, fragments, scope, spread) {
	  var directives = transformDirectives(scope, spread.directives);
	  var fragment = context.get(spread.name);
	  __webpack_require__(1)(fragment && fragment.kind === 'Fragment', 'RelayApplyFragmentArgumentTransform: expected `%s` to be a fragment, ' + 'got `%s`.', spread.name, fragment && fragment.kind);
	  var appliedFragment = transformFragment(context, fragments, scope, fragment, spread.args);
	  if (!appliedFragment) {
	    return null;
	  }
	  return (0, _extends3['default'])({}, spread, {
	    args: [],
	    directives: directives,
	    name: appliedFragment.name
	  });
	}

	function transformField(context, fragments, scope, field) {
	  var args = transformArguments(scope, field.args);
	  var directives = transformDirectives(scope, field.directives);
	  if (field.kind === 'LinkedField') {
	    var selections = transformSelections(context, fragments, scope, field.selections);
	    if (!selections) {
	      return null;
	    }
	    // $FlowFixMe(>=0.28.0)
	    return (0, _extends3['default'])({}, field, {
	      args: args,
	      directives: directives,
	      selections: selections
	    });
	  } else {
	    return (0, _extends3['default'])({}, field, {
	      args: args,
	      directives: directives
	    });
	  }
	}

	function transformCondition(context, fragments, scope, node) {
	  var condition = transformValue(scope, node.condition);
	  __webpack_require__(1)(condition.kind === 'Literal' || condition.kind === 'Variable', 'RelayApplyFragmentArgumentTransform: A non-scalar value was applied to ' + 'an @include or @skip directive, the `if` argument value must be a ' + 'variable or a Boolean, got `%s`.', condition);
	  if (condition.kind === 'Literal' && condition.value !== node.passingValue) {
	    // Dead code, no need to traverse further.
	    return null;
	  }
	  var selections = transformSelections(context, fragments, scope, node.selections);
	  if (!selections) {
	    return null;
	  }
	  if (condition.kind === 'Literal' && condition.value === node.passingValue) {
	    // Always passes, return inlined selections
	    return selections;
	  }
	  return [(0, _extends3['default'])({}, node, {
	    condition: condition,
	    selections: selections
	  })];
	}

	function transformSelections(context, fragments, scope, selections) {
	  var nextSelections = null;
	  selections.forEach(function (selection) {
	    var nextSelection = void 0;
	    if (selection.kind === 'InlineFragment') {
	      nextSelection = transformNode(context, fragments, scope, selection);
	    } else if (selection.kind === 'FragmentSpread') {
	      nextSelection = transformFragmentSpread(context, fragments, scope, selection);
	    } else if (selection.kind === 'Condition') {
	      var conditionSelections = transformCondition(context, fragments, scope, selection);
	      if (conditionSelections) {
	        var _nextSelections;

	        nextSelections = nextSelections || [];
	        (_nextSelections = nextSelections).push.apply(_nextSelections, (0, _toConsumableArray3['default'])(conditionSelections));
	      }
	    } else {
	      nextSelection = transformField(context, fragments, scope, selection);
	    }
	    if (nextSelection) {
	      nextSelections = nextSelections || [];
	      nextSelections.push(nextSelection);
	    }
	  });
	  return nextSelections;
	}

	function transformDirectives(scope, directives) {
	  return directives.map(function (directive) {
	    var args = transformArguments(scope, directive.args);
	    return (0, _extends3['default'])({}, directive, {
	      args: args
	    });
	  });
	}

	function transformArguments(scope, args) {
	  return args.map(function (arg) {
	    var value = transformValue(scope, arg.value);
	    return value === arg.value ? arg : (0, _extends3['default'])({}, arg, { value: value });
	  });
	}

	function transformValue(scope, value) {
	  if (value.kind === 'Variable') {
	    var scopeValue = scope[value.variableName];
	    __webpack_require__(1)(scopeValue != null, 'RelayApplyFragmentArgumentTransform: variable `%s` is not in scope.', value.variableName);
	    return scopeValue;
	  } else if (value.kind === 'ListValue') {
	    return (0, _extends3['default'])({}, value, {
	      items: value.items.map(function (item) {
	        return transformValue(scope, item);
	      })
	    });
	  } else if (value.kind === 'ObjectValue') {
	    return (0, _extends3['default'])({}, value, {
	      fields: value.fields.map(function (field) {
	        return (0, _extends3['default'])({}, field, {
	          value: transformValue(scope, field.value)
	        });
	      })
	    });
	  }
	  return value;
	}

	/**
	 * Apply arguments to a fragment, creating a new fragment (with the given name)
	 * with all values recursively applied.
	 */
	function transformFragment(context, fragments, parentScope, fragment, args) {
	  var argumentsHash = hashArguments(args, parentScope);
	  var fragmentName = argumentsHash ? fragment.name + '_' + argumentsHash : fragment.name;
	  var appliedFragment = fragments.get(fragmentName);
	  if (appliedFragment) {
	    return appliedFragment;
	  }
	  var fragmentScope = getFragmentScope(fragment.argumentDefinitions, args, parentScope);
	  __webpack_require__(1)(!fragments.has(fragmentName) || fragments.get(fragmentName) !== undefined, 'RelayApplyFragmentArgumentTransform: Found a circular reference from ' + 'fragment `%s`.', fragment.name);
	  fragments.set(fragmentName, undefined); // to detect circular references
	  var transformedFragment = null;
	  var selections = transformSelections(context, fragments, fragmentScope, fragment.selections);
	  if (selections) {
	    transformedFragment = (0, _extends3['default'])({}, fragment, {
	      selections: selections,
	      name: fragmentName,
	      argumentDefinitions: []
	    });
	  }
	  fragments.set(fragmentName, transformedFragment);
	  return transformedFragment;
	}

	function hashArguments(args, scope) {
	  if (!args.length) {
	    return null;
	  }
	  var sortedArgs = [].concat((0, _toConsumableArray3['default'])(args)).sort(function (a, b) {
	    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	  });
	  var printedArgs = (0, _stringify2['default'])(sortedArgs.map(function (arg) {
	    var value = void 0;
	    if (arg.value.kind === 'Variable') {
	      value = scope[arg.value.variableName];
	      __webpack_require__(1)(value != null, 'RelayApplyFragmentArgumentTransform: variable `%s` is not in scope.', arg.value.variableName);
	    } else {
	      value = arg.value;
	    }
	    return {
	      name: arg.name,
	      value: __webpack_require__(69)(value)
	    };
	  }));
	  return __webpack_require__(71)(printedArgs);
	}

	module.exports = { transform: transform };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayCodegenRunner
	 * 
	 * @format
	 */

	'use strict';

	var _asyncToGenerator2 = __webpack_require__(19);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	var _promise2 = _interopRequireDefault(__webpack_require__(29));

	var _set2 = _interopRequireDefault(__webpack_require__(18));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(12),
	    ImmutableMap = _require.Map;

	/* eslint-disable no-console-disallow */

	var RelayCodegenRunner = function () {
	  // parser => writers that are affected by it
	  function RelayCodegenRunner(options) {
	    var _this = this;

	    (0, _classCallCheck3['default'])(this, RelayCodegenRunner);
	    this.parsers = {};

	    this.parserConfigs = options.parserConfigs;
	    this.writerConfigs = options.writerConfigs;
	    this.onlyValidate = options.onlyValidate;
	    this.skipPersist = options.skipPersist;

	    this.parserWriters = {};
	    for (var _parser in options.parserConfigs) {
	      this.parserWriters[_parser] = new _set2['default']();
	    }

	    var _loop = function _loop(_writer) {
	      var config = options.writerConfigs[_writer];
	      config.baseParsers && config.baseParsers.forEach(function (parser) {
	        return _this.parserWriters[parser].add(_writer);
	      });
	      _this.parserWriters[config.parser].add(_writer);
	    };

	    for (var _writer in options.writerConfigs) {
	      _loop(_writer);
	    }
	  }

	  RelayCodegenRunner.prototype.compileAll = (() => {
	    var _ref = (0, _asyncToGenerator3.default)(function* () {
	      var hasChanges = false;

	      // reset the parsers
	      this.parsers = {};
	      for (var parserName in this.parserConfigs) {
	        yield this.parseEverything(parserName);
	      }

	      for (var writerName in this.writerConfigs) {
	        var writerChanges = yield this.write(writerName);
	        hasChanges = writerChanges || hasChanges;
	      }

	      return hasChanges;
	    });

	    function compileAll() {
	      return _ref.apply(this, arguments);
	    }

	    return compileAll;
	  })();

	  RelayCodegenRunner.prototype.compile = (() => {
	    var _ref2 = (0, _asyncToGenerator3.default)(function* (writerName) {
	      var _this2 = this;

	      var writerConfig = this.writerConfigs[writerName];

	      var parsers = [writerConfig.parser];
	      if (writerConfig.baseParsers) {
	        writerConfig.baseParsers.forEach(function (parser) {
	          return parsers.push(parser);
	        });
	      }
	      // Don't bother resetting the parsers
	      yield _promise2['default'].all(parsers.map(function (parser) {
	        return _this2.parseEverything(parser);
	      }));

	      return yield this.write(writerName);
	    });

	    function compile(_x) {
	      return _ref2.apply(this, arguments);
	    }

	    return compile;
	  })();

	  RelayCodegenRunner.prototype.parseEverything = (() => {
	    var _ref3 = (0, _asyncToGenerator3.default)(function* (parserName) {
	      if (this.parsers[parserName]) {
	        // no need to parse
	        return;
	      }

	      var parserConfig = this.parserConfigs[parserName];
	      this.parsers[parserName] = parserConfig.getParser(parserConfig.baseDir);

	      var files = yield __webpack_require__(33).queryFiles(parserConfig.baseDir, parserConfig.watchmanExpression, parserConfig.getFileFilter ? parserConfig.getFileFilter(parserConfig.baseDir) : anyFileFilter);
	      this.parseFileChanges(parserName, files);
	    });

	    function parseEverything(_x2) {
	      return _ref3.apply(this, arguments);
	    }

	    return parseEverything;
	  })();

	  RelayCodegenRunner.prototype.parseFileChanges = function parseFileChanges(parserName, files) {
	    var tStart = Date.now();
	    var parser = this.parsers[parserName];
	    // this maybe should be await parser.parseFiles(files);
	    parser.parseFiles(files);
	    var tEnd = Date.now();
	    console.log('Parsed %s in %s', parserName, toSeconds(tStart, tEnd));
	  };

	  // We cannot do incremental writes right now.
	  // When we can, this could be writeChanges(writerName, parserName, parsedDefinitions)


	  RelayCodegenRunner.prototype.write = (() => {
	    var _ref4 = (0, _asyncToGenerator3.default)(function* (writerName) {
	      var _this3 = this;

	      console.log('\nWriting %s', writerName);
	      var tStart = Date.now();
	      var _writerConfigs$writer = this.writerConfigs[writerName],
	          getWriter = _writerConfigs$writer.getWriter,
	          parser = _writerConfigs$writer.parser,
	          baseParsers = _writerConfigs$writer.baseParsers;


	      var baseDocuments = ImmutableMap();
	      if (baseParsers) {
	        baseParsers.forEach(function (baseParserName) {
	          baseDocuments = baseDocuments.merge(_this3.parsers[baseParserName].documents());
	        });
	      }

	      // always create a new writer: we have to write everything anyways
	      var documents = this.parsers[parser].documents();
	      var schema = this.parserConfigs[parser].getSchema();
	      var writer = getWriter(this.onlyValidate, schema, documents, baseDocuments);
	      var outputDirectories = yield writer.writeAll();
	      var tWritten = Date.now();

	      function combineChanges(accessor) {
	        var combined = [];
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = outputDirectories.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var dir = _step.value;

	            combined.push.apply(combined, (0, _toConsumableArray3['default'])(accessor(dir.changes)));
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

	        return combined;
	      }
	      var created = combineChanges(function (_) {
	        return _.created;
	      });
	      var updated = combineChanges(function (_) {
	        return _.updated;
	      });
	      var deleted = combineChanges(function (_) {
	        return _.deleted;
	      });
	      var unchanged = combineChanges(function (_) {
	        return _.unchanged;
	      });

	      if (this.onlyValidate) {
	        printFiles('Missing', created);
	        printFiles('Out of date', updated);
	        printFiles('Extra', deleted);
	      } else {
	        printFiles('Created', created);
	        printFiles('Updated', updated);
	        printFiles('Deleted', deleted);
	        console.log('Unchanged: %s files', unchanged.length);
	      }

	      console.log('Written %s in %s', writerName, toSeconds(tStart, tWritten));

	      var hasChanges = created.length + updated.length + deleted.length > 0;
	      return hasChanges;
	    });

	    function write(_x3) {
	      return _ref4.apply(this, arguments);
	    }

	    return write;
	  })();

	  RelayCodegenRunner.prototype.watchAll = (() => {
	    var _ref5 = (0, _asyncToGenerator3.default)(function* () {
	      // get everything set up for watching
	      yield this.compileAll();

	      for (var parserName in this.parserConfigs) {
	        yield this.watch(parserName);
	      }
	    });

	    function watchAll() {
	      return _ref5.apply(this, arguments);
	    }

	    return watchAll;
	  })();

	  RelayCodegenRunner.prototype.watch = (() => {
	    var _ref6 = (0, _asyncToGenerator3.default)(function* (parserName) {
	      var _this4 = this;

	      var parserConfig = this.parserConfigs[parserName];

	      // watchCompile starts with a full set of files as the changes
	      // But as we need to set everything up due to potential parser dependencies,
	      // we should prevent the first watch callback from doing anything.
	      var firstChange = true;

	      yield __webpack_require__(33).watchCompile(parserConfig.baseDir, parserConfig.watchmanExpression, parserConfig.getFileFilter ? parserConfig.getFileFilter(parserConfig.baseDir) : anyFileFilter, (() => {
	        var _ref7 = (0, _asyncToGenerator3.default)(function* (files) {
	          __webpack_require__(1)(_this4.parsers[parserName], 'Trying to watch an uncompiled parser config: %s', parserName);
	          if (firstChange) {
	            firstChange = false;
	            return;
	          }
	          var dependentWriters = [];
	          _this4.parserWriters[parserName].forEach(function (writer) {
	            return dependentWriters.push(writer);
	          });
	          if (!_this4.parsers[parserName]) {
	            // have to load the parser and make sure all of its dependents are set
	            yield _this4.parseEverything(parserName);
	          } else {
	            _this4.parseFileChanges(parserName, files);
	          }

	          yield _promise2['default'].all(dependentWriters.map(function (writer) {
	            return _this4.write(writer);
	          }));
	        });

	        return function (_x5) {
	          return _ref7.apply(this, arguments);
	        };
	      })());
	      console.log('Watching for changes to %s...', parserName);
	    });

	    function watch(_x4) {
	      return _ref6.apply(this, arguments);
	    }

	    return watch;
	  })();

	  return RelayCodegenRunner;
	}();

	function anyFileFilter(filename) {
	  return true;
	}

	function toSeconds(t0, t1) {
	  return ((t1 - t0) / 1000).toFixed(2) + 's';
	}

	function printFiles(label, files) {
	  if (files.length > 0) {
	    console.log(label + ':');
	    files.forEach(function (file) {
	      console.log(' - ' + file);
	    });
	  }
	}

	module.exports = RelayCodegenRunner;

/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayConnectionConstants
	 * 
	 * @format
	 */

	'use strict';

	var AFTER = 'after';
	var BEFORE = 'before';
	var FIRST = 'first';
	var KEY = 'key';
	var LAST = 'last';

	module.exports = {
	  AFTER: AFTER,
	  BEFORE: BEFORE,
	  FIRST: FIRST,
	  KEY: KEY,
	  LAST: LAST
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayConnectionInterface
	 * @format
	 */

	'use strict';

	module.exports = __webpack_require__(62);

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayFieldHandleTransform
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function transform(context, schema) {
	  return __webpack_require__(11).transform(context, {
	    LinkedField: visitField,
	    ScalarField: visitField
	  }, function () {
	    return true;
	  });
	}

	/**
	 * @internal
	 */
	function visitField(field, state) {
	  if (field.kind === 'LinkedField') {
	    field = this.traverse(field, state);
	  }
	  var handles = field.handles;
	  if (!handles || !handles.length) {
	    return field;
	  }
	  // ensure exactly one handle
	  __webpack_require__(1)(handles.length === 1, 'RelayFieldHandleTransform: Expected fields to have at most one ' + '"handle" property, got `%s`.', handles.join(', '));
	  var alias = field.alias || field.name;
	  var handle = handles[0];
	  var name = __webpack_require__(70)(handle.name, handle.key, field.name);
	  var filters = handle.filters;
	  var args = filters ? field.args.filter(function (arg) {
	    return filters.indexOf(arg.name) > -1;
	  }) : [];

	  return (0, _extends3['default'])({}, field, {
	    args: args,
	    alias: alias,
	    name: name,
	    handles: null
	  });
	}

	module.exports = { transform: transform };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayFileIRParser
	 * 
	 * @format
	 */

	'use strict';

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// Throws an error if parsing the file fails
	function parseFile(file) {
	  var text = __webpack_require__(8).readFileSync(file, 'utf8');

	  __webpack_require__(1)(text.indexOf('graphql') >= 0, 'RelayFileIRParser: Files should be filtered before passed to the ' + 'parser, got unfiltered file `%s`.', file);

	  var astDefinitions = [];
	  __webpack_require__(50).memoizedFind(text, file).forEach(function (_ref) {
	    var tag = _ref.tag,
	        template = _ref.template;

	    if (!(tag === 'graphql' || tag === 'graphql.experimental')) {
	      throw new Error('Invalid tag ' + tag + ' in ' + file + '. ' + 'Expected graphql`` (common case) or ' + 'graphql.experimental`` (if using experimental directives).');
	    }
	    if (tag !== 'graphql.experimental' && /@argument(Definition)?s\b/.test(template)) {
	      throw new Error('Unexpected use of fragment variables: @arguments and ' + '@argumentDefinitions are only supported in ' + 'graphql.experimental literals. Source: ' + template);
	    }
	    var ast = __webpack_require__(3).parse(template);
	    __webpack_require__(1)(ast.definitions.length, 'RelayFileIRParser: Expected GraphQL text to contain at least one ' + 'definition (fragment, mutation, query, subscription), got `%s`.', template);

	    astDefinitions.push.apply(astDefinitions, (0, _toConsumableArray3['default'])(ast.definitions));
	  });

	  return {
	    kind: 'Document',
	    definitions: astDefinitions
	  };
	}

	function getParser(baseDir) {
	  return new (__webpack_require__(49))({
	    baseDir: baseDir,
	    parse: parseFile
	  });
	}

	function getFileFilter(baseDir) {
	  return function (filename) {
	    var text = __webpack_require__(8).readFileSync(__webpack_require__(7).join(baseDir, filename), 'utf8');
	    return text.indexOf('graphql') >= 0;
	  };
	}

	module.exports = {
	  getParser: getParser,
	  getFileFilter: getFileFilter
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayFileWriter
	 * 
	 * @format
	 */

	'use strict';

	var _asyncToGenerator2 = __webpack_require__(19);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(9));

	var _promise2 = _interopRequireDefault(__webpack_require__(29));

	var _map2 = _interopRequireDefault(__webpack_require__(14));

	var _set2 = _interopRequireDefault(__webpack_require__(18));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(4),
	    isOperationDefinitionAST = _require.isOperationDefinitionAST;

	var _require2 = __webpack_require__(12),
	    ImmutableMap = _require2.Map;

	/* eslint-disable no-console-disallow */

	var RelayFileWriter = function () {
	  function RelayFileWriter(options) {
	    (0, _classCallCheck3['default'])(this, RelayFileWriter);
	    var config = options.config,
	        onlyValidate = options.onlyValidate,
	        baseDocuments = options.baseDocuments,
	        documents = options.documents,
	        schema = options.schema;

	    this._baseDocuments = baseDocuments || ImmutableMap();
	    this._baseSchema = schema;
	    this._config = config;
	    this._documents = documents;
	    this._onlyValidate = onlyValidate;
	  }

	  RelayFileWriter.prototype.writeAll = (() => {
	    var _ref = (0, _asyncToGenerator3.default)(function* () {
	      var _this = this;

	      var tStart = Date.now();

	      // Can't convert to IR unless the schema already has Relay-local extensions
	      var transformedSchema = __webpack_require__(21).transformASTSchema(this._baseSchema, this._config.schemaTransforms);
	      var extendedSchema = __webpack_require__(21).extendASTSchema(transformedSchema, this._baseDocuments.merge(this._documents).valueSeq().toArray());

	      // Build a context from all the documents
	      var baseDefinitionNames = new _set2['default']();
	      this._baseDocuments.forEach(function (doc) {
	        doc.definitions.forEach(function (def) {
	          if (isOperationDefinitionAST(def) && def.name) {
	            baseDefinitionNames.add(def.name.value);
	          }
	        });
	      });
	      var definitionDirectories = new _map2['default']();
	      var allOutputDirectories = new _map2['default']();
	      var addCodegenDir = function addCodegenDir(dirPath) {
	        var codegenDir = new (__webpack_require__(48))(dirPath, {
	          onlyValidate: _this._onlyValidate
	        });
	        allOutputDirectories.set(dirPath, codegenDir);
	        return codegenDir;
	      };

	      var configOutputDirectory = void 0;
	      if (this._config.outputDir) {
	        configOutputDirectory = addCodegenDir(this._config.outputDir);
	      } else {
	        this._documents.forEach(function (doc, filePath) {
	          doc.definitions.forEach(function (def) {
	            if (isOperationDefinitionAST(def) && def.name) {
	              definitionDirectories.set(def.name.value, __webpack_require__(7).join(_this._config.baseDir, __webpack_require__(7).dirname(filePath)));
	            }
	          });
	        });
	      }

	      var definitions = __webpack_require__(21).convertASTDocumentsWithBase(extendedSchema, this._baseDocuments.valueSeq().toArray(), this._documents.valueSeq().toArray(), __webpack_require__(39).LOCAL_RULES);

	      var compilerContext = new (__webpack_require__(10))(extendedSchema);
	      var compiler = new (__webpack_require__(34))(this._baseSchema, compilerContext, this._config.compilerTransforms);

	      var getGeneratedDirectory = function getGeneratedDirectory(definitionName) {
	        if (configOutputDirectory) {
	          return configOutputDirectory;
	        }
	        var definitionDir = definitionDirectories.get(definitionName);
	        __webpack_require__(1)(definitionDir, 'RelayFileWriter: Could not determine source directory for definition: %s', definitionName);
	        var generatedPath = __webpack_require__(7).join(definitionDir, '__generated__');
	        var cachedDir = allOutputDirectories.get(generatedPath);
	        if (!cachedDir) {
	          cachedDir = addCodegenDir(generatedPath);
	        }
	        return cachedDir;
	      };

	      var nodes = compiler.addDefinitions(definitions);

	      var transformedQueryContext = compiler.transformedQueryContext();
	      var compiledDocumentMap = compiler.compile();

	      var tCompiled = Date.now();

	      var tGenerated = void 0;
	      try {
	        yield _promise2['default'].all(nodes.map((() => {
	          var _ref2 = (0, _asyncToGenerator3.default)(function* (node) {
	            if (baseDefinitionNames.has(node.name)) {
	              // don't add definitions that were part of base context
	              return;
	            }
	            if (_this._config.fragmentsWithLegacyFlowTypes && _this._config.fragmentsWithLegacyFlowTypes.has(node.name)) {
	              var legacyFlowTypes = __webpack_require__(44)(node);
	              if (legacyFlowTypes) {
	                __webpack_require__(73)(getGeneratedDirectory(node.name), node.name, legacyFlowTypes, _this._config.buildCommand, _this._config.platform);
	              }
	            }

	            var flowTypes = node.kind === 'Fragment' ? __webpack_require__(58).generate(node, _this._config.inputFieldWhiteListForFlow) : __webpack_require__(44)(node);
	            var compiledNode = compiledDocumentMap.get(node.name);
	            __webpack_require__(1)(compiledNode, 'RelayCompiler: did not compile definition: %s', node.name);
	            yield __webpack_require__(74)(getGeneratedDirectory(compiledNode.name), compiledNode, _this._config.buildCommand, flowTypes, _this.skipPersist ? null : _this._config.persistQuery, _this._config.platform, _this._config.relayRuntimeModule || 'relay-runtime');
	          });

	          return function (_x) {
	            return _ref2.apply(this, arguments);
	          };
	        })()));
	        tGenerated = Date.now();

	        if (this._config.generateExtraFiles) {
	          var configDirectory = this._config.outputDir;
	          __webpack_require__(1)(configDirectory, 'RelayFileWriter: cannot generate extra files without specifying ' + ' an outputDir in the config.');

	          this._config.generateExtraFiles(function (dir) {
	            var outputDirectory = dir || configDirectory;
	            var outputDir = allOutputDirectories.get(outputDirectory);
	            if (!outputDir) {
	              outputDir = addCodegenDir(outputDirectory);
	            }
	            return outputDir;
	          }, transformedQueryContext);
	        }

	        // clean output directories
	        allOutputDirectories.forEach(function (dir) {
	          dir.deleteExtraFiles();
	        });
	      } catch (error) {
	        tGenerated = Date.now();
	        var details = void 0;
	        try {
	          details = JSON.parse(error.message);
	        } catch (_) {}
	        if (details && details.name === 'GraphQL2Exception' && details.message) {
	          console.log('ERROR writing modules:\n' + details.message);
	        } else {
	          console.log('Error writing modules:\n' + error.toString());
	        }
	        return allOutputDirectories;
	      }

	      var tExtra = Date.now();
	      console.log('Writer time: %s [%s compiling, %s generating, %s extra]', toSeconds(tStart, tExtra), toSeconds(tStart, tCompiled), toSeconds(tCompiled, tGenerated), toSeconds(tGenerated, tExtra));
	      return allOutputDirectories;
	    });

	    function writeAll() {
	      return _ref.apply(this, arguments);
	    }

	    return writeAll;
	  })();

	  return RelayFileWriter;
	}();

	function toSeconds(t0, t1) {
	  return ((t1 - t0) / 1000).toFixed(2) + 's';
	}

	module.exports = RelayFileWriter;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

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

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	var _keys2 = _interopRequireDefault(__webpack_require__(15));

	var _map2 = _interopRequireDefault(__webpack_require__(14));

	var _from2 = _interopRequireDefault(__webpack_require__(17));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var babelGenerator = __webpack_require__(45)['default'];

	var _require = __webpack_require__(3),
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

	var _require2 = __webpack_require__(4),
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
	  var responseAST = __webpack_require__(25).visit(node, RelayCodeGenVisitor);
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

	  return types.length > 1 ? __webpack_require__(2).unionTypeAnnotation(types) : types[0];
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
	  var annotation = __webpack_require__(2).stringLiteralTypeAnnotation();
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
	      return __webpack_require__(2).exportNamedDeclaration(__webpack_require__(2).typeAlias(__webpack_require__(2).identifier(node.name + 'Response'), null, selectionsToBabel(node.selections)), [], null);
	    },
	    Fragment: function Fragment(node) {
	      return __webpack_require__(2).exportNamedDeclaration(__webpack_require__(2).typeAlias(__webpack_require__(2).identifier(node.name), null, selectionsToBabel(node.selections)), [], null);
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
	    return __webpack_require__(2).nullableTypeAnnotation(transformNonNullableScalarField(type, objectProps));
	  }
	}

	function arrayOfType(thing) {
	  return __webpack_require__(2).genericTypeAnnotation(__webpack_require__(2).identifier('$ReadOnlyArray'), __webpack_require__(2).typeParameterInstantiation([thing]));
	}

	function exactObjectTypeAnnotation(props) {
	  var typeAnnotation = __webpack_require__(2).objectTypeAnnotation(props);
	  typeAnnotation.exact = true;
	  return typeAnnotation;
	}

	function readOnlyObjectTypeProperty(key, value) {
	  var prop = __webpack_require__(2).objectTypeProperty(__webpack_require__(2).identifier(key), value);
	  prop.variance = 'plus';
	  return prop;
	}

	function transformGraphQLScalarType(type) {
	  switch (type.name) {
	    case 'ID':
	    case 'String':
	    case 'Url':
	      return __webpack_require__(2).stringTypeAnnotation();
	    case 'Float':
	    case 'Int':
	      return __webpack_require__(2).numberTypeAnnotation();
	    case 'Boolean':
	      return __webpack_require__(2).booleanTypeAnnotation();
	    default:
	      return __webpack_require__(2).anyTypeAnnotation();
	  }
	}

	function transformGraphQLEnumType(type) {
	  // TODO create a flow type for enums
	  return __webpack_require__(2).unionTypeAnnotation(type.getValues().map(function (_ref2) {
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
	      var property = __webpack_require__(2).objectTypeProperty(__webpack_require__(2).identifier(field.name), transformInputType(field.type, inputFieldWhiteList));
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
	    return __webpack_require__(2).nullableTypeAnnotation(transformNonNullableInputType(type, inputFieldWhiteList));
	  }
	}

	function generateInputVariablesType(node, inputFieldWhiteList) {
	  return __webpack_require__(2).exportNamedDeclaration(__webpack_require__(2).typeAlias(__webpack_require__(2).identifier(node.name + 'Variables'), null, exactObjectTypeAnnotation(node.argumentDefinitions.map(function (arg) {
	    var property = __webpack_require__(2).objectTypeProperty(__webpack_require__(2).identifier(arg.name), transformInputType(arg.type, inputFieldWhiteList));
	    if (!(arg.type instanceof GraphQLNonNull)) {
	      property.optional = true;
	    }
	    return property;
	  }))), [], null);
	}

	module.exports = { generate: generate };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayFlowParser
	 * @format
	 */

	'use strict';

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(4),
	    isOperationDefinitionAST = _require.isOperationDefinitionAST;

	var _require2 = __webpack_require__(3),
	    ArgumentsOfCorrectTypeRule = _require2.ArgumentsOfCorrectTypeRule,
	    DefaultValuesOfCorrectTypeRule = _require2.DefaultValuesOfCorrectTypeRule,
	    FieldsOnCorrectTypeRule = _require2.FieldsOnCorrectTypeRule,
	    formatError = _require2.formatError,
	    FragmentsOnCompositeTypesRule = _require2.FragmentsOnCompositeTypesRule,
	    KnownArgumentNamesRule = _require2.KnownArgumentNamesRule,
	    KnownTypeNamesRule = _require2.KnownTypeNamesRule,
	    parse = _require2.parse,
	    PossibleFragmentSpreadsRule = _require2.PossibleFragmentSpreadsRule,
	    ProvidedNonNullArgumentsRule = _require2.ProvidedNonNullArgumentsRule,
	    Source = _require2.Source,
	    validate = _require2.validate,
	    VariablesInAllowedPositionRule = _require2.VariablesInAllowedPositionRule;

	var RELAY_CLASSIC_MUTATION = '__RelayClassicMutation__';

	/**
	 * Validates that a given DocumentNode is properly formed. Returns an Array
	 * of ValidationErrors if there are errors.
	 */
	function validateDocument(document, documentName, schema) {
	  __webpack_require__(1)(document.definitions.length === 1, 'You supplied a GraphQL document named `%s` with %d definitions, but ' + 'it must have exactly one definition.', documentName, document.definitions.length);
	  var definition = document.definitions[0];
	  var isMutation = definition.kind === 'OperationDefinition' && definition.operation === 'mutation';

	  var rules = [ArgumentsOfCorrectTypeRule, DefaultValuesOfCorrectTypeRule, FieldsOnCorrectTypeRule, FragmentsOnCompositeTypesRule, KnownArgumentNamesRule, KnownTypeNamesRule, PossibleFragmentSpreadsRule, VariablesInAllowedPositionRule];
	  if (!isMutation) {
	    rules.push(ProvidedNonNullArgumentsRule);
	  }
	  var validationErrors = validate(schema, document, rules);

	  if (validationErrors && validationErrors.length > 0) {
	    return validationErrors.map(formatError);
	  }
	  return null;
	}

	/**
	 * Parses a given string containing one or more GraphQL operations into an array
	 * of GraphQL documents.
	 */
	function parseRelayGraphQL(source, schema) {
	  var sourceName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

	  // We need to ignore these directives. The RelayParser cannot handle these
	  // directives, so this needs to happen here.
	  var PATTERN_LIST = ['@relay(pattern:true)', '@fixme_fat_interface'];
	  var strippedSource = source.replace(/ /g, '');
	  var patternFound = PATTERN_LIST.some(function (pattern) {
	    var isSubstring = strippedSource.indexOf(pattern) !== -1;
	    if (isSubstring) {
	      console.warn('Skipping Relay.QL template string because it contains ' + pattern + ': ' + sourceName);
	    }
	    return isSubstring;
	  });
	  if (patternFound) {
	    return [];
	  }

	  var ast = null;
	  try {
	    ast = parse(new Source(source, sourceName));
	  } catch (e) {
	    console.error('\n-- GraphQL Parsing Error --\n');
	    console.error(['File:  ' + sourceName, 'Error: ' + e.message].join('\n'));
	    return [];
	  }

	  var validationErrors = validateDocument(ast, sourceName, schema);
	  if (validationErrors) {
	    var errorMessages = [];
	    var sourceLines = source.split('\n');
	    validationErrors.forEach(function (_ref) {
	      var message = _ref.message,
	          locations = _ref.locations;

	      errorMessages.push(message);
	      console.error('\n-- GraphQL Validation Error --\n');
	      console.error(['File:  ' + sourceName, 'Error: ' + message, 'Source:'].join('\n'));
	      locations.forEach(function (location) {
	        var preview = sourceLines[location.line - 1];
	        if (preview) {
	          console.error(['> ', '> ' + preview, '> ' + ' '.repeat(location.column - 1) + '^^^'].join('\n'));
	        }
	      });
	    });
	    return [];
	  }

	  var _ast = ast,
	      definitions = _ast.definitions;

	  definitions.forEach(function (definition) {
	    if (definition.kind !== 'OperationDefinition' || definition.operation !== 'mutation') {
	      return;
	    }

	    var selections = definition.selectionSet.selections;
	    // As of now, FB mutations should only have one input.
	    __webpack_require__(1)(selections.length <= 1, 'Mutations should only have one argument, ' + selections.length + ' found.');

	    var mutationField = selections[0];
	    __webpack_require__(1)(mutationField.kind === 'Field', 'RelayFlowParser: Expected the first selection of a mutation to be a ' + 'field, got `%s`.', mutationField.kind);
	    if (definition.name == null) {
	      // We need to manually add a `name` and a selection to each `selectionSet`
	      // in order for this to be a valid GraphQL document. The RelayParser will
	      // throw an error if we give it a "classic" mutation. `__typename` is a
	      // valid field in *all* mutation payloads.
	      definition.name = {
	        kind: 'Name',
	        value: RELAY_CLASSIC_MUTATION
	      };
	      mutationField.selectionSet = {
	        kind: 'SelectionSet',
	        selections: [{
	          kind: 'Field',
	          name: {
	            kind: 'Name',
	            value: '__typename'
	          }
	        }]
	      };
	    }
	  });

	  var nodes = [];
	  definitions.forEach(function (definition) {
	    if (isOperationDefinitionAST(definition)) {
	      nodes.push(__webpack_require__(26).transform(schema, definition));
	    }
	  });
	  return nodes;
	}

	/**
	 * Parses each extracted template literal from an array of ExtractedRelayTags
	 * into a GraphQL Document type. Each element in the returned array is a
	 * ExtractedGQLDocuments type which includes the filename.
	 */
	function transformFiles(extractedTags, schema) {
	  var gqlMapping = [];
	  extractedTags.forEach(function (file) {
	    var documents = [];
	    file.tags.forEach(function (tag) {
	      var transformed = parseRelayGraphQL(tag, schema, file.filename);
	      if (transformed.length) {
	        documents.push.apply(documents, (0, _toConsumableArray3['default'])(transformed));
	      }
	    });

	    if (documents.length) {
	      gqlMapping.push({
	        filename: file.filename,
	        documents: documents
	      });
	    }
	  });
	  return gqlMapping;
	}

	module.exports = {
	  transformFiles: transformFiles,
	  parse: parseRelayGraphQL,
	  RELAY_CLASSIC_MUTATION: RELAY_CLASSIC_MUTATION
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayGenerateRequisiteFieldsTransform
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(3),
	    assertAbstractType = _require.assertAbstractType,
	    assertCompositeType = _require.assertCompositeType,
	    assertLeafType = _require.assertLeafType;

	var canHaveSelections = __webpack_require__(4).canHaveSelections,
	    getRawType = __webpack_require__(4).getRawType,
	    hasID = __webpack_require__(4).hasID,
	    implementsInterface = __webpack_require__(4).implementsInterface,
	    isAbstractType = __webpack_require__(4).isAbstractType,
	    mayImplement = __webpack_require__(4).mayImplement;

	var TYPENAME_KEY = '__typename';
	var ID = 'id';
	var ID_TYPE = 'ID';
	var NODE_TYPE = 'Node';
	var STRING_TYPE = 'String';

	/**
	 * A transform that adds "requisite" fields to all nodes:
	 * - Adds an `id` selection on any `LinkedField` of type that implements `Node`
	 *   or has an id field but where there is no unaliased `id` selection.
	 * - Adds `__typename` on any `LinkedField` of a union/interface type where
	 *   there is no unaliased `__typename` selection.
	 */
	function transform(context) {
	  var documents = context.documents();
	  return documents.reduce(function (ctx, node) {
	    var transformedNode = transformNode(context, node);
	    return ctx.add(transformedNode);
	  }, new (__webpack_require__(10))(context.schema));
	}

	function transformNode(context, node) {
	  var selections = node.selections.map(function (selection) {
	    if (selection.kind === 'LinkedField') {
	      return transformField(context, selection);
	    } else if (selection.kind === 'InlineFragment' || selection.kind === 'Condition') {
	      return transformNode(context, selection);
	    } else {
	      return selection;
	    }
	  });
	  return (0, _extends3['default'])({}, node, {
	    selections: selections
	  });
	}

	function transformField(context, field) {
	  var transformedNode = transformNode(context, field);
	  var type = field.type;

	  var generatedSelections = [].concat((0, _toConsumableArray3['default'])(transformedNode.selections));
	  var idSelections = generateIDSelections(context, field, field.type);
	  if (idSelections) {
	    generatedSelections.push.apply(generatedSelections, (0, _toConsumableArray3['default'])(idSelections));
	  }
	  if (isAbstractType(type) && !hasUnaliasedSelection(field, TYPENAME_KEY)) {
	    var stringType = assertLeafType(context.schema.getType(STRING_TYPE));
	    generatedSelections.push({
	      kind: 'ScalarField',
	      alias: null,
	      args: [],
	      directives: [],
	      handles: null,
	      metadata: null,
	      name: TYPENAME_KEY,
	      type: stringType
	    });
	  }
	  var selections = sortSelections(generatedSelections);
	  return (0, _extends3['default'])({}, transformedNode, {
	    selections: selections
	  });
	}

	/**
	 * @internal
	 *
	 * Returns an array of zero or more selections to fetch `id` depending on the
	 * type of the given field:
	 * - If the field already has an unaliased `id` field, do nothing
	 * - If the field type has an `id` subfield, return an `id` selection
	 * - If the field type is abstract, then generate a `... on Node { id }`
	 *   fragment if *any* concrete type implements Node. Then generate a
	 *   `... on PossibleType { id }` for every concrete type that does *not*
	 *   implement `Node`
	 */
	function generateIDSelections(context, field, type) {
	  if (hasUnaliasedSelection(field, ID)) {
	    return null;
	  }
	  var unmodifiedType = assertCompositeType(getRawType(type));
	  var generatedSelections = [];
	  // Object or  Interface type that has `id` field
	  if (canHaveSelections(unmodifiedType) && hasID(context.schema, unmodifiedType)) {
	    var idType = assertLeafType(context.schema.getType(ID_TYPE));
	    generatedSelections.push({
	      kind: 'ScalarField',
	      alias: null,
	      args: [],
	      directives: [],
	      handles: null,
	      metadata: null,
	      name: ID,
	      type: idType
	    });
	  } else if (isAbstractType(unmodifiedType)) {
	    // Union or interface: concrete types may implement `Node` or have an `id`
	    // field
	    var _idType = assertLeafType(context.schema.getType(ID_TYPE));
	    if (mayImplement(context.schema, unmodifiedType, NODE_TYPE)) {
	      var nodeType = assertCompositeType(context.schema.getType(NODE_TYPE));
	      generatedSelections.push(buildIdFragment(nodeType, _idType));
	    }
	    var abstractType = assertAbstractType(unmodifiedType);
	    context.schema.getPossibleTypes(abstractType).forEach(function (possibleType) {
	      if (!implementsInterface(possibleType, NODE_TYPE) && hasID(context.schema, possibleType)) {
	        generatedSelections.push(buildIdFragment(possibleType, _idType));
	      }
	    });
	  }
	  return generatedSelections;
	}

	/**
	 * @internal
	 */
	function buildIdFragment(fragmentType, idType) {
	  return {
	    kind: 'InlineFragment',
	    directives: [],
	    metadata: null,
	    typeCondition: fragmentType,
	    selections: [{
	      kind: 'ScalarField',
	      alias: null,
	      args: [],
	      directives: [],
	      handles: null,
	      metadata: null,
	      name: ID,
	      type: idType
	    }]
	  };
	}

	/**
	 * @internal
	 */
	function hasUnaliasedSelection(field, fieldName) {
	  return field.selections.some(function (selection) {
	    return selection.kind === 'ScalarField' && selection.alias == null && selection.name === fieldName;
	  });
	}

	/**
	 * @internal
	 *
	 * For interoperability with classic systems, sort `__typename` first.
	 */
	function sortSelections(selections) {
	  return [].concat((0, _toConsumableArray3['default'])(selections)).sort(function (a, b) {
	    return a.kind === 'ScalarField' && a.name === TYPENAME_KEY ? -1 : b.kind === 'ScalarField' && b.name === TYPENAME_KEY ? 1 : 0;
	  });
	}

	module.exports = { transform: transform };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayIRTransforms
	 * 
	 * @format
	 */

	'use strict';

	// Transforms applied to the code used to process a query response.
	var SCHEMA_TRANSFORMS = [__webpack_require__(23).transformSchema, __webpack_require__(36).transformSchema, __webpack_require__(27).transformSchema];

	// Transforms applied to fragments used for reading data from a store
	var FRAGMENT_TRANSFORMS = [function (ctx) {
	  return __webpack_require__(23).transform(ctx);
	}, __webpack_require__(40).transform, __webpack_require__(27).transform, __webpack_require__(55).transform, function (ctx) {
	  return __webpack_require__(24).transform(ctx, {
	    flattenAbstractTypes: true
	  });
	}, __webpack_require__(38).transform];

	// Transforms applied to queries/mutations/subscriptions that are used for
	// fetching data from the server and parsing those responses.
	/* $FlowFixMe(>=0.44.0 site=react_native_fb) Flow error found while deploying
	 * v0.44.0. Remove this comment to see the error */
	var QUERY_TRANSFORMS = [function (ctx) {
	  return __webpack_require__(23).transform(ctx, {
	    generateRequisiteFields: true
	  });
	}, __webpack_require__(40).transform, __webpack_require__(51).transform, __webpack_require__(64).transform, __webpack_require__(66).transform, __webpack_require__(36).transform, __webpack_require__(27).transform, __webpack_require__(60).transform];

	// Transforms applied to the code used to process a query response.
	var CODEGEN_TRANSFORMS = [__webpack_require__(37).transform, function (ctx) {
	  return __webpack_require__(24).transform(ctx, {
	    flattenAbstractTypes: true,
	    flattenFragmentSpreads: true
	  });
	}, __webpack_require__(38).transform];

	// Transforms applied before printing the query sent to the server.
	var PRINT_TRANSFORMS = [__webpack_require__(37).transform, function (ctx) {
	  return __webpack_require__(24).transform(ctx, {});
	}, __webpack_require__(65).transform];

	module.exports = {
	  codegenTransforms: CODEGEN_TRANSFORMS,
	  fragmentTransforms: FRAGMENT_TRANSFORMS,
	  printTransforms: PRINT_TRANSFORMS,
	  queryTransforms: QUERY_TRANSFORMS,
	  schemaTransforms: SCHEMA_TRANSFORMS
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayOSSConnectionInterface
	 * 
	 * @format
	 */

	'use strict';

	var _defineProperty3 = _interopRequireDefault(__webpack_require__(75));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var CLIENT_MUTATION_ID = 'clientMutationId';
	var CONNECTION_CALLS = {
	  after: true,
	  before: true,
	  find: true,
	  first: true,
	  last: true,
	  surrounds: true
	};
	var CURSOR = 'cursor';
	var EDGES = 'edges';
	var END_CURSOR = 'endCursor';
	var HAS_NEXT_PAGE = 'hasNextPage';
	var HAS_PREV_PAGE = 'hasPreviousPage';
	var NODE = 'node';
	var PAGE_INFO = 'pageInfo';
	var PAGE_INFO_TYPE = 'PageInfo';
	var REQUIRED_RANGE_CALLS = {
	  find: true,
	  first: true,
	  last: true
	};
	var START_CURSOR = 'startCursor';

	/**
	 * @internal
	 *
	 * Defines logic relevant to the informal "Connection" GraphQL interface.
	 */
	var RelayOSSConnectionInterface = {
	  CLIENT_MUTATION_ID: CLIENT_MUTATION_ID,
	  CURSOR: CURSOR,
	  EDGES: EDGES,
	  END_CURSOR: END_CURSOR,
	  HAS_NEXT_PAGE: HAS_NEXT_PAGE,
	  HAS_PREV_PAGE: HAS_PREV_PAGE,
	  NODE: NODE,
	  PAGE_INFO: PAGE_INFO,
	  PAGE_INFO_TYPE: PAGE_INFO_TYPE,
	  START_CURSOR: START_CURSOR,

	  /**
	   * Whether `edges` fields are expected to have `source` fields.
	   */
	  EDGES_HAVE_SOURCE_FIELD: false,

	  /**
	   * Checks whether a call exists strictly to encode which parts of a connection
	   * to fetch. Fields that only differ by connection call values should have the
	   * same identity.
	   */
	  isConnectionCall: function isConnectionCall(call) {
	    return CONNECTION_CALLS.hasOwnProperty(call.name);
	  },


	  /**
	   * Checks whether a set of calls on a connection supply enough information to
	   * fetch the range fields (i.e. `edges` and `page_info`).
	   */
	  hasRangeCalls: function hasRangeCalls(calls) {
	    return calls.some(function (call) {
	      return REQUIRED_RANGE_CALLS.hasOwnProperty(call.name);
	    });
	  },


	  /**
	   * Gets a default record representing a connection's `PAGE_INFO`.
	   */
	  getDefaultPageInfo: function getDefaultPageInfo() {
	    var _ref;

	    return _ref = {}, (0, _defineProperty3['default'])(_ref, END_CURSOR, undefined), (0, _defineProperty3['default'])(_ref, HAS_NEXT_PAGE, false), (0, _defineProperty3['default'])(_ref, HAS_PREV_PAGE, false), (0, _defineProperty3['default'])(_ref, START_CURSOR, undefined), _ref;
	  }
	};

	module.exports = RelayOSSConnectionInterface;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelayPrinter
	 * @format
	 */

	'use strict';

	var _stringify2 = _interopRequireDefault(__webpack_require__(13));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(16),
	    DEFAULT_HANDLE_KEY = _require.DEFAULT_HANDLE_KEY;

	var _require2 = __webpack_require__(3),
	    GraphQLEnumType = _require2.GraphQLEnumType,
	    GraphQLInputObjectType = _require2.GraphQLInputObjectType,
	    GraphQLList = _require2.GraphQLList,
	    GraphQLNonNull = _require2.GraphQLNonNull;

	var INDENT = '  ';

	/**
	 * Converts a Relay IR node into a GraphQL string. Custom Relay
	 * extensions (directives) are not supported; to print fragments with
	 * variables or fragment spreads with arguments, transform the node
	 * prior to printing.
	 */
	function print(node) {
	  if (node.kind === 'Fragment') {
	    return 'fragment ' + node.name + ' on ' + String(node.type) + printFragmentArgumentDefinitions(node.argumentDefinitions) + printDirectives(node.directives) + printSelections(node, '') + '\n';
	  } else if (node.kind === 'Root') {
	    return node.operation + ' ' + node.name + printArgumentDefinitions(node.argumentDefinitions) + printDirectives(node.directives) + printSelections(node, '') + '\n';
	  } else {
	    __webpack_require__(1)(false, 'RelayPrinter: Unsupported IR node `%s`.', node.kind);
	  }
	}

	function printSelections(node, indent, parentCondition) {
	  var selections = node.selections;
	  if (selections == null) {
	    return '';
	  }
	  var printed = selections.map(function (selection) {
	    return printSelection(selection, indent, parentCondition);
	  });
	  return printed.length ? ' {\n' + (indent + INDENT) + printed.join('\n' + indent + INDENT) + '\n' + indent + '}' : '';
	}

	function printSelection(selection, indent, parentCondition) {
	  parentCondition = parentCondition || '';
	  var str = '';
	  if (selection.kind === 'LinkedField') {
	    if (selection.alias != null) {
	      str += selection.alias + ': ';
	    }
	    str += selection.name;
	    str += printArguments(selection.args);
	    str += parentCondition;
	    str += printDirectives(selection.directives);
	    str += printHandles(selection);
	    str += printSelections(selection, indent + INDENT);
	  } else if (selection.kind === 'ScalarField') {
	    if (selection.alias != null) {
	      str += selection.alias + ': ';
	    }
	    str += selection.name;
	    str += printArguments(selection.args);
	    str += parentCondition;
	    str += printDirectives(selection.directives);
	    str += printHandles(selection);
	  } else if (selection.kind === 'InlineFragment') {
	    str += '... on ' + selection.typeCondition.toString();
	    str += parentCondition;
	    str += printDirectives(selection.directives);
	    str += printSelections(selection, indent + INDENT);
	  } else if (selection.kind === 'FragmentSpread') {
	    str += '...' + selection.name;
	    str += parentCondition;
	    str += printFragmentArguments(selection.args);
	    str += printDirectives(selection.directives);
	  } else if (selection.kind === 'Condition') {
	    var value = printValue(selection.condition);
	    // For Flow
	    __webpack_require__(1)(value != null, 'RelayPrinter: Expected a variable for condition, got a literal `null`.');
	    var condStr = selection.passingValue ? ' @include' : ' @skip';
	    condStr += '(if: ' + value + ')';
	    condStr += parentCondition;
	    // For multi-selection conditions, pushes the condition down to each
	    var subSelections = selection.selections.map(function (sel) {
	      return printSelection(sel, indent, condStr);
	    });
	    str += subSelections.join('\n' + INDENT);
	  } else {
	    __webpack_require__(1)(false, 'RelayPrinter: Unknown selection kind `%s`.', selection.kind);
	  }
	  return str;
	}

	function printArgumentDefinitions(argumentDefinitions) {
	  var printed = argumentDefinitions.map(function (def) {
	    var str = '$' + def.name + ': ' + def.type.toString();
	    if (def.defaultValue != null) {
	      str += ' = ' + printLiteral(def.defaultValue, def.type);
	    }
	    return str;
	  });
	  return printed.length ? '(\n' + INDENT + printed.join('\n' + INDENT) + '\n)' : '';
	}

	function printFragmentArgumentDefinitions(argumentDefinitions) {
	  var printed = void 0;
	  argumentDefinitions.forEach(function (def) {
	    if (def.kind !== 'LocalArgumentDefinition') {
	      return;
	    }
	    printed = printed || [];
	    var str = def.name + ': {type: "' + def.type.toString() + '"';
	    if (def.defaultValue != null) {
	      str += ', defaultValue: ' + printLiteral(def.defaultValue, def.type);
	    }
	    str += '}';
	    printed.push(str);
	  });
	  return printed && printed.length ? ' @argumentDefinitions(\n' + INDENT + printed.join('\n' + INDENT) + '\n)' : '';
	}

	function printHandles(field) {
	  if (!field.handles) {
	    return '';
	  }
	  var printed = field.handles.map(function (handle) {
	    // For backward compatibility and also because this module is shared by ComponentScript.
	    var key = handle.key === DEFAULT_HANDLE_KEY ? '' : ', key: "' + handle.key + '"';
	    var filters = handle.filters == null ? '' : ', filters: ' + (0, _stringify2['default'])(handle.filters.sort());
	    return '@__clientField(handle: "' + handle.name + '"' + key + filters + ')';
	  });
	  return printed.length ? ' ' + printed.join(' ') : '';
	}

	function printDirectives(directives) {
	  var printed = directives.map(function (directive) {
	    return '@' + directive.name + printArguments(directive.args);
	  });
	  return printed.length ? ' ' + printed.join(' ') : '';
	}

	function printFragmentArguments(args) {
	  var printedArgs = printArguments(args);
	  if (!printedArgs.length) {
	    return '';
	  }
	  return ' @arguments' + printedArgs;
	}

	function printArguments(args) {
	  var printed = [];
	  args.forEach(function (arg) {
	    var printedValue = printValue(arg.value, arg.type);
	    if (printedValue != null) {
	      printed.push(arg.name + ': ' + printedValue);
	    }
	  });
	  return printed.length ? '(' + printed.join(', ') + ')' : '';
	}

	function printValue(value, type) {
	  if (value.kind === 'Variable') {
	    return '$' + value.variableName;
	  } else if (value.kind === 'ObjectValue') {
	    __webpack_require__(1)(type instanceof GraphQLInputObjectType, 'RelayPrinter: Need an InputObject type to print objects.');

	    var typeFields = type.getFields();
	    var pairs = value.fields.map(function (field) {
	      var innerValue = printValue(field.value, typeFields[field.name].type);
	      return innerValue == null ? null : field.name + ': ' + innerValue;
	    }).filter(Boolean);

	    return '{' + pairs.join(', ') + '}';
	  } else if (value.kind === 'ListValue') {
	    __webpack_require__(1)(type instanceof GraphQLList, 'RelayPrinter: Need a type in order to print arrays.');
	    var innerType = type.ofType;
	    return '[' + value.items.map(function (i) {
	      return printValue(i, innerType);
	    }).join(', ') + ']';
	  } else if (value.value != null) {
	    return printLiteral(value.value, type);
	  } else {
	    return null;
	  }
	}

	function printLiteral(value, type) {
	  if (type instanceof GraphQLNonNull) {
	    type = type.ofType;
	  }
	  if (type instanceof GraphQLEnumType) {
	    __webpack_require__(1)(typeof value === 'string', 'RelayPrinter: Expected value of type %s to be a string, got `%s`.', type.name, value);
	    return value;
	  }
	  if (Array.isArray(value)) {
	    __webpack_require__(1)(type instanceof GraphQLList, 'RelayPrinter: Need a type in order to print arrays.');
	    var itemType = type.ofType;
	    return '[' + value.map(function (item) {
	      return printLiteral(item, itemType);
	    }).join(', ') + ']';
	  } else if (typeof value === 'object' && value) {
	    var fields = [];
	    __webpack_require__(1)(type instanceof GraphQLInputObjectType, 'RelayPrinter: Need an InputObject type to print objects.');
	    var typeFields = type.getFields();
	    __webpack_require__(30)(value, function (val, key) {
	      fields.push(key + ': ' + printLiteral(val, typeFields[key].type));
	    });
	    return '{' + fields.join(', ') + '}';
	  } else {
	    return (0, _stringify2['default'])(value);
	  }
	}

	module.exports = { print: print };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule RelaySkipClientFieldTransform
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(4),
	    assertTypeWithFields = _require.assertTypeWithFields,
	    canHaveSelections = _require.canHaveSelections,
	    getRawType = _require.getRawType;

	var _require2 = __webpack_require__(3),
	    SchemaMetaFieldDef = _require2.SchemaMetaFieldDef,
	    TypeMetaFieldDef = _require2.TypeMetaFieldDef,
	    TypeNameMetaFieldDef = _require2.TypeNameMetaFieldDef;

	/**
	 * A transform that removes any selections that are not valid relative to the
	 * given schema. The primary use case is for fields added via client
	 * `extend type ...` definitions and for inline fragments / fragment spreads
	 * whose types are added with client `type ...` type extensions.
	 *
	 * Given a base schema:
	 *
	 * ```
	 * # Note: full schema definition elided for clarity
	 * interface Viewer {
	 *   name: String
	 * }
	 * type User implements Viewer {
	 *   name: String
	 * }
	 * ```
	 *
	 * And a fragment:
	 *
	 * ```
	 * fragment on Viewer {
	 *   name
	 *   ... on User {
	 *     clientField # (1)
	 *   }
	 *   ... on ClientType { # (2)
	 *     clientField
	 *   }
	 * }
	 * extend type User {
	 *   clientField: String
	 * }
	 * type ClientType implements Viewer {
	 *   name: String
	 *   clientField: String
	 * }
	 * ```
	 *
	 * This transform will output:
	 *
	 * ```
	 * fragment on Viewer {
	 *   name
	 * }
	 * ```
	 *
	 * Note that (1) is removed because this field does not exist on the base `User`
	 * type, and (2) is removed because the `ClientType` type does not exist in the
	 * base schema.
	 */
	function transform(context, schema) {
	  return __webpack_require__(11).transform(context, {
	    FragmentSpread: visitFragmentSpread,
	    InlineFragment: visitInlineFragment,
	    LinkedField: visitField,
	    ScalarField: visitField
	  }, buildState.bind(null, schema));
	}

	/**
	 * @internal
	 *
	 * Build the initial state, returning null for fragments whose type is not
	 * defined in the original schema.
	 */
	function buildState(schema, node) {
	  var parentType = void 0;
	  if (node.kind === 'Fragment') {
	    parentType = schema.getType(node.type.name);
	  } else {
	    switch (node.operation) {
	      case 'query':
	        parentType = schema.getQueryType();
	        break;
	      case 'mutation':
	        parentType = schema.getMutationType();
	        break;
	      case 'subscription':
	        parentType = schema.getSubscriptionType();
	        break;
	    }
	  }
	  if (parentType) {
	    return {
	      schema: schema,
	      parentType: parentType
	    };
	  } else {
	    return null;
	  }
	}

	/**
	 * @internal
	 *
	 * Skip fields that were added via `extend type ...`.
	 */
	function visitField(field, state) {
	  if (
	  // Field is defined in the original parent type definition:
	  canHaveSelections(state.parentType) && assertTypeWithFields(state.parentType).getFields()[field.name] ||
	  // Allow metadata fields and fields defined on classic "fat" interfaces
	  field.name === SchemaMetaFieldDef.name || field.name === TypeMetaFieldDef.name || field.name === TypeNameMetaFieldDef.name || field.directives.some(function (_ref) {
	    var name = _ref.name;
	    return name === 'fixme_fat_interface';
	  })) {
	    var rawType = getRawType(field.type);
	    var type = state.schema.getType(rawType.name);
	    __webpack_require__(1)(type, 'RelaySkipClientFieldTransform: Expected type `%s` to be defined in ' + 'the original schema.', rawType.name);
	    return this.traverse(field, (0, _extends3['default'])({}, state, {
	      parentType: type
	    }));
	  }
	  return null;
	}

	/**
	 * @internal
	 *
	 * Skip fragment spreads where the referenced fragment is not defined in the
	 * original schema.
	 */
	function visitFragmentSpread(spread, state) {
	  var context = this.getContext();
	  var fragment = context.get(spread.name);
	  __webpack_require__(1)(fragment && fragment.kind === 'Fragment', 'RelaySkipClientFieldTransform: Expected a fragment named `%s` to be defined.', spread.name);
	  if (state.schema.getType(fragment.type.name)) {
	    return this.traverse(spread, state);
	  }
	  return null;
	}

	/**
	 * @internal
	 *
	 * Skip inline fragments where the type is not in the schema.
	 */
	function visitInlineFragment(fragment, state) {
	  var type = state.schema.getType(fragment.typeCondition.name);
	  if (type) {
	    return this.traverse(fragment, (0, _extends3['default'])({}, state, {
	      parentType: type
	    }));
	  }
	  return null;
	}

	module.exports = { transform: transform };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelaySkipHandleFieldTransform
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * A transform that removes field `handles`. Intended for use when e.g.
	 * printing queries to send to a GraphQL server.
	 */
	function transform(context, schema) {
	  return __webpack_require__(11).transform(context, {
	    LinkedField: visitField,
	    ScalarField: visitField
	  }, function () {
	    return true;
	  });
	}

	function visitField(field, state) {
	  var transformedNode = this.traverse(field, state);
	  if (transformedNode.handles) {
	    return (0, _extends3['default'])({}, transformedNode, {
	      handles: null
	    });
	  }
	  return transformedNode;
	}

	module.exports = { transform: transform };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelaySkipUnreachableNodeTransform
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(6));

	var _from2 = _interopRequireDefault(__webpack_require__(17));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var FAIL = 'fail';
	var PASS = 'pass';
	var VARIABLE = 'variable';

	/**
	 * A tranform that removes unreachable IR nodes from all documents in a corpus.
	 * The following nodes are removed:
	 * - Any node with `@include(if: false)`
	 * - Any node with `@skip(if: true)`
	 * - Any node with empty `selections`
	 */
	function transform(context) {
	  var documents = context.documents();
	  var fragments = new (__webpack_require__(47))();
	  var nextContext = documents.reduce(function (ctx, node) {
	    if (node.kind === 'Root') {
	      var transformedNode = transformNode(context, fragments, node);
	      if (transformedNode) {
	        return ctx.add(transformedNode);
	      }
	    }
	    return ctx;
	  }, new (__webpack_require__(10))(context.schema));
	  return (0, _from2['default'])(fragments.values()).reduce(function (ctx, fragment) {
	    return fragment ? ctx.add(fragment) : ctx;
	  }, nextContext);
	}

	function transformNode(context, fragments, node) {
	  var queue = [].concat((0, _toConsumableArray3['default'])(node.selections));
	  var selections = void 0;
	  while (queue.length) {
	    var selection = queue.shift();
	    var nextSelection = void 0;
	    if (selection.kind === 'Condition') {
	      var match = testCondition(selection);
	      if (match === PASS) {
	        queue.unshift.apply(queue, (0, _toConsumableArray3['default'])(selection.selections));
	      } else if (match === VARIABLE) {
	        nextSelection = transformNode(context, fragments, selection);
	      }
	    } else if (selection.kind === 'FragmentSpread') {
	      // Skip fragment spreads if the referenced fragment is empty
	      if (!fragments.has(selection.name)) {
	        var fragment = context.get(selection.name);
	        __webpack_require__(1)(fragment && fragment.kind === 'Fragment', 'RelaySkipUnreachableNodeTransform: Found a reference to undefined ' + 'fragment `%s`.', selection.name);
	        var nextFragment = transformNode(context, fragments, fragment);
	        fragments.set(selection.name, nextFragment);
	      }
	      if (fragments.get(selection.name)) {
	        nextSelection = selection;
	      }
	    } else if (selection.kind === 'LinkedField' || selection.kind === 'InlineFragment') {
	      nextSelection = transformNode(context, fragments, selection);
	    } else {
	      // scalar field
	      nextSelection = selection;
	    }
	    if (nextSelection) {
	      selections = selections || [];
	      selections.push(nextSelection);
	    }
	  }
	  if (selections) {
	    return (0, _extends3['default'])({}, node, {
	      selections: selections
	    });
	  }
	  return null;
	}

	/**
	 * Determines whether a condition statically passes/fails or is unknown
	 * (variable).
	 */
	function testCondition(condition) {
	  if (condition.condition.kind === 'Variable') {
	    return VARIABLE;
	  }
	  return condition.condition.value === condition.passingValue ? PASS : FAIL;
	}

	module.exports = { transform: transform };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule filterContextForNode
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(25),
	    visit = _require.visit;

	/**
	 * Returns a RelayCompilerContext containing only the documents referenced
	 * by and including the provided node.
	 */
	function filterContextForNode(node, context) {
	  var queue = [node];
	  var filteredContext = new (__webpack_require__(10))(context.schema).add(node);
	  var visitorConfig = {
	    FragmentSpread: function FragmentSpread(fragmentSpread) {
	      var name = fragmentSpread.name;

	      if (!filteredContext.get(name)) {
	        var fragment = context.getFragment(name);
	        filteredContext = filteredContext.add(fragment);
	        queue.push(fragment);
	      }
	    }
	  };
	  while (queue.length) {
	    visit(queue.pop(), visitorConfig);
	  }
	  return filteredContext;
	}

	module.exports = filterContextForNode;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule formatStorageKey
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Given a `fieldName` (eg. "foo") and an object representing arguments and
	 * values (eg. `{first: 10, orberBy: "name"}`) returns a unique storage key
	 * (ie. `foo{"first":10,"orderBy":"name"}`).
	 */
	function formatStorageKey(fieldName, argsWithValues) {
	  if (!argsWithValues) {
	    return fieldName;
	  }
	  var filtered = null;
	  __webpack_require__(30)(argsWithValues, function (value, argName) {
	    if (value != null) {
	      if (!filtered) {
	        filtered = {};
	      }
	      filtered[argName] = value;
	    }
	  });
	  return fieldName + (filtered ? __webpack_require__(28)(filtered) : '');
	}

	module.exports = formatStorageKey;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIdentifierForRelayArgumentValue
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Generates an identifier for an argument value. The identifier is based on the
	 * structure/order of items and keys in the value.
	 */
	function getIdentifierForRelayArgumentValue(value) {
	  switch (value.kind) {
	    case 'Variable':
	      return { variable: value.variableName };
	    case 'Literal':
	      return { value: value.value };
	    case 'ListValue':
	      return {
	        list: value.items.map(function (item) {
	          return getIdentifierForRelayArgumentValue(item);
	        })
	      };
	    case 'ObjectValue':
	      return {
	        object: value.fields.map(function (field) {
	          return {
	            name: field.name,
	            value: getIdentifierForRelayArgumentValue(field.value)
	          };
	        })
	      };
	    default:
	      __webpack_require__(1)(false, 'getIdentifierForRelayArgumentValue(): Unsupported AST kind `%s`.', value.kind);
	  }
	}

	module.exports = getIdentifierForRelayArgumentValue;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule getRelayHandleKey
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(16),
	    DEFAULT_HANDLE_KEY = _require.DEFAULT_HANDLE_KEY;

	/**
	 * @internal
	 *
	 * Helper to create a unique name for a handle field based on the handle name, handle key and
	 * source field.
	 */


	function getRelayHandleKey(handleName, key, fieldName) {
	  if (key && key !== DEFAULT_HANDLE_KEY) {
	    return '__' + key + '_' + handleName;
	  }

	  __webpack_require__(1)(fieldName != null, 'getRelayHandleKey: Expected either `fieldName` or `key` in `handle` to be provided');
	  return '__' + fieldName + '_' + handleName;
	}

	module.exports = getRelayHandleKey;

/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Based on implementations by Gary Court and Austin Appleby, 2011, MIT.
	 *
	 * @providesModule murmurHash
	 * 
	 * @format
	 */

	'use strict';

	var BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	/**
	 * @param {string} key A UTF-16 or ASCII string
	 * @return {string} a base62 murmur hash
	 */
	function murmurHash(str) {
	  /* eslint-disable no-bitwise */
	  var length = str.length;
	  var rem = length & 3;
	  var len = length ^ rem;

	  var h = 0;
	  var i = 0;
	  var k = void 0;

	  while (i !== len) {
	    var ch4 = str.charCodeAt(i + 3);

	    k = str.charCodeAt(i) ^ str.charCodeAt(i + 1) << 8 ^ str.charCodeAt(i + 2) << 16 ^ (ch4 & 0xff) << 24 ^ (ch4 & 0xff00) >> 8;

	    i += 4;

	    k = k * 0x2d51 + (k & 0xffff) * 0xcc9e0000 >>> 0;
	    k = k << 15 | k >>> 17;
	    k = k * 0x3593 + (k & 0xffff) * 0x1b870000 >>> 0;
	    h ^= k;
	    h = h << 13 | h >>> 19;
	    h = h * 5 + 0xe6546b64 >>> 0;
	  }

	  k = 0;
	  switch (rem) {
	    /* eslint-disable no-fallthrough */
	    case 3:
	      k ^= str.charCodeAt(len + 2) << 16;
	    case 2:
	      k ^= str.charCodeAt(len + 1) << 8;
	    case 1:
	      k ^= str.charCodeAt(len);

	      k = k * 0x2d51 + (k & 0xffff) * 0xcc9e0000 >>> 0;
	      k = k << 15 | k >>> 17;
	      k = k * 0x3593 + (k & 0xffff) * 0x1b870000 >>> 0;
	      h ^= k;
	  }

	  h ^= length;
	  h ^= h >>> 16;
	  h = h * 0xca6b + (h & 0xffff) * 0x85eb0000 >>> 0;
	  h ^= h >>> 13;
	  h = h * 0xae35 + (h & 0xffff) * 0xc2b20000 >>> 0;
	  h ^= h >>> 16;

	  h >>>= 0;

	  if (!h) {
	    return '0';
	  }

	  var s = '';
	  while (h) {
	    var d = h % 62;
	    s = BASE62[d] + s;
	    h = (h - d) / 62;
	  }
	  return s;
	}

	module.exports = murmurHash;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * TODO @joesavona: enable flow
	 * @providesModule transformInputObjectToIR
	 * @format
	 */

	'use strict';

	var _keys2 = _interopRequireDefault(__webpack_require__(15));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(4),
	    getRawType = _require.getRawType;

	var _require2 = __webpack_require__(3),
	    GraphQLEnumType = _require2.GraphQLEnumType,
	    GraphQLInputObjectType = _require2.GraphQLInputObjectType,
	    GraphQLNonNull = _require2.GraphQLNonNull,
	    GraphQLScalarType = _require2.GraphQLScalarType;

	/**
	 * Transforms a GraphQLInputObjectType to a RelayIR LinkedField.
	 */
	function transformInputObjectToIR(node) {
	  var type = getRawType(node.type);
	  var fields = type.getFields();
	  // If the node is the root (an Argument), use the name of the type so it is
	  // named 'FooBarData' instead of 'input'

	  var _ref = node.kind === 'Argument' ? type : node,
	      name = _ref.name;

	  return {
	    alias: null,
	    args: [],
	    directives: [],
	    handles: null,
	    kind: 'LinkedField',
	    metadata: null,
	    name: name,
	    selections: (0, _keys2['default'])(fields).map(function (fieldKey) {
	      return transformFieldToIR(fields[fieldKey]);
	    }),
	    type: node.type
	  };
	}

	/**
	 * Transforms a field (GraphQLInputObjectType or GraphQLScalarType) to a
	 * RelayIR ScalarField or LinkedField.
	 */
	function transformFieldToIR(node) {
	  var type = getRawType(node.type);
	  if (type instanceof GraphQLInputObjectType) {
	    return transformInputObjectToIR(node);
	  }

	  if (type instanceof GraphQLEnumType || type instanceof GraphQLScalarType) {
	    return transformScalarToIR(node.name, type);
	  }

	  throw new Error('Unhandled node type');
	}

	/**
	 * Transforms a GraphQLScalarType to a RelayIR ScalarField
	 */
	function transformScalarToIR(name, type) {
	  return {
	    alias: null,
	    args: [],
	    directives: [],
	    handles: null,
	    kind: 'ScalarField',
	    metadata: null,
	    name: name,
	    type: type
	  };
	}

	module.exports = transformInputObjectToIR;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule writeLegacyFlowFile
	 * 
	 * @format
	 */

	'use strict';

	function writeLegacyFlowFile(outputDirectory, name, flowTypes, buildCommand, platform) {
	  var moduleName = name + '.legacyflow';
	  var header = '/**\n * Copyright 2004-present Facebook. All Rights Reserved.\n *\n * This file was generated by:\n *   ' + buildCommand + '\n *\n * ' + '@' + 'providesModule ' + moduleName + '\n * ' + __webpack_require__(20).getSigningToken() + '\n * ' + '@' + 'flow\n */\n\n\'use strict\';\n\n/**\n * NOTE:\n * These are legacy flow types that have issues in some edge cases. For example:\n *\n *   fragment on Actor {\n *     ... on User {\n *       name\n *     }\n *     ... on Page {\n *       name\n *     }\n *   }\n *\n * generates invalid output. Please use the flow types from the *.graphql.js\n * file instead.\n */\n\n';

	  var fileName = platform ? moduleName + '.' + platform : moduleName;
	  outputDirectory.writeFile(fileName + '.js', __webpack_require__(20).signFile(header + flowTypes + '\n'));
	}

	module.exports = writeLegacyFlowFile;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule writeRelayGeneratedFile
	 * 
	 * @format
	 */

	'use strict';

	var _asyncToGenerator2 = __webpack_require__(19);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _extends3 = _interopRequireDefault(__webpack_require__(5));

	var _stringify2 = _interopRequireDefault(__webpack_require__(13));

	let writeRelayGeneratedFile = (() => {
	  var _ref2 = (0, _asyncToGenerator3.default)(function* (codegenDir, generatedNode, buildCommand, flowText, persistQuery, platform, relayRuntimeModule) {
	    var moduleName = generatedNode.name + '.graphql';
	    var platformName = platform ? moduleName + '.' + platform : moduleName;
	    var filename = platformName + '.js';
	    var flowTypeName = generatedNode.kind === 'Batch' ? 'ConcreteBatch' : 'ConcreteFragment';

	    var text = null;
	    var hash = null;
	    if (generatedNode.kind === 'Batch') {
	      text = generatedNode.text;
	      __webpack_require__(1)(text, 'codegen-runner: Expected query to have text before persisting.');
	      var oldContent = codegenDir.read(filename);
	      // Hash the concrete node including the query text.
	      hash = md5((0, _stringify2['default'])(generatedNode) + (persistQuery ? 'persisted' : '') + buildCommand + 'cache-breaker-3');
	      if (hash === extractHash(oldContent)) {
	        codegenDir.markUnchanged(filename);
	        return null;
	      }
	      if (codegenDir.onlyValidate) {
	        codegenDir.markUpdated(filename);
	        return null;
	      }
	      if (persistQuery) {
	        generatedNode = (0, _extends3['default'])({}, generatedNode, {
	          text: null,
	          id: yield persistQuery(text)
	        });
	      }
	    }

	    var moduleText = generateModule({
	      buildCommand: buildCommand,
	      moduleName: moduleName,
	      documentType: flowTypeName,
	      docText: text,
	      flowText: flowText,
	      hash: hash,
	      concreteText: __webpack_require__(43)(generatedNode),
	      relayRuntimeModule: relayRuntimeModule
	    });

	    codegenDir.writeFile(filename, moduleText);
	    return generatedNode;
	  });

	  return function writeRelayGeneratedFile(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
	    return _ref2.apply(this, arguments);
	  };
	})();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function extractHash(text) {
	  if (!text) {
	    return null;
	  }
	  if (/<<<<<|>>>>>/.test(text)) {
	    // looks like a merge conflict
	    return null;
	  }
	  var match = text.match(/^ \* @relayHash (\w{32})$/m);
	  return match && match[1];
	}

	/**
	 * Generate a module for the given document name/text.
	 */
	function generateModule(_ref) {
	  var buildCommand = _ref.buildCommand,
	      moduleName = _ref.moduleName,
	      documentType = _ref.documentType,
	      docText = _ref.docText,
	      concreteText = _ref.concreteText,
	      flowText = _ref.flowText,
	      hash = _ref.hash,
	      relayRuntimeModule = _ref.relayRuntimeModule;

	  var objectName = documentType === 'ConcreteBatch' ? 'batch' : 'fragment';
	  var docTextComment = docText ? '\n/*\n' + docText.trim() + '\n*/\n' : '';
	  var hashText = hash ? '\n * @relayHash ' + hash : '';
	  var source = '/**\n * This file was generated by:\n *   ' + buildCommand + '\n *\n * ' + '@' + 'providesModule ' + moduleName + '\n * ' + __webpack_require__(20).getSigningToken() + hashText + '\n * ' + '@' + 'flow\n * ' + '@' + 'nogrep\n */\n\n/* eslint-disable */\n\n\'use strict\';\n\n/*::\nimport type {' + documentType + '} from \'' + relayRuntimeModule + '\';\n' + (flowText || '') + '\n*/\n\n' + docTextComment + '\nconst ' + objectName + ' /*: ' + documentType + '*/ = ' + concreteText + ';\n\nmodule.exports = ' + objectName + ';\n';
	  return __webpack_require__(20).signFile(source);
	}

	function md5(text) {
	  return __webpack_require__(46).createHash('md5').update(text).digest('hex');
	}

	module.exports = writeRelayGeneratedFile;

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = require("babel-traverse");

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = require("babylon");

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = require("fb-watchman");

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/areEqual");

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/nullthrows");

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = require("sync-request");

/***/ }
/******/ ]);
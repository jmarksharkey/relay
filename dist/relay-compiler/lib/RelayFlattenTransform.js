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

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _from2 = _interopRequireDefault(require('babel-runtime/core-js/array/from'));

var _map2 = _interopRequireDefault(require('babel-runtime/core-js/map'));

var _stringify2 = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));

var _keys2 = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('graphql'),
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLList = _require.GraphQLList;

var getRawType = require('./RelaySchemaUtils').getRawType,
    isAbstractType = require('./RelaySchemaUtils').isAbstractType;

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
    require('fbjs/lib/invariant')(flattenedNode.kind === 'Root' || flattenedNode.kind === 'Fragment', 'RelayFlattenTransform: Expected Root `%s` to flatten back to a Root ' + ' or Fragment.', node.name);
    return ctx.add(flattenedNode);
  }, new (require('./RelayCompilerContext'))(context.schema));
}

function buildNode(state) {
  return (0, _extends3['default'])({}, state.node, {
    selections: (0, _keys2['default'])(state.selections).map(function (key) {
      var selectionState = state.selections[key];
      if (selectionState.kind === 'FragmentSpread' || selectionState.kind === 'ScalarField') {
        return selectionState;
      } else if (selectionState.kind === 'FlattenState') {
        var _node = buildNode(selectionState);
        require('fbjs/lib/invariant')(_node.kind !== 'Root' && _node.kind !== 'Fragment', 'RelayFlattenTransform: got a `%s`, expected a selection.', _node.kind);
        return _node;
      } else {
        // $FlowIssue: this is provably unreachable
        require('fbjs/lib/invariant')(false, 'RelayFlattenTransform: Unexpected kind `%s`.', selectionState.kind);
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
      require('fbjs/lib/invariant')(!selection.args.length, 'RelayFlattenTransform: Cannot flatten fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', selection.name);
      var fragment = context.get(selection.name);
      require('fbjs/lib/invariant')(fragment && fragment.kind === 'Fragment', 'RelayFlattenTransform: Unknown fragment `%s`.', selection.name);
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
    var nodeIdentifier = require('./getIdentifierForRelaySelection')(selection);
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
        require('fbjs/lib/invariant')(areEqualFields(selection, prevSelection), 'RelayFlattenTransform: Expected all fields with the alias `%s` ' + 'to have the same name/arguments. Got `%s` and `%s`.', nodeIdentifier, showField(selection), showField(prevSelection));
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
        require('fbjs/lib/invariant')(areEqualFields(selection, _prevSelection), 'RelayFlattenTransform: Expected all fields with the alias `%s` ' + 'to have the same name/arguments. Got `%s` and `%s`.', nodeIdentifier, showField(selection), showField(_prevSelection));
        if (selection.handles || _prevSelection.handles) {
          var _handles = dedupe(selection.handles, _prevSelection.handles);
          selection = (0, _extends3['default'])({}, selection, {
            handles: _handles
          });
        }
      }
      state.selections[nodeIdentifier] = selection;
    } else {
      require('fbjs/lib/invariant')(false, 'RelayFlattenTransform: Unknown kind `%s`.', selection.kind);
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
  return thisField.kind === thatField.kind && thisField.name === thatField.name && thisField.alias === thatField.alias && require('fbjs/lib/areEqual')(thisField.args, thatField.args);
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
      uniqueItems.set(require('./stableJSONStringify')(item), item);
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
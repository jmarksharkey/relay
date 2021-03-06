/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayStripUnusedVariablesTransform
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _set2 = _interopRequireDefault(require('babel-runtime/core-js/set'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * A transform that removes variables from root queries that aren't referenced
 * by the query itself.
 */
function transform(context) {
  return context.documents().reduce(function (ctx, node) {
    return ctx.add(node.kind === 'Root' ? transformRoot(context, node) : node);
  }, new (require('./RelayCompilerContext'))(context.schema));
}

function transformRoot(context, root) {
  var state = {
    referencedVariables: new _set2['default']()
  };
  var newContext = require('./RelayIRTransformer').transform(require('./filterContextForNode')(root, context), {
    Argument: visitArgument,
    Condition: visitCondition
  }, function () {
    return state;
  });
  var transformedNode = newContext.getRoot(root.name);
  /**
   * Remove the extraneous arguments *after* transform returns, since fragments
   * could be transformed after the root query.
   */
  return (0, _extends3['default'])({}, transformedNode, {
    argumentDefinitions: transformedNode.argumentDefinitions.filter(function (arg) {
      return state.referencedVariables.has(arg.name);
    })
  });
}

function visitArgument(argument, state) {
  var value = argument.value;

  if (value.kind === 'Variable') {
    state.referencedVariables.add(value.variableName);
  }
  return argument;
}

function visitCondition(condition, state) {
  var innerCondition = condition.condition;
  if (innerCondition.kind === 'Variable') {
    state.referencedVariables.add(innerCondition.variableName);
  }
  return condition;
}

module.exports = { transform: transform };
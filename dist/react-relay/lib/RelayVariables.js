/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayVariables
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Determines the variables that are in scope for a fragment given the variables
 * in scope at the root query as well as any arguments applied at the fragment
 * spread via `@arguments`.
 *
 * Note that this is analagous to determining function arguments given a function call.
 */
function getFragmentVariables(fragment, rootVariables, argumentVariables) {
  var variables = void 0;
  fragment.argumentDefinitions.forEach(function (definition) {
    if (argumentVariables.hasOwnProperty(definition.name)) {
      return;
    }
    variables = variables || (0, _extends3['default'])({}, argumentVariables);
    switch (definition.kind) {
      case 'LocalArgument':
        variables[definition.name] = definition.defaultValue;
        break;
      case 'RootArgument':
        // In the new core this would be an error. In the classic core a variable
        // may be conditionally unused, in which case it's okay for it to be
        // null.
        var rootValue = rootVariables[definition.name];
        variables[definition.name] = rootValue !== undefined ? rootValue : null;
        break;
      default:
        require('fbjs/lib/invariant')(false, 'RelayVariables: Unexpected node kind `%s` in fragment `%s`.', definition.kind, fragment.node.name);
    }
  });
  return variables || argumentVariables;
}

function getFragmentSpreadArguments(fragmentName, variableMapping, parentVariables, rootVariables) {
  return require('fbjs/lib/mapObject')(variableMapping, function (value, name) {
    var callVariable = require('./QueryBuilder').getCallVariable(value);
    if (callVariable) {
      value = parentVariables.hasOwnProperty(callVariable.callVariableName) ? parentVariables[callVariable.callVariableName] : rootVariables[callVariable.callVariableName];
    }
    if (value === undefined) {
      require('fbjs/lib/warning')(false, 'RelayVariables.getFragmentSpreadArguments(): Variable `%s` is ' + 'undefined in fragment `%s`.', name, fragmentName);
      value = null;
    }
    return value;
  });
}

/**
 * Determines the variables that are in scope for a given operation given values
 * for some/all of its arguments. Extraneous input variables are filtered from
 * the output, and missing variables are set to default values (if given in the
 * operation's definition).
 */
function getOperationVariables(operation, variables) {
  var operationVariables = {};
  operation.argumentDefinitions.forEach(function (def) {
    var value = def.defaultValue;
    if (variables[def.name] != null) {
      value = variables[def.name];
    }
    operationVariables[def.name] = value;
  });
  return operationVariables;
}

module.exports = {
  getFragmentSpreadArguments: getFragmentSpreadArguments,
  getFragmentVariables: getFragmentVariables,
  getOperationVariables: getOperationVariables
};
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule compileRelayQLTag
 * @format
 */

'use strict';

var RELAY_QL_GENERATED = 'RelayQL_GENERATED';

/**
 * Given all the metadata about a found RelayQL tag, compile it and return
 * the resulting Babel AST.
 */
function compileRelayQLTag(t, schemaProvider, quasi, documentName, propName, tagName, state) {
  try {
    var transformer = require('././getClassicTransformer')(schemaProvider, state.opts || {});
    return transformer.transform(t, quasi, {
      documentName: documentName,
      propName: propName,
      tagName: tagName,
      enableValidation: tagName !== RELAY_QL_GENERATED
    });
  } catch (error) {
    return require('././createTransformError')(t, error, quasi, state);
  }
}

module.exports = compileRelayQLTag;
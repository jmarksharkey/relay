/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayRecordSourceSelectorProxy
 * 
 * @format
 */

'use strict';

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./RelayReader'),
    read = _require.read;

var _require2 = require('./RelayStoreUtils'),
    getStorageKey = _require2.getStorageKey;

/**
 * @internal
 *
 * A subclass of RecordSourceProxy that provides convenience methods for
 * accessing the root fields of a given query/mutation. These fields accept
 * complex arguments and it can be tedious to re-construct the correct sets of
 * arguments to pass to e.g. `getRoot().getLinkedRecord()`.
 */
var RelayRecordSourceSelectorProxy = function () {
  function RelayRecordSourceSelectorProxy(recordSource, selector) {
    (0, _classCallCheck3['default'])(this, RelayRecordSourceSelectorProxy);

    this.__recordSource = recordSource;
    this._selector = selector;
  }

  RelayRecordSourceSelectorProxy.prototype.create = function create(dataID, typeName) {
    return this.__recordSource.create(dataID, typeName);
  };

  RelayRecordSourceSelectorProxy.prototype['delete'] = function _delete(dataID) {
    this.__recordSource['delete'](dataID);
  };

  RelayRecordSourceSelectorProxy.prototype.get = function get(dataID) {
    return this.__recordSource.get(dataID);
  };

  RelayRecordSourceSelectorProxy.prototype.getRoot = function getRoot() {
    return this.__recordSource.getRoot();
  };

  RelayRecordSourceSelectorProxy.prototype._getRootField = function _getRootField(selector, fieldName, plural) {
    var field = selector.node.selections.find(function (selection) {
      return selection.kind === 'LinkedField' && selection.name === fieldName;
    });
    require('fbjs/lib/invariant')(field && field.kind === 'LinkedField', 'RelayRecordSourceSelectorProxy#getRootField(): Cannot find root ' + 'field `%s`, no such field is defined on GraphQL document `%s`.', fieldName, selector.node.name);
    require('fbjs/lib/invariant')(field.plural === plural, 'RelayRecordSourceSelectorProxy#getRootField(): Expected root field ' + '`%s` to be %s.', fieldName, plural ? 'plural' : 'singular');
    return field;
  };

  RelayRecordSourceSelectorProxy.prototype.getRootField = function getRootField(fieldName) {
    var field = this._getRootField(this._selector, fieldName, false);
    var storageKey = getStorageKey(field, this._selector.variables);
    return this.getRoot().getLinkedRecord(storageKey);
  };

  RelayRecordSourceSelectorProxy.prototype.getPluralRootField = function getPluralRootField(fieldName) {
    var field = this._getRootField(this._selector, fieldName, true);
    var storageKey = getStorageKey(field, this._selector.variables);
    return this.getRoot().getLinkedRecords(storageKey);
  };

  RelayRecordSourceSelectorProxy.prototype.getResponse = function getResponse() {
    var snapshot = read(this, this._selector, require('./RelayRecordProxyReader'));
    return snapshot.data;
  };

  return RelayRecordSourceSelectorProxy;
}();

module.exports = RelayRecordSourceSelectorProxy;
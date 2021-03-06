/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayModernRecord
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _assign2 = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));

var _keys2 = _interopRequireDefault(require('babel-runtime/core-js/object/keys'));

var _stringify2 = _interopRequireDefault(require('babel-runtime/core-js/json/stringify'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./RelayStoreUtils'),
    ID_KEY = _require.ID_KEY,
    REF_KEY = _require.REF_KEY,
    REFS_KEY = _require.REFS_KEY,
    TYPENAME_KEY = _require.TYPENAME_KEY,
    UNPUBLISH_FIELD_SENTINEL = _require.UNPUBLISH_FIELD_SENTINEL;

/**
 * @public
 *
 * Low-level record manipulation methods.
 *
 * A note about perf: we use long-hand property access rather than computed
 * properties in this file for speed ie.
 *
 *    const object = {};
 *    object[KEY] = value;
 *    record[storageKey] = object;
 *
 * instead of:
 *
 *    record[storageKey] = {
 *      [KEY]: value,
 *    };
 *
 * The latter gets transformed by Babel into something like:
 *
 *    function _defineProperty(obj, key, value) {
 *      if (key in obj) {
 *        Object.defineProperty(obj, key, {
 *          value: value,
 *          enumerable: true,
 *          configurable: true,
 *          writable: true,
 *        });
 *      } else {
 *        obj[key] = value;
 *      }
 *      return obj;
 *    }
 *
 *    record[storageKey] = _defineProperty({}, KEY, value);
 *
 * A quick benchmark shows that computed property access is an order of
 * magnitude slower (times in seconds for 100,000 iterations):
 *
 *               best     avg     sd
 *    computed 0.02175 0.02292 0.00113
 *      manual 0.00110 0.00123 0.00008
 */

/**
 * @public
 *
 * Clone a record.
 */
function clone(record) {
  return (0, _extends3['default'])({}, record);
}

/**
 * @public
 *
 * Copies all fields from `source` to `sink`, excluding `__id` and `__typename`.
 *
 * NOTE: This function does not treat `id` specially. To preserve the id,
 * manually reset it after calling this function. Also note that values are
 * copied by reference and not value; callers should ensure that values are
 * copied on write.
 */
function copyFields(source, sink) {
  require('fbjs/lib/forEachObject')(source, function (value, key) {
    if (key !== ID_KEY && key !== TYPENAME_KEY) {
      sink[key] = value;
    }
  });
}

/**
 * @public
 *
 * Create a new record.
 */
function create(dataID, typeName) {
  // See perf note above for why we aren't using computed property access.
  var record = {};
  record[ID_KEY] = dataID;
  record[TYPENAME_KEY] = typeName;
  return record;
}

/**
 * @public
 *
 * Get the record's `id` if available or the client-generated identifier.
 */
function getDataID(record) {
  return record[ID_KEY];
}

/**
 * @public
 *
 * Get the concrete type of the record.
 */
function getType(record) {
  return record[TYPENAME_KEY];
}

/**
 * @public
 *
 * Get a scalar (non-link) field value.
 */
function getValueByStorageKey(record, storageKey) {
  var value = record[storageKey];
  if (value && typeof value === 'object') {
    require('fbjs/lib/invariant')(!value.hasOwnProperty(REF_KEY) && !value.hasOwnProperty(REFS_KEY), 'RelayModernRecord.getValueByStorageKey(): Expected a scalar (non-link) value for `%s.%s` ' + 'but found %s.', record[ID_KEY], storageKey, value.hasOwnProperty(REF_KEY) ? 'a linked record' : 'plural linked records');
  }
  return value;
}

/**
 * @public
 *
 * Get a scalar (non-link) field value via field name and args.
 */
function getValue(record, name, args) {
  var storageKey = require('./formatStorageKey')(name, args);
  return getValueByStorageKey(record, storageKey);
}

/**
 * @public
 *
 * Get the value of a field as a reference to another record. Throws if the
 * field has a different type.
 */
function getLinkedRecordIDByStorageKey(record, storageKey) {
  var link = record[storageKey];
  if (link == null) {
    return link;
  }
  require('fbjs/lib/invariant')(typeof link === 'object' && link && typeof link[REF_KEY] === 'string', 'RelayModernRecord.getLinkedRecordIDByStorageKey(): Expected `%s.%s` to be a linked ID, ' + 'was `%s`.', record[ID_KEY], storageKey, link);
  return link[REF_KEY];
}

/**
 * @public
 *
 * Get the value of a field as a reference to another record via field name and arg.
 * Throws if the field has a different type.
 */
function getLinkedRecordID(record, name, args) {
  var storageKey = require('./formatStorageKey')(name, args);
  return getLinkedRecordIDByStorageKey(record, storageKey);
}

/**
 * @public
 *
 * Get the value of a field as a list of references to other records. Throws if
 * the field has a different type.
 */
function getLinkedRecordIDsByStorageKey(record, storageKey) {
  var links = record[storageKey];
  if (links == null) {
    return links;
  }
  require('fbjs/lib/invariant')(typeof links === 'object' && Array.isArray(links[REFS_KEY]), 'RelayModernRecord.getLinkedRecordIDsByStorageKey(): Expected `%s.%s` to contain an array ' + 'of linked IDs, got `%s`.', record[ID_KEY], storageKey, (0, _stringify2['default'])(links));
  // assume items of the array are ids
  return links[REFS_KEY];
}

/**
 * @public
 *
 * Get the value of a field as a list of references to other records via field name and args.
 * Throws if the field has a different type.
 */
function getLinkedRecordIDs(record, name, args) {
  var storageKey = require('./formatStorageKey')(name, args);
  return getLinkedRecordIDsByStorageKey(record, storageKey);
}

/**
 * @public
 *
 * Compares the fields of a previous and new record, returning either the
 * previous record if all fields are equal or a new record (with merged fields)
 * if any fields have changed.
 */
function update(prevRecord, nextRecord) {
  var updated = void 0;
  var keys = (0, _keys2['default'])(nextRecord);
  for (var ii = 0; ii < keys.length; ii++) {
    var key = keys[ii];
    if (updated || !require('fbjs/lib/areEqual')(prevRecord[key], nextRecord[key])) {
      updated = updated || (0, _extends3['default'])({}, prevRecord);
      if (nextRecord[key] !== UNPUBLISH_FIELD_SENTINEL) {
        updated[key] = nextRecord[key];
      } else {
        delete updated[key];
      }
    }
  }
  return updated || prevRecord;
}

/**
 * @public
 *
 * Returns a new record with the contents of the given records. Fields in the
 * second record will overwrite identical fields in the first record.
 */
function merge(record1, record2) {
  return (0, _assign2['default'])({}, record1, record2);
}

/**
 * @public
 *
 * Prevent modifications to the record. Attempts to call `set*` functions on a
 * frozen record will fatal at runtime.
 */
function freeze(record) {
  require('./deepFreeze')(record);
}

/**
 * @public
 *
 * Set the value of a storageKey to a scalar.
 */
function setValue(record, storageKey, value) {
  record[storageKey] = value;
}

/**
 * @public
 *
 * Set the value of a field to a reference to another record.
 */
function setLinkedRecordID(record, storageKey, linkedID) {
  // See perf note above for why we aren't using computed property access.
  var link = {};
  link[REF_KEY] = linkedID;
  record[storageKey] = link;
}

/**
 * @public
 *
 * Set the value of a field to a list of references other records.
 */
function setLinkedRecordIDs(record, storageKey, linkedIDs) {
  // See perf note above for why we aren't using computed property access.
  var links = {};
  links[REFS_KEY] = linkedIDs;
  record[storageKey] = links;
}

var RelayRecordReader = {
  getType: getType,
  getDataID: getDataID,
  getValue: getValue,
  getLinkedRecordID: getLinkedRecordID,
  getLinkedRecordIDs: getLinkedRecordIDs
};

module.exports = (0, _extends3['default'])({}, RelayRecordReader, {
  clone: clone,
  copyFields: copyFields,
  create: create,
  freeze: freeze,
  getDataID: getDataID,
  getLinkedRecordIDByStorageKey: getLinkedRecordIDByStorageKey,
  getLinkedRecordIDsByStorageKey: getLinkedRecordIDsByStorageKey,
  getType: getType,
  getValueByStorageKey: getValueByStorageKey,
  merge: merge,
  setValue: setValue,
  setLinkedRecordID: setLinkedRecordID,
  setLinkedRecordIDs: setLinkedRecordIDs,
  update: update
});
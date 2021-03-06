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

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

var _promise2 = _interopRequireDefault(require('fbjs/lib/Promise'));

var _set2 = _interopRequireDefault(require('babel-runtime/core-js/set'));

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

    this._client = new (require('fb-watchman').Client)();
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
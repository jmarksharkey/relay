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

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

var _promise2 = _interopRequireDefault(require('fbjs/lib/Promise'));

var _set2 = _interopRequireDefault(require('babel-runtime/core-js/set'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('immutable'),
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

      var files = yield require('./RelayCodegenWatcher').queryFiles(parserConfig.baseDir, parserConfig.watchmanExpression, parserConfig.getFileFilter ? parserConfig.getFileFilter(parserConfig.baseDir) : anyFileFilter);
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

      yield require('./RelayCodegenWatcher').watchCompile(parserConfig.baseDir, parserConfig.watchmanExpression, parserConfig.getFileFilter ? parserConfig.getFileFilter(parserConfig.baseDir) : anyFileFilter, (() => {
        var _ref7 = (0, _asyncToGenerator3.default)(function* (files) {
          require('fbjs/lib/invariant')(_this4.parsers[parserName], 'Trying to watch an uncompiled parser config: %s', parserName);
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
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayFragmentSpecResolver
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./RelaySelector'),
    areEqualSelectors = _require.areEqualSelectors,
    getSelectorsFromObject = _require.getSelectorsFromObject;

/**
 * An implementation of the `FragmentSpecResolver` interface defined in
 * `RelayEnvironmentTypes`.
 *
 * This utility is implemented as an imperative, stateful API for performance
 * reasons: reusing previous resolvers, callback functions, and subscriptions
 * all helps to reduce object allocation and thereby decrease GC time.
 *
 * The `resolve()` function is also lazy and memoized: changes in the store mark
 * the resolver as stale and notify the caller, and the actual results are
 * recomputed the first time `resolve()` is called.
 */
var RelayFragmentSpecResolver = function () {
  function RelayFragmentSpecResolver(context, fragments, props, callback) {
    var _this = this;

    (0, _classCallCheck3['default'])(this, RelayFragmentSpecResolver);

    this._onChange = function () {
      _this._stale = true;
      _this._callback();
    };

    this._callback = callback;
    this._context = context;
    this._data = {};
    this._fragments = fragments;
    this._props = props;
    this._resolvers = {};
    this._stale = false;

    this.setProps(props);
  }

  RelayFragmentSpecResolver.prototype.dispose = function dispose() {
    require('fbjs/lib/forEachObject')(this._resolvers, disposeCallback);
  };

  RelayFragmentSpecResolver.prototype.resolve = function resolve() {
    var _this2 = this;

    if (this._stale) {
      // Avoid mapping the object multiple times, which could occur if data for
      // multiple keys changes in the same event loop.
      var prevData = this._data;
      var nextData = void 0;
      require('fbjs/lib/forEachObject')(this._resolvers, function (resolver, key) {
        var prevItem = prevData[key];
        if (resolver) {
          var nextItem = resolver.resolve();
          if (nextData || nextItem !== prevItem) {
            nextData = nextData || (0, _extends3['default'])({}, prevData);
            nextData[key] = nextItem;
          }
        } else {
          var prop = _this2._props[key];
          var _nextItem = prop !== undefined ? prop : null;
          if (nextData || !require('./isScalarAndEqual')(_nextItem, prevItem)) {
            nextData = nextData || (0, _extends3['default'])({}, prevData);
            nextData[key] = _nextItem;
          }
        }
      });
      this._data = nextData || prevData;
      this._stale = false;
    }
    return this._data;
  };

  RelayFragmentSpecResolver.prototype.setProps = function setProps(props) {
    var _this3 = this;

    var selectors = getSelectorsFromObject(this._context.variables, this._fragments, props);
    require('fbjs/lib/forEachObject')(selectors, function (selector, key) {
      var resolver = _this3._resolvers[key];
      if (selector == null) {
        if (resolver != null) {
          resolver.dispose();
        }
        resolver = null;
      } else if (Array.isArray(selector)) {
        if (resolver == null) {
          resolver = new SelectorListResolver(_this3._context.environment, selector, _this3._onChange);
        } else {
          require('fbjs/lib/invariant')(resolver instanceof SelectorListResolver, 'RelayFragmentSpecResolver: Expected prop `%s` to always be an array.', key);
          resolver.setSelectors(selector);
        }
      } else {
        if (resolver == null) {
          resolver = new SelectorResolver(_this3._context.environment, selector, _this3._onChange);
        } else {
          require('fbjs/lib/invariant')(resolver instanceof SelectorResolver, 'RelayFragmentSpecResolver: Expected prop `%s` to always be an object.', key);
          resolver.setSelector(selector);
        }
      }
      _this3._resolvers[key] = resolver;
    });
    this._props = props;
    this._stale = true;
  };

  RelayFragmentSpecResolver.prototype.setVariables = function setVariables(variables) {
    require('fbjs/lib/forEachObject')(this._resolvers, function (resolver) {
      if (resolver) {
        resolver.setVariables(variables);
      }
    });
    this._stale = true;
  };

  return RelayFragmentSpecResolver;
}();

/**
 * A resolver for a single Selector.
 */


var SelectorResolver = function () {
  function SelectorResolver(environment, selector, callback) {
    (0, _classCallCheck3['default'])(this, SelectorResolver);

    _initialiseProps.call(this);

    var snapshot = environment.lookup(selector);
    this._callback = callback;
    this._data = snapshot.data;
    this._environment = environment;
    this._selector = selector;
    this._subscription = environment.subscribe(snapshot, this._onChange);
  }

  SelectorResolver.prototype.dispose = function dispose() {
    if (this._subscription) {
      this._subscription.dispose();
      this._subscription = null;
    }
  };

  SelectorResolver.prototype.resolve = function resolve() {
    return this._data;
  };

  SelectorResolver.prototype.setSelector = function setSelector(selector) {
    if (this._subscription != null && areEqualSelectors(selector, this._selector)) {
      return;
    }
    this.dispose();
    var snapshot = this._environment.lookup(selector);
    this._data = snapshot.data;
    this._selector = selector;
    this._subscription = this._environment.subscribe(snapshot, this._onChange);
  };

  SelectorResolver.prototype.setVariables = function setVariables(variables) {
    // Note: in the classic implementation variables have to be merged because
    // they also contain root variables.
    var selector = (0, _extends3['default'])({}, this._selector, {
      variables: (0, _extends3['default'])({}, this._selector.variables, variables)
    });
    this.setSelector(selector);
  };

  return SelectorResolver;
}();

/**
 * A resolver for an array of Selectors.
 */


var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this._onChange = function (snapshot) {
    _this5._data = snapshot.data;
    _this5._callback();
  };
};

var SelectorListResolver = function () {
  function SelectorListResolver(environment, selectors, callback) {
    var _this4 = this;

    (0, _classCallCheck3['default'])(this, SelectorListResolver);

    this._onChange = function (data) {
      _this4._stale = true;
      _this4._callback();
    };

    this._callback = callback;
    this._data = [];
    this._environment = environment;
    this._resolvers = [];
    this._stale = true;

    this.setSelectors(selectors);
  }

  SelectorListResolver.prototype.dispose = function dispose() {
    this._resolvers.forEach(disposeCallback);
  };

  SelectorListResolver.prototype.resolve = function resolve() {
    if (this._stale) {
      // Avoid mapping the array multiple times, which could occur if data for
      // multiple indices changes in the same event loop.
      var prevData = this._data;
      var nextData = void 0;
      for (var ii = 0; ii < this._resolvers.length; ii++) {
        var prevItem = prevData[ii];
        var nextItem = this._resolvers[ii].resolve();
        if (nextData || nextItem !== prevItem) {
          nextData = nextData || prevData.slice(0, ii);
          nextData.push(nextItem);
        }
      }
      this._data = nextData || prevData;
      this._stale = false;
    }
    return this._data;
  };

  SelectorListResolver.prototype.setSelectors = function setSelectors(selectors) {
    while (this._resolvers.length > selectors.length) {
      var resolver = this._resolvers.pop();
      resolver.dispose();
    }
    for (var ii = 0; ii < selectors.length; ii++) {
      if (ii < this._resolvers.length) {
        this._resolvers[ii].setSelector(selectors[ii]);
      } else {
        this._resolvers[ii] = new SelectorResolver(this._environment, selectors[ii], this._onChange);
      }
    }
    this._stale = true;
  };

  SelectorListResolver.prototype.setVariables = function setVariables(variables) {
    this._resolvers.forEach(function (resolver) {
      return resolver.setVariables(variables);
    });
    this._stale = true;
  };

  return SelectorListResolver;
}();

function disposeCallback(disposable) {
  disposable && disposable.dispose();
}

module.exports = RelayFragmentSpecResolver;
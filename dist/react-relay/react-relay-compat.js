/**
 * Relay v1.0.0-rc.4
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fbjs/lib/invariant"), require("react"), require("babel-runtime/core-js/object/keys"), require("babel-runtime/helpers/extends"), require("fbjs/lib/sprintf"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/possibleConstructorReturn"), require("fbjs/lib/areEqual"), require("prop-types"), require("fbjs/lib/emptyFunction"), require("fbjs/lib/nullthrows"), require("fbjs/lib/removeFromArray"), require("fbjs/lib/warning"), require("relay-runtime"), require("babel-runtime/core-js/json/stringify"), require("babel-runtime/core-js/object/freeze"), require("babel-runtime/helpers/defineProperty"), require("fbjs/lib/forEachObject"), require("fbjs/lib/mapObject"), require("babel-runtime/core-js/object/get-own-property-names"), require("babel-runtime/core-js/object/is-frozen"), require("fbjs/lib/base62"));
	else if(typeof define === 'function' && define.amd)
		define(["fbjs/lib/invariant", "react", "babel-runtime/core-js/object/keys", "babel-runtime/helpers/extends", "fbjs/lib/sprintf", "babel-runtime/helpers/classCallCheck", "babel-runtime/helpers/inherits", "babel-runtime/helpers/possibleConstructorReturn", "fbjs/lib/areEqual", "prop-types", "fbjs/lib/emptyFunction", "fbjs/lib/nullthrows", "fbjs/lib/removeFromArray", "fbjs/lib/warning", "relay-runtime", "babel-runtime/core-js/json/stringify", "babel-runtime/core-js/object/freeze", "babel-runtime/helpers/defineProperty", "fbjs/lib/forEachObject", "fbjs/lib/mapObject", "babel-runtime/core-js/object/get-own-property-names", "babel-runtime/core-js/object/is-frozen", "fbjs/lib/base62"], factory);
	else if(typeof exports === 'object')
		exports["ReactRelayCompat"] = factory(require("fbjs/lib/invariant"), require("react"), require("babel-runtime/core-js/object/keys"), require("babel-runtime/helpers/extends"), require("fbjs/lib/sprintf"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/possibleConstructorReturn"), require("fbjs/lib/areEqual"), require("prop-types"), require("fbjs/lib/emptyFunction"), require("fbjs/lib/nullthrows"), require("fbjs/lib/removeFromArray"), require("fbjs/lib/warning"), require("relay-runtime"), require("babel-runtime/core-js/json/stringify"), require("babel-runtime/core-js/object/freeze"), require("babel-runtime/helpers/defineProperty"), require("fbjs/lib/forEachObject"), require("fbjs/lib/mapObject"), require("babel-runtime/core-js/object/get-own-property-names"), require("babel-runtime/core-js/object/is-frozen"), require("fbjs/lib/base62"));
	else
		root["ReactRelayCompat"] = factory(root["fbjs/lib/invariant"], root["react"], root["babel-runtime/core-js/object/keys"], root["babel-runtime/helpers/extends"], root["fbjs/lib/sprintf"], root["babel-runtime/helpers/classCallCheck"], root["babel-runtime/helpers/inherits"], root["babel-runtime/helpers/possibleConstructorReturn"], root["fbjs/lib/areEqual"], root["prop-types"], root["fbjs/lib/emptyFunction"], root["fbjs/lib/nullthrows"], root["fbjs/lib/removeFromArray"], root["fbjs/lib/warning"], root["relay-runtime"], root["babel-runtime/core-js/json/stringify"], root["babel-runtime/core-js/object/freeze"], root["babel-runtime/helpers/defineProperty"], root["fbjs/lib/forEachObject"], root["fbjs/lib/mapObject"], root["babel-runtime/core-js/object/get-own-property-names"], root["babel-runtime/core-js/object/is-frozen"], root["fbjs/lib/base62"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_30__, __WEBPACK_EXTERNAL_MODULE_31__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_33__, __WEBPACK_EXTERNAL_MODULE_34__, __WEBPACK_EXTERNAL_MODULE_53__, __WEBPACK_EXTERNAL_MODULE_54__, __WEBPACK_EXTERNAL_MODULE_55__) {
return /******/ (function(modules) { // webpackBootstrap
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
	 * @providesModule ReactRelayCompatPublic
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(24),
	    graphql = _require.graphql,
	    fetchQuery = _require.fetchQuery;

	/**
	 * The public interface to React Relay which supports a compatibility mode to
	 * continue to work with the classic React runtime.
	 */
	module.exports = {
	  QueryRenderer: __webpack_require__(37),
	  commitMutation: __webpack_require__(41).commitUpdate,
	  createFragmentContainer: __webpack_require__(39).createContainer,
	  createPaginationContainer: __webpack_require__(42).createContainer,
	  createRefetchContainer: __webpack_require__(43).createContainer,
	  fetchQuery: fetchQuery,
	  graphql: graphql,
	  injectDefaultVariablesProvider: __webpack_require__(9).injectDefaultVariablesProvider
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayPropTypes
	 * 
	 * @format
	 */

	'use strict';

	var RelayPropTypes = {
	  Container: function Container(props, propName, componentName) {
	    var component = props[propName];
	    if (component == null) {
	      return new Error(__webpack_require__(8)('Required prop `%s` was not specified in `%s`.', propName, componentName));
	    } else if (!__webpack_require__(50)(component)) {
	      return new Error(__webpack_require__(8)('Invalid prop `%s` supplied to `%s`, expected a RelayContainer.', propName, componentName));
	    }
	    return null;
	  },
	  Environment: function Environment(props, propName, componentName) {
	    var context = props[propName];
	    if (!__webpack_require__(18)(context) || !__webpack_require__(29)(context)) {
	      return new Error(__webpack_require__(8)('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object conforming to the `RelayEnvironment` interface.', propName, componentName, context));
	    }
	    return null;
	  },


	  QueryConfig: __webpack_require__(15).shape({
	    name: __webpack_require__(15).string.isRequired,
	    params: __webpack_require__(15).object.isRequired,
	    queries: __webpack_require__(15).object.isRequired
	  }),

	  ClassicRelay: function ClassicRelay(props, propName, componentName) {
	    var relay = props[propName];
	    if (!__webpack_require__(5)(relay) || !__webpack_require__(18)(relay.environment)) {
	      return new Error(__webpack_require__(8)('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object with a classic `environment` implementation and `variables`.', propName, componentName, relay));
	    }
	    return null;
	  },
	  Relay: function Relay(props, propName, componentName) {
	    var relay = props[propName];
	    if (!__webpack_require__(5)(relay)) {
	      return new Error(__webpack_require__(8)('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object with an `environment` and `variables`.', propName, componentName, relay));
	    }
	    return null;
	  }
	};

	module.exports = RelayPropTypes;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayContainerUtils
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * @internal
	 *
	 * Helper for checking if this is a React Component
	 * created with React.Component or React.createClass().
	 */

	function isReactComponent(component) {
	  return !!(component && typeof component.prototype === 'object' && component.prototype && component.prototype.isReactComponent);
	}

	function getReactComponent(Component) {
	  if (isReactComponent(Component)) {
	    return Component;
	  } else {
	    return null;
	  }
	}

	function getComponentName(Component) {
	  var name = void 0;
	  var ComponentClass = getReactComponent(Component);
	  if (ComponentClass) {
	    name = ComponentClass.displayName || ComponentClass.name;
	  } else if (typeof Component === 'function') {
	    // This is a stateless functional component.
	    name = Component.displayName || Component.name || 'StatelessComponent';
	  } else {
	    name = 'ReactElement';
	  }
	  return name;
	}

	function getContainerName(Component) {
	  return 'Relay(' + getComponentName(Component) + ')';
	}

	module.exports = {
	  getComponentName: getComponentName,
	  getContainerName: getContainerName,
	  getReactComponent: getReactComponent
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isRelayContext
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Determine if the input is a plain object that matches the `RelayContext`
	 * type defined in `RelayEnvironmentTypes`.
	 */
	function isRelayContext(context) {
	  return typeof context === 'object' && context !== null && !Array.isArray(context) && __webpack_require__(29)(context.environment) && __webpack_require__(51)(context.variables);
	}

	module.exports = isRelayContext;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactRelayCompatContainerBuilder
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(7));

	var _keys2 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(4),
	    getComponentName = _require.getComponentName,
	    getContainerName = _require.getContainerName;

	var containerContextTypes = {
	  relay: __webpack_require__(3).Relay
	};

	/**
	 * `injectDefaultVariablesProvider()` allows classic versions of a container to
	 * inject default variable values for a fragment via the arguments of any
	 * references to it. This is useful for fragments that need to reference
	 * global query constants (e.g. the device pixel ratio) but may be included
	 * in classic queries that do not define the necessary param.
	 */
	var injectedDefaultVariablesProvider = null;
	function injectDefaultVariablesProvider(variablesProvider) {
	  __webpack_require__(1)(!injectedDefaultVariablesProvider, 'injectDefaultVariablesProvider must be called no more than once.');
	  injectedDefaultVariablesProvider = variablesProvider;
	}

	/**
	 * Creates a component class whose instances adapt to the
	 * `context.relay.environment` in which they are rendered and which have the
	 * necessary static methods (`getFragment()` etc) to be composed within classic
	 * `Relay.Containers`.
	 *
	 * The returned constructor uses the given `createContainerForEnvironment` to
	 * construct a new container type whenever a new environment is encountered;
	 * while the constructor is being used for the same environment (the expected
	 * majority case) this value is memoized to avoid creating unnecessary extra
	 * container definitions or unwrapping the environment-specific fragment
	 * defintions unnecessarily.
	 */
	function buildCompatContainer(ComponentClass, fragmentSpec, createContainerWithFragments) {
	  // Sanity-check user-defined fragment input
	  var containerName = getContainerName(ComponentClass);
	  __webpack_require__(28)(getComponentName(ComponentClass), fragmentSpec);

	  var injectedDefaultVariables = null;
	  function getDefaultVariables() {
	    if (injectedDefaultVariables == null) {
	      injectedDefaultVariables = injectedDefaultVariablesProvider ? injectedDefaultVariablesProvider() : {};
	    }
	    return injectedDefaultVariables;
	  }

	  // Similar to RelayContainer.getFragment(), except that this returns a
	  // FragmentSpread in order to support referencing root variables.
	  function getFragment(fragmentName, variableMapping) {
	    var taggedNode = fragmentSpec[fragmentName];
	    __webpack_require__(1)(taggedNode, 'ReactRelayCompatContainerBuilder: Expected a fragment named `%s` to be defined ' + 'on `%s`.', fragmentName, containerName);
	    var fragment = __webpack_require__(26).getClassicFragment(taggedNode);

	    var args = (0, _extends3['default'])({}, getDefaultVariables(), variableMapping || {});

	    return {
	      kind: 'FragmentSpread',
	      args: args,
	      fragment: fragment
	    };
	  }

	  function hasVariable(variableName) {
	    return (0, _keys2['default'])(fragmentSpec).some(function (fragmentName) {
	      var fragment = __webpack_require__(26).getClassicFragment(fragmentSpec[fragmentName]);
	      return fragment.argumentDefinitions.some(function (argDef) {
	        return argDef.name === variableName;
	      });
	    });
	  }

	  // Memoize a container for the last environment instance encountered
	  var environment = void 0;
	  var Container = void 0;
	  function ContainerConstructor(props, context) {
	    if (Container == null || context.relay.environment !== environment) {
	      environment = context.relay.environment;
	      var getFragmentFromTag = environment.unstable_internal.getFragment;

	      var _fragments = __webpack_require__(34)(fragmentSpec, getFragmentFromTag);
	      Container = createContainerWithFragments(ComponentClass, _fragments);
	      __webpack_require__(45).proxyMethods(Container, ComponentClass);
	    }
	    return new Container(props, context);
	  }
	  ContainerConstructor.contextTypes = containerContextTypes;
	  ContainerConstructor.displayName = containerName;

	  // Classic container static methods
	  ContainerConstructor.getFragment = getFragment;
	  ContainerConstructor.getFragmentNames = function () {
	    return (0, _keys2['default'])(fragmentSpec);
	  };
	  ContainerConstructor.hasFragment = function (name) {
	    return fragmentSpec.hasOwnProperty(name);
	  };
	  ContainerConstructor.hasVariable = hasVariable;

	  // Create a back-reference from the Component to the Container for cases
	  // where a Classic Component might refer to itself, expecting a Container.
	  ComponentClass.__container__ = ContainerConstructor;

	  return ContainerConstructor;
	}

	module.exports = { injectDefaultVariablesProvider: injectDefaultVariablesProvider, buildCompatContainer: buildCompatContainer };

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
	 * @providesModule RelayProfiler
	 * 
	 * @format
	 */

	'use strict';

	var aggregateHandlersByName = {
	  '*': []
	};
	var profileHandlersByName = {
	  '*': []
	};

	var NOT_INVOKED = {};
	var defaultProfiler = { stop: __webpack_require__(20) };
	var shouldInstrument = function shouldInstrument(name) {
	  if (true) {
	    return true;
	  }
	  return name.charAt(0) !== '@';
	};

	/**
	 * @public
	 *
	 * Instruments methods to allow profiling various parts of Relay. Profiling code
	 * in Relay consists of three steps:
	 *
	 *  - Instrument the function to be profiled.
	 *  - Attach handlers to the instrumented function.
	 *  - Run the code which triggers the handlers.
	 *
	 * Handlers attached to instrumented methods are called with an instrumentation
	 * name and a callback that must be synchronously executed:
	 *
	 *   instrumentedMethod.attachHandler(function(name, callback) {
	 *     const start = performance.now();
	 *     callback();
	 *     console.log('Duration', performance.now() - start);
	 *   });
	 *
	 * Handlers for profiles are callbacks that return a stop method:
	 *
	 *   RelayProfiler.attachProfileHandler('profileName', (name, state) => {
	 *     const start = performance.now();
	 *     return function stop(name, state) {
	 *       console.log(`Duration (${name})`, performance.now() - start);
	 *     }
	 *   });
	 *
	 * In order to reduce the impact on performance in production, instrumented
	 * methods and profilers with names that begin with `@` will only be measured
	 * if `__DEV__` is true. This should be used for very hot functions.
	 */
	var RelayProfiler = {
	  /**
	   * Instruments methods on a class or object. This re-assigns the method in
	   * order to preserve function names in stack traces (which are detected by
	   * modern debuggers via heuristics). Example usage:
	   *
	   *   const RelayStore = { primeCache: function() {...} };
	   *   RelayProfiler.instrumentMethods(RelayStore, {
	   *     primeCache: 'RelayStore.primeCache'
	   *   });
	   *
	   *   RelayStore.primeCache.attachHandler(...);
	   *
	   * As a result, the methods will be replaced by wrappers that provide the
	   * `attachHandler` and `detachHandler` methods.
	   */
	  instrumentMethods: function instrumentMethods(object, names) {
	    __webpack_require__(33)(names, function (name, key) {
	      object[key] = RelayProfiler.instrument(name, object[key]);
	    });
	  },


	  /**
	   * Wraps the supplied function with one that provides the `attachHandler` and
	   * `detachHandler` methods. Example usage:
	   *
	   *   const printRelayQuery =
	   *     RelayProfiler.instrument('printRelayQuery', printRelayQuery);
	   *
	   *   printRelayQuery.attachHandler(...);
	   *
	   * NOTE: The instrumentation assumes that no handlers are attached or detached
	   * in the course of executing another handler.
	   */
	  instrument: function instrument(name, originalFunction) {
	    if (!shouldInstrument(name)) {
	      originalFunction.attachHandler = __webpack_require__(20);
	      originalFunction.detachHandler = __webpack_require__(20);
	      return originalFunction;
	    }
	    if (!aggregateHandlersByName.hasOwnProperty(name)) {
	      aggregateHandlersByName[name] = [];
	    }
	    var catchallHandlers = aggregateHandlersByName['*'];
	    var aggregateHandlers = aggregateHandlersByName[name];
	    var handlers = [];
	    var contexts = [];
	    var invokeHandlers = function invokeHandlers() {
	      var context = contexts[contexts.length - 1];
	      if (context[0]) {
	        context[0]--;
	        catchallHandlers[context[0]](name, invokeHandlers);
	      } else if (context[1]) {
	        context[1]--;
	        aggregateHandlers[context[1]](name, invokeHandlers);
	      } else if (context[2]) {
	        context[2]--;
	        handlers[context[2]](name, invokeHandlers);
	      } else {
	        context[5] = originalFunction.apply(context[3], context[4]);
	      }
	    };
	    var instrumentedCallback = function instrumentedCallback() {
	      var returnValue = void 0;
	      if (aggregateHandlers.length === 0 && handlers.length === 0 && catchallHandlers.length === 0) {
	        returnValue = originalFunction.apply(this, arguments);
	      } else {
	        contexts.push([catchallHandlers.length, aggregateHandlers.length, handlers.length, this, arguments, NOT_INVOKED]);
	        invokeHandlers();
	        var context = contexts.pop();
	        returnValue = context[5];
	        if (returnValue === NOT_INVOKED) {
	          throw new Error('RelayProfiler: Handler did not invoke original function.');
	        }
	      }
	      return returnValue;
	    };
	    instrumentedCallback.attachHandler = function (handler) {
	      handlers.push(handler);
	    };
	    instrumentedCallback.detachHandler = function (handler) {
	      __webpack_require__(22)(handlers, handler);
	    };
	    instrumentedCallback.displayName = '(instrumented ' + name + ')';
	    return instrumentedCallback;
	  },


	  /**
	   * Attaches a handler to all methods instrumented with the supplied name.
	   *
	   *   function createRenderer() {
	   *     return RelayProfiler.instrument('render', function() {...});
	   *   }
	   *   const renderA = createRenderer();
	   *   const renderB = createRenderer();
	   *
	   *   // Only profiles `renderA`.
	   *   renderA.attachHandler(...);
	   *
	   *   // Profiles both `renderA` and `renderB`.
	   *   RelayProfiler.attachAggregateHandler('render', ...);
	   *
	   */
	  attachAggregateHandler: function attachAggregateHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (!aggregateHandlersByName.hasOwnProperty(name)) {
	        aggregateHandlersByName[name] = [];
	      }
	      aggregateHandlersByName[name].push(handler);
	    }
	  },


	  /**
	   * Detaches a handler attached via `attachAggregateHandler`.
	   */
	  detachAggregateHandler: function detachAggregateHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (aggregateHandlersByName.hasOwnProperty(name)) {
	        __webpack_require__(22)(aggregateHandlersByName[name], handler);
	      }
	    }
	  },


	  /**
	   * Instruments profiling for arbitrarily asynchronous code by a name.
	   *
	   *   const timerProfiler = RelayProfiler.profile('timeout');
	   *   setTimeout(function() {
	   *     timerProfiler.stop();
	   *   }, 1000);
	   *
	   *   RelayProfiler.attachProfileHandler('timeout', ...);
	   *
	   * Arbitrary state can also be passed into `profile` as a second argument. The
	   * attached profile handlers will receive this as the second argument.
	   */
	  profile: function profile(name, state) {
	    var hasCatchAllHandlers = profileHandlersByName['*'].length > 0;
	    var hasNamedHandlers = profileHandlersByName.hasOwnProperty(name);
	    if (hasNamedHandlers || hasCatchAllHandlers) {
	      var profileHandlers = hasNamedHandlers && hasCatchAllHandlers ? profileHandlersByName[name].concat(profileHandlersByName['*']) : hasNamedHandlers ? profileHandlersByName[name] : profileHandlersByName['*'];
	      var stopHandlers = void 0;
	      for (var ii = profileHandlers.length - 1; ii >= 0; ii--) {
	        var profileHandler = profileHandlers[ii];
	        var stopHandler = profileHandler(name, state);
	        stopHandlers = stopHandlers || [];
	        stopHandlers.unshift(stopHandler);
	      }
	      return {
	        stop: function stop() {
	          if (stopHandlers) {
	            stopHandlers.forEach(function (stopHandler) {
	              return stopHandler();
	            });
	          }
	        }
	      };
	    }
	    return defaultProfiler;
	  },


	  /**
	   * Attaches a handler to profiles with the supplied name. You can also
	   * attach to the special name '*' which is a catch all.
	   */
	  attachProfileHandler: function attachProfileHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (!profileHandlersByName.hasOwnProperty(name)) {
	        profileHandlersByName[name] = [];
	      }
	      profileHandlersByName[name].push(handler);
	    }
	  },


	  /**
	   * Detaches a handler attached via `attachProfileHandler`.
	   */
	  detachProfileHandler: function detachProfileHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (profileHandlersByName.hasOwnProperty(name)) {
	        __webpack_require__(22)(profileHandlersByName[name], handler);
	      }
	    }
	  }
	};

	module.exports = RelayProfiler;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactRelayContainerProfiler
	 * 
	 * @format
	 */

	'use strict';

	function profileContainer(Container, containerName) {
	  __webpack_require__(10).instrumentMethods(Container.prototype, {
	    constructor: containerName + '.prototype.constructor',
	    componentWillReceiveProps: containerName + '.prototype.componentWillReceiveProps',
	    componentWillUnmount: containerName + '.prototype.componentWillUnmount',
	    shouldComponentUpdate: containerName + '.prototype.shouldComponentUpdate'
	  });
	}

	module.exports = { profileContainer: profileContainer };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule buildReactRelayContainer
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(4),
	    getComponentName = _require.getComponentName,
	    getContainerName = _require.getContainerName;

	var containerContextTypes = {
	  relay: __webpack_require__(3).Relay
	};

	/**
	 * Creates a component class whose instances adapt to the
	 * `context.relay.environment` in which they are rendered and which have the
	 * necessary static methods (`getFragment()` etc) to be composed within classic
	 * `Relay.Containers`.
	 */
	function buildReactRelayContainer(ComponentClass, fragmentSpec, createContainerWithFragments) {
	  // Sanity-check user-defined fragment input
	  var containerName = getContainerName(ComponentClass);
	  __webpack_require__(28)(getComponentName(ComponentClass), fragmentSpec);

	  // Memoize a container for the last environment instance encountered
	  var environment = void 0;
	  var Container = void 0;
	  function ContainerConstructor(props, context) {
	    if (Container == null || context.relay.environment !== environment) {
	      environment = context.relay.environment;
	      var getFragmentFromTag = environment.unstable_internal.getFragment;

	      var _fragments = __webpack_require__(34)(fragmentSpec, getFragmentFromTag);
	      Container = createContainerWithFragments(ComponentClass, _fragments);
	    }
	    return new Container(props, context);
	  }
	  ContainerConstructor.contextTypes = containerContextTypes;
	  ContainerConstructor.displayName = containerName;

	  return ContainerConstructor;
	}

	module.exports = buildReactRelayContainer;

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isClassicRelayEnvironment
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Determine if a given value is an object that implements the `RelayEnvironment`
	 * interface.
	 */

	function isClassicRelayEnvironment(environment) {
	  return typeof environment === 'object' && environment !== null && typeof environment.applyMutation === 'function' && typeof environment.sendMutation === 'function' && typeof environment.forceFetch === 'function' && typeof environment.getFragmentResolver === 'function' && typeof environment.getStoreData === 'function' && typeof environment.primeCache === 'function';
	}

	module.exports = isClassicRelayEnvironment;

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @providesModule isScalarAndEqual
	 * @format
	 */

	'use strict';

	/**
	 * A fast test to determine if two values are equal scalars:
	 * - compares scalars such as booleans, strings, numbers by value
	 * - compares functions by identity
	 * - returns false for complex values, since these cannot be cheaply tested for
	 *   equality (use `areEquals` instead)
	 */

	function isScalarAndEqual(valueA, valueB) {
	  return valueA === valueB && (valueA === null || typeof valueA !== 'object');
	}

	module.exports = isScalarAndEqual;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

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
	 * @providesModule QueryBuilder
	 * 
	 * @format
	 */

	'use strict';

	var _freeze2 = _interopRequireDefault(__webpack_require__(31));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var EMPTY_CALLS = [];
	var EMPTY_CHILDREN = [];
	var EMPTY_DIRECTIVES = [];
	var EMPTY_METADATA = {};

	if (true) {
	  (0, _freeze2['default'])(EMPTY_CALLS);
	  (0, _freeze2['default'])(EMPTY_CHILDREN);
	  (0, _freeze2['default'])(EMPTY_DIRECTIVES);
	  (0, _freeze2['default'])(EMPTY_METADATA);
	}

	/**
	 * @internal
	 *
	 * Helper methods for constructing concrete query objects.
	 */
	var QueryBuilder = {
	  createBatchCallVariable: function createBatchCallVariable(sourceQueryID, jsonPath) {
	    return {
	      kind: 'BatchCallVariable',
	      sourceQueryID: sourceQueryID,
	      jsonPath: jsonPath
	    };
	  },
	  createCall: function createCall(name, value, type) {
	    return {
	      kind: 'Call',
	      name: name,
	      metadata: {
	        type: type || null
	      },
	      value: value
	    };
	  },
	  createCallValue: function createCallValue(callValue) {
	    return {
	      kind: 'CallValue',
	      callValue: callValue
	    };
	  },
	  createCallVariable: function createCallVariable(callVariableName) {
	    return {
	      kind: 'CallVariable',
	      callVariableName: callVariableName
	    };
	  },
	  createDirective: function createDirective(name, args) {
	    return {
	      args: args,
	      kind: 'Directive',
	      name: name
	    };
	  },
	  createDirectiveArgument: function createDirectiveArgument(name, value) {
	    return {
	      name: name,
	      value: value
	    };
	  },
	  createField: function createField(partialField) {
	    var partialMetadata = partialField.metadata || EMPTY_METADATA;
	    return {
	      alias: partialField.alias,
	      calls: partialField.calls || EMPTY_CALLS,
	      children: partialField.children || EMPTY_CHILDREN,
	      directives: partialField.directives || EMPTY_DIRECTIVES,
	      fieldName: partialField.fieldName,
	      kind: 'Field',
	      metadata: {
	        canHaveSubselections: !!partialMetadata.canHaveSubselections,
	        inferredRootCallName: partialMetadata.inferredRootCallName,
	        inferredPrimaryKey: partialMetadata.inferredPrimaryKey,
	        isConnection: !!partialMetadata.isConnection,
	        isFindable: !!partialMetadata.isFindable,
	        isGenerated: !!partialMetadata.isGenerated,
	        isPlural: !!partialMetadata.isPlural,
	        isRequisite: !!partialMetadata.isRequisite,
	        isAbstract: !!partialMetadata.isAbstract
	      },
	      type: partialField.type
	    };
	  },
	  createFragment: function createFragment(partialFragment) {
	    var metadata = partialFragment.metadata || EMPTY_METADATA;
	    return {
	      children: partialFragment.children || EMPTY_CHILDREN,
	      directives: partialFragment.directives || EMPTY_DIRECTIVES,
	      id: __webpack_require__(49)(),
	      kind: 'Fragment',
	      metadata: {
	        isAbstract: !!metadata.isAbstract,
	        pattern: !!metadata.pattern,
	        plural: !!metadata.plural },
	      name: partialFragment.name,
	      type: partialFragment.type
	    };
	  },
	  createMutation: function createMutation(partialMutation) {
	    var metadata = partialMutation.metadata || EMPTY_METADATA;
	    return {
	      calls: partialMutation.calls || EMPTY_CALLS,
	      children: partialMutation.children || EMPTY_CHILDREN,
	      directives: partialMutation.directives || EMPTY_DIRECTIVES,
	      kind: 'Mutation',
	      metadata: {
	        inputType: metadata.inputType
	      },
	      name: partialMutation.name,
	      responseType: partialMutation.responseType
	    };
	  },
	  createQuery: function createQuery(partialQuery) {
	    var metadata = partialQuery.metadata || EMPTY_METADATA;
	    var calls = [];
	    var identifyingArgName = metadata.identifyingArgName;
	    if (identifyingArgName == null && __webpack_require__(27).isNodeRootCall(partialQuery.fieldName)) {
	      identifyingArgName = __webpack_require__(27).ID;
	    }
	    if (identifyingArgName != null) {
	      __webpack_require__(23)(partialQuery.identifyingArgValue != null, 'QueryBuilder.createQuery(): An argument value may be required for ' + 'query `%s(%s: ???)`.', partialQuery.fieldName, identifyingArgName);
	      calls = [QueryBuilder.createCall(identifyingArgName, partialQuery.identifyingArgValue, metadata.identifyingArgType)];
	    }
	    return {
	      calls: calls,
	      children: partialQuery.children || EMPTY_CHILDREN,
	      directives: partialQuery.directives || EMPTY_DIRECTIVES,
	      fieldName: partialQuery.fieldName,
	      isDeferred: !!(partialQuery.isDeferred || metadata.isDeferred),
	      kind: 'Query',
	      metadata: {
	        identifyingArgName: identifyingArgName,
	        identifyingArgType: metadata.identifyingArgType,
	        isAbstract: !!metadata.isAbstract,
	        isPlural: !!metadata.isPlural
	      },
	      name: partialQuery.name,
	      type: partialQuery.type
	    };
	  },
	  createSubscription: function createSubscription(partialSubscription) {
	    var metadata = partialSubscription.metadata || EMPTY_METADATA;
	    return {
	      calls: partialSubscription.calls || EMPTY_CALLS,
	      children: partialSubscription.children || EMPTY_CHILDREN,
	      directives: partialSubscription.directives || EMPTY_DIRECTIVES,
	      kind: 'Subscription',
	      metadata: {
	        inputType: metadata.inputType
	      },
	      name: partialSubscription.name,
	      responseType: partialSubscription.responseType
	    };
	  },
	  getBatchCallVariable: function getBatchCallVariable(node) {
	    if (isConcreteKind(node, 'BatchCallVariable')) {
	      return node;
	    }
	  },
	  getCallVariable: function getCallVariable(node) {
	    if (isConcreteKind(node, 'CallVariable')) {
	      return node;
	    }
	  },
	  getField: function getField(node) {
	    if (isConcreteKind(node, 'Field')) {
	      return node;
	    }
	  },
	  getFragment: function getFragment(node) {
	    if (isConcreteKind(node, 'Fragment')) {
	      return node;
	    }
	  },
	  getFragmentDefinition: function getFragmentDefinition(node) {
	    if (isConcreteKind(node, 'FragmentDefinition')) {
	      return node;
	    }
	  },
	  getFragmentSpread: function getFragmentSpread(node) {
	    if (isConcreteKind(node, 'FragmentSpread')) {
	      return node;
	    }
	  },
	  getOperationDefinition: function getOperationDefinition(node) {
	    if (isConcreteKind(node, 'OperationDefinition')) {
	      return node;
	    }
	  },
	  getMutation: function getMutation(node) {
	    if (isConcreteKind(node, 'Mutation')) {
	      return node;
	    }
	  },
	  getQuery: function getQuery(node) {
	    if (isConcreteKind(node, 'Query')) {
	      return node;
	    }
	  },
	  getSubscription: function getSubscription(node) {
	    if (isConcreteKind(node, 'Subscription')) {
	      return node;
	    }
	  }
	};

	function isConcreteKind(node, kind) {
	  return typeof node === 'object' && node !== null && node.kind === kind;
	}

	module.exports = QueryBuilder;

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
	 * @providesModule RelayGraphQLTag
	 * 
	 * @format
	 */

	'use strict';

	var _stringify2 = _interopRequireDefault(__webpack_require__(30));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Runtime function to correspond to the `graphql` tagged template function.
	 * All calls to this function should be transformed by the plugin.
	 */
	function graphql() {
	  __webpack_require__(1)(false, 'graphql: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `graphql`.');
	}

	/**
	 * Variant of the `graphql` tag that enables experimental features.
	 */
	graphql.experimental = function () {
	  __webpack_require__(1)(false, 'graphql.experimental: Unexpected invocation at runtime. Either the ' + 'Babel transform was not set up, or it failed to identify this call ' + 'site. Make sure it is being used verbatim as `graphql.experimental`.');
	};

	var CLASSIC_NODE = '__classic_node__';

	/**
	 * Memoizes the results of executing the `.classic()` functions on
	 * graphql`...` tagged expressions. Memoization allows the framework to use
	 * object equality checks to compare fragments (useful, for example, when
	 * comparing two `Selector`s to see if they select the same data).
	 */
	function getClassicNode(taggedNode) {
	  var concreteNode = taggedNode[CLASSIC_NODE];
	  if (concreteNode == null) {
	    var fn = taggedNode.classic;
	    __webpack_require__(1)(typeof fn === 'function', 'RelayGraphQLTag: Expected a graphql literal (in compat mode), got `%s`.', (0, _stringify2['default'])(taggedNode));
	    concreteNode = fn();
	    taggedNode[CLASSIC_NODE] = concreteNode;
	  }
	  return concreteNode;
	}

	function getClassicFragment(taggedNode) {
	  var concreteNode = getClassicNode(taggedNode);
	  var fragment = __webpack_require__(25).getFragmentDefinition(concreteNode);
	  __webpack_require__(1)(fragment, 'RelayGraphQLTag: Expected a fragment, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode);
	  return fragment;
	}

	function getClassicOperation(taggedNode) {
	  var concreteNode = getClassicNode(taggedNode);
	  var operation = __webpack_require__(25).getOperationDefinition(concreteNode);
	  __webpack_require__(1)(operation, 'RelayGraphQLTag: Expected an operation, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode);
	  return operation;
	}

	module.exports = {
	  getClassicFragment: getClassicFragment,
	  getClassicOperation: getClassicOperation,
	  graphql: graphql
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
	 * @providesModule RelayNodeInterface
	 * 
	 * @format
	 */

	'use strict';

	var getResultsFromPayloadImpl = getResultsFromPayload;

	/**
	 * @internal
	 *
	 * Defines logic relevant to the informal "Node" GraphQL interface.
	 */
	var RelayNodeInterface = {
	  ANY_TYPE: '__any',
	  ID: 'id',
	  ID_TYPE: 'ID!',
	  NODE: 'node',
	  NODE_TYPE: 'Node',
	  NODES: 'nodes',
	  TYPENAME: '__typename',

	  isNodeRootCall: function isNodeRootCall(fieldName) {
	    return fieldName === RelayNodeInterface.NODE || fieldName === RelayNodeInterface.NODES;
	  },
	  getResultsFromPayload: function getResultsFromPayload(query, payload) {
	    return getResultsFromPayloadImpl(query, payload);
	  },


	  /**
	   * Allow for injecting custom behavior for getResultsFromPayload.
	   */
	  injectGetResultsFromPayloadImpl: function injectGetResultsFromPayloadImpl(impl) {
	    getResultsFromPayloadImpl = impl;
	  }
	};

	function getResultsFromPayload(query, payload) {
	  var results = [];

	  var rootBatchCall = query.getBatchCall();
	  if (rootBatchCall) {
	    getPayloadRecords(query, payload).forEach(function (result) {
	      if (typeof result !== 'object' || !result) {
	        return;
	      }
	      var dataID = result[RelayNodeInterface.ID];
	      __webpack_require__(1)(typeof dataID === 'string', 'RelayNodeInterface.getResultsFromPayload(): Unable to write ' + 'result with no `%s` field for query, `%s`.', RelayNodeInterface.ID, query.getName());
	      results.push({
	        result: result,
	        rootCallInfo: {
	          storageKey: RelayNodeInterface.NODE,
	          identifyingArgKey: dataID,
	          identifyingArgValue: dataID
	        }
	      });
	    });
	  } else {
	    var records = getPayloadRecords(query, payload);
	    var ii = 0;
	    var _storageKey = query.getStorageKey();
	    __webpack_require__(48)(query, function (_ref) {
	      var identifyingArgKey = _ref.identifyingArgKey,
	          identifyingArgValue = _ref.identifyingArgValue;

	      var result = records[ii++];
	      results.push({
	        result: result,
	        rootCallInfo: { storageKey: _storageKey, identifyingArgKey: identifyingArgKey, identifyingArgValue: identifyingArgValue }
	      });
	    });
	  }

	  return results;
	}

	function getPayloadRecords(query, payload) {
	  var fieldName = query.getFieldName();
	  var identifyingArg = query.getIdentifyingArg();
	  var identifyingArgValue = identifyingArg && identifyingArg.value || null;
	  var records = payload[fieldName];
	  if (!query.getBatchCall()) {
	    if (Array.isArray(identifyingArgValue)) {
	      __webpack_require__(1)(Array.isArray(records), 'RelayNodeInterface: Expected payload for root field `%s` to be ' + 'an array with %s results, instead received a single non-array result.', fieldName, identifyingArgValue.length);
	      __webpack_require__(1)(records.length === identifyingArgValue.length, 'RelayNodeInterface: Expected payload for root field `%s` to be ' + 'an array with %s results, instead received an array with %s results.', fieldName, identifyingArgValue.length, records.length);
	    } else if (Array.isArray(records)) {
	      __webpack_require__(1)(false, 'RelayNodeInterface: Expected payload for root field `%s` to be ' + 'a single non-array result, instead received an array with %s results.', fieldName, records.length);
	    }
	  }
	  return Array.isArray(records) ? records : [records || null];
	}

	module.exports = RelayNodeInterface;

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
	 * @providesModule assertFragmentMap
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Fail fast if the user supplies invalid fragments as input.
	 */
	function assertFragmentMap(componentName, fragments) {
	  __webpack_require__(1)(fragments && typeof fragments === 'object', 'Could not create Relay Container for `%s`. ' + 'Expected a set of GraphQL fragments, got `%s` instead.', componentName, fragments);

	  __webpack_require__(33)(fragments, function (fragment, key) {
	    __webpack_require__(1)(fragment && (typeof fragment === 'object' || typeof fragment === 'function'), 'Could not create Relay Container for `%s`. ' + 'The value of fragment `%s` was expected to be a fragment, got `%s` instead.', componentName, key, fragment);
	  });
	}

	module.exports = assertFragmentMap;

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isRelayEnvironment
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Determine if a given value is an object that implements the `Environment`
	 * interface defined in `RelayEnvironmentTypes`.
	 */

	function isRelayEnvironment(environment) {
	  return typeof environment === 'object' && environment !== null &&
	  // TODO: add applyMutation/sendMutation once ready in both cores
	  typeof environment.lookup === 'function' && typeof environment.retain === 'function' && typeof environment.sendQuery === 'function' && typeof environment.streamQuery === 'function' && typeof environment.subscribe === 'function';
	}

	module.exports = isRelayEnvironment;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_30__;

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_34__;

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
	 * @providesModule ReactRelayFragmentContainer
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(7));

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(11));

	var _possibleConstructorReturn3 = _interopRequireDefault(__webpack_require__(13));

	var _inherits3 = _interopRequireDefault(__webpack_require__(12));

	var _keys2 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(16),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(4),
	    getComponentName = _require2.getComponentName,
	    getReactComponent = _require2.getReactComponent;

	var containerContextTypes = {
	  relay: __webpack_require__(3).Relay
	};

	/**
	 * Composes a React component class, returning a new class that intercepts
	 * props, resolving them with the provided fragments and subscribing for
	 * updates.
	 */
	function createContainerWithFragments(Component, fragments) {
	  var ComponentClass = getReactComponent(Component);
	  var componentName = getComponentName(Component);
	  var containerName = 'Relay(' + componentName + ')';

	  var Container = function (_React$Component) {
	    (0, _inherits3['default'])(Container, _React$Component);

	    function Container(props, context) {
	      (0, _classCallCheck3['default'])(this, Container);

	      var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	      _this._handleFragmentDataUpdate = function () {
	        var data = _this._resolver.resolve();
	        var profiler = __webpack_require__(10).profile('ReactRelayFragmentContainer.handleFragmentDataUpdate');
	        _this.setState({ data: data }, profiler.stop);
	      };

	      var relay = assertRelayContext(context.relay);
	      var createFragmentSpecResolver = relay.environment.unstable_internal.createFragmentSpecResolver;

	      _this._resolver = createFragmentSpecResolver(relay, fragments, props, _this._handleFragmentDataUpdate);
	      _this.state = {
	        data: _this._resolver.resolve(),
	        relayProp: {
	          environment: relay.environment
	        }
	      };
	      return _this;
	    }

	    /**
	     * When new props are received, read data for the new props and subscribe
	     * for updates. Props may be the same in which case previous data and
	     * subscriptions can be reused.
	     */


	    Container.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
	      var context = __webpack_require__(21)(nextContext);
	      var relay = assertRelayContext(context.relay);
	      if (relay !== this.context.relay) {
	        var createFragmentSpecResolver = relay.environment.unstable_internal.createFragmentSpecResolver;

	        this._resolver.dispose();
	        this._resolver = createFragmentSpecResolver(relay, fragments, nextProps, this._handleFragmentDataUpdate);
	        var _relayProp = {
	          environment: relay.environment
	        };
	        this.setState({ relayProp: _relayProp });
	      } else {
	        this._resolver.setProps(nextProps);
	      }
	      var data = this._resolver.resolve();
	      if (data !== this.state.data) {
	        this.setState({ data: data });
	      }
	    };

	    Container.prototype.componentWillUnmount = function componentWillUnmount() {
	      this._resolver.dispose();
	    };

	    Container.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // Short-circuit if any Relay-related data has changed
	      if (nextContext.relay !== this.context.relay || nextState.data !== this.state.data) {
	        return true;
	      }
	      // Otherwise, for convenience short-circuit if all non-Relay props
	      // are scalar and equal
	      var keys = (0, _keys2['default'])(nextProps);
	      for (var ii = 0; ii < keys.length; ii++) {
	        var _key = keys[ii];
	        if (!fragments.hasOwnProperty(_key) && !__webpack_require__(19)(nextProps[_key], this.props[_key])) {
	          return true;
	        }
	      }
	      return false;
	    };

	    /**
	     * Render new data for the existing props/context.
	     */


	    Container.prototype.render = function render() {
	      if (ComponentClass) {
	        return __webpack_require__(2).createElement(ComponentClass, (0, _extends3['default'])({}, this.props, this.state.data, {
	          ref: 'component' // eslint-disable-line react/no-string-refs
	          , relay: this.state.relayProp
	        }));
	      } else {
	        // Stateless functional, doesn't support `ref`
	        return __webpack_require__(2).createElement(Component, (0, _extends3['default'])({}, this.props, this.state.data, {
	          relay: this.state.relayProp
	        }));
	      }
	    };

	    return Container;
	  }(__webpack_require__(2).Component);

	  profileContainer(Container, 'ReactRelayFragmentContainer');
	  Container.contextTypes = containerContextTypes;
	  Container.displayName = containerName;

	  return Container;
	}

	function assertRelayContext(relay) {
	  __webpack_require__(1)(__webpack_require__(5)(relay), 'ReactRelayFragmentContainer: Expected `context.relay` to be an object ' + 'conforming to the `RelayContext` interface, got `%s`.', relay);
	  return relay;
	}

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec) {
	  return __webpack_require__(17)(Component, fragmentSpec, createContainerWithFragments);
	}

	module.exports = { createContainer: createContainer, createContainerWithFragments: createContainerWithFragments };

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
	 * @providesModule ReactRelayPaginationContainer
	 * 
	 * @format
	 */

	'use strict';

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(11));

	var _possibleConstructorReturn3 = _interopRequireDefault(__webpack_require__(13));

	var _inherits3 = _interopRequireDefault(__webpack_require__(12));

	var _defineProperty3 = _interopRequireDefault(__webpack_require__(32));

	var _extends4 = _interopRequireDefault(__webpack_require__(7));

	var _keys2 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(16),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(44),
	    EDGES = _require2.EDGES,
	    PAGE_INFO = _require2.PAGE_INFO,
	    HAS_NEXT_PAGE = _require2.HAS_NEXT_PAGE,
	    HAS_PREV_PAGE = _require2.HAS_PREV_PAGE,
	    END_CURSOR = _require2.END_CURSOR,
	    START_CURSOR = _require2.START_CURSOR;

	var _require3 = __webpack_require__(4),
	    getComponentName = _require3.getComponentName,
	    getReactComponent = _require3.getReactComponent;

	var containerContextTypes = {
	  relay: __webpack_require__(3).Relay
	};

	var FORWARD = 'forward';

	/**
	 * Extends the functionality of RelayFragmentContainer by providing a mechanism
	 * to load more data from a connection.
	 *
	 * # Configuring a PaginationContainer
	 *
	 * PaginationContainer accepts the standard FragmentContainer arguments and an
	 * additional `connectionConfig` argument:
	 *
	 * - `Component`: the component to be wrapped/rendered.
	 * - `fragments`: an object whose values are `graphql` fragments. The object
	 *   keys determine the prop names by which fragment data is available.
	 * - `connectionConfig`: an object that determines how to load more connection
	 *   data. Details below.
	 *
	 * # Loading More Data
	 *
	 * Use `props.relay.hasMore()` to determine if there are more items to load.
	 *
	 * ```
	 * hasMore(): boolean
	 * ```
	 *
	 * Use `props.relay.isLoading()` to determine if a previous call to `loadMore()`
	 * is still pending. This is convenient for avoiding duplicate load calls.
	 *
	 * ```
	 * isLoading(): boolean
	 * ```
	 *
	 * Use `props.relay.loadMore()` to load more items. This will return null if
	 * there are no more items to fetch, otherwise it will fetch more items and
	 * return a Disposable that can be used to cancel the fetch.
	 *
	 * `pageSize` should be the number of *additional* items to fetch (not the
	 * total).
	 *
	 * ```
	 * loadMore(pageSize: number, callback: ?(error: ?Error) => void): ?Disposable
	 * ```
	 *
	 * A complete example:
	 *
	 * ```
	 * class Foo extends React.Component {
	 *   ...
	 *   _onEndReached() {
	 *     if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
	 *       return;
	 *     }
	 *     this.props.relay.loadMore(10);
	 *   }
	 *   ...
	 * }
	 * ```
	 *
	 * # Connection Config
	 *
	 * Here's an example, followed by details of each config property:
	 *
	 * ```
	 * ReactRelayPaginationContainer.createContainer(
	 *   Component,
	 *   {
	 *     user: graphql`fragment FriendsFragment on User {
	 *       friends(after: $afterCursor first: $count) @connection {
	 *         edges { ... }
	 *         page_info {
	 *           end_cursor
	 *           has_next_page
	 *         }
	 *       }
	 *     }`,
	 *   },
	 *   {
	 *     direction: 'forward',
	 *     getConnectionFromProps(props) {
	 *       return props.user && props.user.friends;
	 *     },
	 *     getFragmentVariables(vars, totalCount) {
	 *       // The component presumably wants *all* edges, not just those after
	 *       // the cursor, so notice that we don't set $afterCursor here.
	 *       return {
	 *         ...vars,
	 *         count: totalCount,
	 *       };
	 *     },
	 *     getVariables(props, {count, cursor}, fragmentVariables) {
	 *       return {
	 *         ...RelayFBQueryConstants.get(),
	 *         id: props.user.id,
	 *         afterCursor: cursor,
	 *         count,
	 *       },
	 *     },
	 *     query: graphql`
	 *       query FriendsQuery($id: ID!, $afterCursor: ID, $count: Int!) {
	 *         node(id: $id) {
	 *           ...FriendsFragment
	 *         }
	 *       }
	 *     `,
	 *   }
	 * );
	 * ```
	 *
	 * ## Config Properties
	 *
	 * - `direction`: Either "forward" to indicate forward pagination using
	 *   after/first, or "backward" to indicate backward pagination using
	 *   before/last.
	 * - `getConnectionFromProps(props)`: PaginationContainer doesn't magically know
	 *   which connection data you mean to fetch more of (a container might fetch
	 *   multiple connections, but can only paginate one of them). This function is
	 *   given the fragment props only (not full props), and should return the
	 *   connection data. See the above example that returns the friends data via
	 *   `props.user.friends`.
	 * - `getFragmentVariables(previousVars, totalCount)`: Given the previous variables
	 *   and the new total number of items, get the variables to use when reading
	 *   your fragments. Typically this means setting whatever your local "count"
	 *   variable is to the value of `totalCount`. See the example.
	 * - `getVariables(props, {count, cursor})`: Get the variables to use when
	 *   fetching the pagination `query`. You may determine the root object id from
	 *   props (see the example that uses `props.user.id`) and may also set whatever
	 *   variables you use for the after/first/before/last calls based on the count
	 *   and cursor.
	 * - `query`: A query to use when fetching more connection data. This should
	 *   typically reference one of the container's fragment (as in the example)
	 *   to ensure that all the necessary fields for sub-components are fetched.
	 */

	function createGetConnectionFromProps(metadata) {
	  var path = metadata.path;
	  __webpack_require__(1)(path, 'ReactRelayPaginationContainer: Unable to synthesize a ' + 'getConnectionFromProps function.');
	  return function (props) {
	    var data = props[metadata.fragmentName];
	    for (var i = 0; i < path.length; i++) {
	      if (!data || typeof data !== 'object') {
	        return null;
	      }
	      data = data[path[i]];
	    }
	    return data;
	  };
	}

	function createGetFragmentVariables(metadata) {
	  var countVariable = metadata.count;
	  __webpack_require__(1)(countVariable, 'ReactRelayPaginationContainer: Unable to synthesize a ' + 'getFragmentVariables function.');
	  return function (prevVars, totalCount) {
	    return (0, _extends4['default'])({}, prevVars, (0, _defineProperty3['default'])({}, countVariable, totalCount));
	  };
	}

	function findConnectionMetadata(fragments) {
	  var foundConnectionMetadata = null;
	  for (var _fragmentName in fragments) {
	    var fragment = fragments[_fragmentName];
	    var connectionMetadata = fragment.metadata && fragment.metadata.connection;
	    if (connectionMetadata) {
	      __webpack_require__(1)(connectionMetadata.length === 1, 'ReactRelayPaginationContainer: Only a single @connection is ' + 'supported, `%s` has %s.', _fragmentName, connectionMetadata.length);
	      __webpack_require__(1)(!foundConnectionMetadata, 'ReactRelayPaginationContainer: Only a single fragment with ' + '@connection is supported.');
	      foundConnectionMetadata = (0, _extends4['default'])({}, connectionMetadata[0], {
	        fragmentName: _fragmentName
	      });
	    }
	  }
	  // TODO(t17350438) for modern, this should be an invariant.
	  return foundConnectionMetadata || {};
	}

	function createContainerWithFragments(Component, fragments, connectionConfig) {
	  var ComponentClass = getReactComponent(Component);
	  var componentName = getComponentName(Component);
	  var containerName = 'Relay(' + componentName + ')';

	  var metadata = findConnectionMetadata(fragments);

	  var getConnectionFromProps = connectionConfig.getConnectionFromProps || createGetConnectionFromProps(metadata);

	  var direction = connectionConfig.direction || metadata.direction;
	  __webpack_require__(1)(direction, 'ReactRelayPaginationContainer: Unable to infer direction of the ' + 'connection, possibly because both first and last are provided.');

	  var getFragmentVariables = connectionConfig.getFragmentVariables || createGetFragmentVariables(metadata);

	  var Container = function (_React$Component) {
	    (0, _inherits3['default'])(Container, _React$Component);

	    function Container(props, context) {
	      (0, _classCallCheck3['default'])(this, Container);

	      var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	      _this._handleFragmentDataUpdate = function () {
	        var profiler = __webpack_require__(10).profile('ReactRelayPaginationContainer.handleFragmentDataUpdate');
	        _this.setState({ data: _this._resolver.resolve() }, profiler.stop);
	      };

	      _this._hasMore = function () {
	        var connectionData = _this._getConnectionData();
	        return !!connectionData && connectionData.hasMore;
	      };

	      _this._isLoading = function () {
	        return !!_this._pendingRefetch;
	      };

	      _this._refetchConnection = function (totalCount, callback) {
	        var paginatingVariables = {
	          count: totalCount,
	          cursor: null,
	          totalCount: totalCount
	        };
	        return _this._fetchPage(paginatingVariables, callback, { force: true });
	      };

	      _this._loadMore = function (pageSize, callback, options) {
	        var connectionData = _this._getConnectionData();
	        if (!connectionData) {
	          return null;
	        }
	        var totalCount = connectionData.edgeCount + pageSize;
	        if (options && options.force) {
	          return _this._refetchConnection(totalCount, callback);
	        }
	        var paginatingVariables = {
	          count: pageSize,
	          cursor: connectionData.cursor,
	          totalCount: totalCount
	        };
	        return _this._fetchPage(paginatingVariables, callback, options);
	      };

	      var relay = assertRelayContext(context.relay);
	      var createFragmentSpecResolver = relay.environment.unstable_internal.createFragmentSpecResolver;

	      _this._localVariables = null;
	      _this._pendingRefetch = null;
	      _this._references = [];
	      _this._resolver = createFragmentSpecResolver(relay, fragments, props, _this._handleFragmentDataUpdate);
	      _this.state = {
	        data: _this._resolver.resolve(),
	        relayProp: _this._buildRelayProp(relay)
	      };
	      return _this;
	    }

	    /**
	     * When new props are received, read data for the new props and subscribe
	     * for updates. Props may be the same in which case previous data and
	     * subscriptions can be reused.
	     */


	    Container.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
	      var context = __webpack_require__(21)(nextContext);
	      var relay = assertRelayContext(context.relay);
	      var _relay$environment$un = relay.environment.unstable_internal,
	          createFragmentSpecResolver = _relay$environment$un.createFragmentSpecResolver,
	          getDataIDsFromObject = _relay$environment$un.getDataIDsFromObject;

	      var prevIDs = getDataIDsFromObject(fragments, this.props);
	      var nextIDs = getDataIDsFromObject(fragments, nextProps);

	      // If the environment has changed or props point to new records then
	      // previously fetched data and any pending fetches no longer apply:
	      // - Existing references are on the old environment.
	      // - Pending fetches are for the previous records.
	      if (this.context.relay.environment !== relay.environment || !__webpack_require__(14)(prevIDs, nextIDs)) {
	        this._release();
	        this._localVariables = null;
	        this._resolver = createFragmentSpecResolver(relay, fragments, nextProps, this._handleFragmentDataUpdate);
	        this.setState({ relayProp: this._buildRelayProp(relay) });
	      } else if (!this._localVariables) {
	        this._resolver.setProps(nextProps);
	      }
	      var data = this._resolver.resolve();
	      if (data !== this.state.data) {
	        this.setState({ data: data });
	      }
	    };

	    Container.prototype.componentWillUnmount = function componentWillUnmount() {
	      this._release();
	    };

	    Container.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // Short-circuit if any Relay-related data has changed
	      if (nextContext.relay !== this.context.relay || nextState.data !== this.state.data || nextState.relayProp !== this.state.relayProp) {
	        return true;
	      }
	      // Otherwise, for convenience short-circuit if all non-Relay props
	      // are scalar and equal
	      var keys = (0, _keys2['default'])(nextProps);
	      for (var ii = 0; ii < keys.length; ii++) {
	        var _key = keys[ii];
	        if (!fragments.hasOwnProperty(_key) && !__webpack_require__(19)(nextProps[_key], this.props[_key])) {
	          return true;
	        }
	      }
	      return false;
	    };

	    Container.prototype._buildRelayProp = function _buildRelayProp(relay) {
	      return {
	        hasMore: this._hasMore,
	        isLoading: this._isLoading,
	        loadMore: this._loadMore,
	        refetchConnection: this._refetchConnection,
	        environment: relay.environment
	      };
	    };

	    /**
	     * Render new data for the existing props/context.
	     */


	    Container.prototype._getConnectionData = function _getConnectionData() {
	      // Extract connection data and verify there are more edges to fetch
	      var props = (0, _extends4['default'])({}, this.props, this.state.data);
	      var connectionData = getConnectionFromProps(props);
	      if (connectionData == null) {
	        return null;
	      }
	      __webpack_require__(1)(typeof connectionData === 'object', 'ReactRelayPaginationContainer: Expected `getConnectionFromProps()` in `%s`' + 'to return `null` or a plain object with %s and %s properties, got `%s`.' + componentName, EDGES, PAGE_INFO, connectionData);
	      var edges = connectionData[EDGES];
	      var pageInfo = connectionData[PAGE_INFO];
	      if (edges == null || pageInfo == null) {
	        return null;
	      }
	      __webpack_require__(1)(Array.isArray(edges), 'ReactRelayPaginationContainer: Expected `getConnectionFromProps()` in `%s`' + 'to return an object with %s: Array, got `%s`.', componentName, EDGES, edges);
	      __webpack_require__(1)(typeof pageInfo === 'object', 'ReactRelayPaginationContainer: Expected `getConnectionFromProps()` in `%s`' + 'to return an object with %s: Object, got `%s`.', componentName, PAGE_INFO, pageInfo);
	      var hasMore = direction === FORWARD ? pageInfo[HAS_NEXT_PAGE] : pageInfo[HAS_PREV_PAGE];
	      var cursor = direction === FORWARD ? pageInfo[END_CURSOR] : pageInfo[START_CURSOR];
	      if (typeof hasMore !== 'boolean' || typeof cursor !== 'string') {
	        __webpack_require__(23)(false, 'ReactRelayPaginationContainer: Cannot paginate without %s fields in `%s`. ' + 'Be sure to fetch %s (got `%s`) and %s (got `%s`).', PAGE_INFO, componentName, direction === FORWARD ? HAS_NEXT_PAGE : HAS_PREV_PAGE, hasMore, direction === FORWARD ? END_CURSOR : START_CURSOR, cursor);
	        return null;
	      }
	      return {
	        cursor: cursor,
	        edgeCount: edges.length,
	        hasMore: hasMore
	      };
	    };

	    Container.prototype._fetchPage = function _fetchPage(paginatingVariables, callback, options) {
	      var _this2 = this;

	      var _assertRelayContext = assertRelayContext(this.context.relay),
	          environment = _assertRelayContext.environment;

	      var _environment$unstable = environment.unstable_internal,
	          createOperationSelector = _environment$unstable.createOperationSelector,
	          getOperation = _environment$unstable.getOperation,
	          getVariablesFromObject = _environment$unstable.getVariablesFromObject;

	      var props = (0, _extends4['default'])({}, this.props, this.state.data);
	      var fragmentVariables = getVariablesFromObject(this.context.relay.variables, fragments, this.props);
	      var fetchVariables = connectionConfig.getVariables(props, {
	        count: paginatingVariables.count,
	        cursor: paginatingVariables.cursor
	      },
	      // Pass the variables used to fetch the fragments initially
	      fragmentVariables);
	      __webpack_require__(1)(typeof fetchVariables === 'object' && fetchVariables !== null, 'ReactRelayPaginationContainer: Expected `getVariables()` to ' + 'return an object, got `%s` in `%s`.', fetchVariables, componentName);
	      this._localVariables = fetchVariables;

	      var cacheConfig = options ? { force: !!options.force } : undefined;
	      var query = getOperation(connectionConfig.query);
	      var operation = createOperationSelector(query, fetchVariables);

	      var onCompleted = function onCompleted() {
	        _this2._pendingRefetch = null;
	        callback && callback();
	        _this2._updateSnapshots(paginatingVariables.totalCount);
	      };
	      var onError = function onError(error) {
	        _this2._pendingRefetch = null;
	        callback && callback(error);
	      };

	      // Immediately retain the results of the query to prevent cached
	      // data from being evicted
	      var reference = environment.retain(operation.root);
	      this._references.push(reference);

	      if (this._pendingRefetch) {
	        this._pendingRefetch.dispose();
	      }
	      var pendingRefetch = environment.streamQuery({
	        cacheConfig: cacheConfig,
	        onCompleted: onCompleted,
	        onError: onError,
	        operation: operation
	      });
	      this._pendingRefetch = pendingRefetch;
	      return {
	        dispose: function dispose() {
	          // Disposing a loadMore() call should always dispose the fetch itself,
	          // but should not clear this._pendingFetch unless the loadMore() being
	          // cancelled is the most recent call.
	          pendingRefetch.dispose();
	          if (_this2._pendingRefetch === pendingRefetch) {
	            _this2._pendingRefetch = null;
	          }
	        }
	      };
	    };

	    Container.prototype._updateSnapshots = function _updateSnapshots(totalCount) {
	      var getVariablesFromObject = this.context.relay.environment.unstable_internal.getVariablesFromObject;

	      var prevVariables = getVariablesFromObject(this.context.relay.variables, fragments, this.props);
	      var nextVariables = getFragmentVariables(prevVariables, totalCount);

	      var prevData = this._resolver.resolve();
	      this._resolver.setVariables(nextVariables);
	      var nextData = this._resolver.resolve();
	      // Workaround slightly different handling for connection in different
	      // core implementations:
	      // - Classic core requires the count to be explicitly incremented
	      // - Modern core automatically appends new items, updating the count
	      //   isn't required to see new data.
	      //
	      // `setState` is only required if changing the variables would change the
	      // resolved data.
	      // TODO #14894725: remove PaginationContainer equal check
	      if (!__webpack_require__(14)(prevData, nextData)) {
	        this.setState({ data: nextData });
	      }
	    };

	    Container.prototype._release = function _release() {
	      this._resolver.dispose();
	      this._references.forEach(function (disposable) {
	        return disposable.dispose();
	      });
	      this._references.length = 0;
	      if (this._pendingRefetch) {
	        this._pendingRefetch.dispose();
	        this._pendingRefetch = null;
	      }
	    };

	    Container.prototype.render = function render() {
	      if (ComponentClass) {
	        return __webpack_require__(2).createElement(ComponentClass, (0, _extends4['default'])({}, this.props, this.state.data, {
	          ref: 'component' // eslint-disable-line react/no-string-refs
	          , relay: this.state.relayProp
	        }));
	      } else {
	        // Stateless functional, doesn't support `ref`
	        return __webpack_require__(2).createElement(Component, (0, _extends4['default'])({}, this.props, this.state.data, {
	          relay: this.state.relayProp
	        }));
	      }
	    };

	    return Container;
	  }(__webpack_require__(2).Component);

	  profileContainer(Container, 'ReactRelayPaginationContainer');
	  Container.contextTypes = containerContextTypes;
	  Container.displayName = containerName;

	  return Container;
	}

	function assertRelayContext(relay) {
	  __webpack_require__(1)(__webpack_require__(5)(relay), 'ReactRelayPaginationContainer: Expected `context.relay` to be an object ' + 'conforming to the `RelayContext` interface, got `%s`.', relay);
	  return relay;
	}

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, connectionConfig) {
	  return __webpack_require__(17)(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return createContainerWithFragments(ComponentClass, fragments, connectionConfig);
	  });
	}

	module.exports = { createContainer: createContainer, createContainerWithFragments: createContainerWithFragments };

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
	 * @providesModule ReactRelayQueryRenderer
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(7));

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(11));

	var _possibleConstructorReturn3 = _interopRequireDefault(__webpack_require__(13));

	var _inherits3 = _interopRequireDefault(__webpack_require__(12));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * @public
	 *
	 * Orchestrates fetching and rendering data for a single view or view hierarchy:
	 * - Fetches the query/variables using the given network implementation.
	 * - Normalizes the response(s) to that query, publishing them to the given
	 *   store.
	 * - Renders the pending/fail/success states with the provided render function.
	 * - Subscribes for updates to the root data and re-renders with any changes.
	 */
	var ReactRelayQueryRenderer = function (_React$Component) {
	  (0, _inherits3['default'])(ReactRelayQueryRenderer, _React$Component);

	  function ReactRelayQueryRenderer(props, context) {
	    (0, _classCallCheck3['default'])(this, ReactRelayQueryRenderer);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	    _this._onChange = function (snapshot) {
	      _this.setState({
	        readyState: (0, _extends3['default'])({}, _this.state.readyState, {
	          props: snapshot.data
	        })
	      });
	    };

	    var query = props.query,
	        variables = props.variables;
	    // TODO (#16225453) QueryRenderer works with old and new environment, but
	    // the flow typing doesn't quite work abstracted.
	    // $FlowFixMe

	    var environment = props.environment;
	    var operation = null;
	    if (query) {
	      var _environment$unstable = environment.unstable_internal,
	          createOperationSelector = _environment$unstable.createOperationSelector,
	          getOperation = _environment$unstable.getOperation;

	      query = getOperation(query);
	      operation = createOperationSelector(query, variables);
	      variables = operation.variables;
	    }

	    _this._mounted = false;
	    _this._operation = operation;
	    _this._pendingFetch = null;
	    _this._relayContext = {
	      environment: environment,
	      variables: variables
	    };
	    _this._rootSubscription = null;
	    _this._selectionReference = null;
	    if (query) {
	      _this.state = {
	        readyState: getDefaultState()
	      };
	    } else {
	      _this.state = {
	        readyState: {
	          error: null,
	          props: {},
	          retry: null
	        }
	      };
	    }

	    if (operation) {
	      _this._fetch(operation, props.cacheConfig);
	    }
	    return _this;
	  }

	  ReactRelayQueryRenderer.prototype.componentDidMount = function componentDidMount() {
	    this._mounted = true;
	  };

	  ReactRelayQueryRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps.query !== this.props.query || nextProps.environment !== this.props.environment || !__webpack_require__(14)(nextProps.variables, this.props.variables)) {
	      var _query = nextProps.query,
	          _variables = nextProps.variables;
	      // TODO (#16225453) QueryRenderer works with old and new environment, but
	      // the flow typing doesn't quite work abstracted.
	      // $FlowFixMe

	      var _environment = nextProps.environment;
	      if (_query) {
	        var _environment$unstable2 = _environment.unstable_internal,
	            createOperationSelector = _environment$unstable2.createOperationSelector,
	            getOperation = _environment$unstable2.getOperation;

	        var operation = createOperationSelector(getOperation(_query), _variables);
	        this._operation = operation;
	        this._relayContext = {
	          environment: _environment,
	          variables: operation.variables
	        };
	        this._fetch(operation, nextProps.cacheConfig);
	        this.setState({
	          readyState: getDefaultState()
	        });
	      } else {
	        this._operation = null;
	        this._relayContext = {
	          environment: _environment,
	          variables: _variables
	        };
	        this._release();
	        this.setState({
	          readyState: {
	            error: null,
	            props: {},
	            retry: null
	          }
	        });
	      }
	    }
	  };

	  ReactRelayQueryRenderer.prototype.componentWillUnmount = function componentWillUnmount() {
	    this._release();
	    this._mounted = false;
	  };

	  ReactRelayQueryRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.render !== this.props.render || nextState.readyState !== this.state.readyState;
	  };

	  ReactRelayQueryRenderer.prototype._release = function _release() {
	    if (this._pendingFetch) {
	      this._pendingFetch.dispose();
	      this._pendingFetch = null;
	    }
	    if (this._rootSubscription) {
	      this._rootSubscription.dispose();
	      this._rootSubscription = null;
	    }
	    if (this._selectionReference) {
	      this._selectionReference.dispose();
	      this._selectionReference = null;
	    }
	  };

	  ReactRelayQueryRenderer.prototype._fetch = function _fetch(operation, cacheConfig) {
	    var _this2 = this;

	    var environment = this._relayContext.environment;

	    // Immediately retain the results of the new query to prevent relevant data
	    // from being freed. This is not strictly required if all new data is
	    // fetched in a single step, but is necessary if the network could attempt
	    // to incrementally load data (ex: multiple query entries or incrementally
	    // loading records from disk cache).

	    var nextReference = environment.retain(operation.root);

	    var readyState = getDefaultState();
	    var snapshot = void 0; // results of the root fragment
	    var onCompleted = function onCompleted() {
	      _this2._pendingFetch = null;
	    };
	    var onError = function onError(error) {
	      readyState = {
	        error: error,
	        props: null,
	        retry: function retry() {
	          _this2._fetch(operation, cacheConfig);
	        }
	      };
	      if (_this2._selectionReference) {
	        _this2._selectionReference.dispose();
	      }
	      _this2._pendingFetch = null;
	      _this2._selectionReference = nextReference;
	      _this2.setState({ readyState: readyState });
	    };
	    var onNext = function onNext() {
	      // `onNext` can be called multiple times by network layers that support
	      // data subscriptions. Wait until the first payload to render `props` and
	      // subscribe for data updates.
	      if (snapshot) {
	        return;
	      }
	      snapshot = environment.lookup(operation.fragment);
	      readyState = {
	        error: null,
	        props: snapshot.data,
	        retry: function retry() {
	          _this2._fetch(operation, cacheConfig);
	        }
	      };

	      if (_this2._selectionReference) {
	        _this2._selectionReference.dispose();
	      }
	      _this2._rootSubscription = environment.subscribe(snapshot, _this2._onChange);
	      _this2._selectionReference = nextReference;
	      _this2.setState({ readyState: readyState });
	    };

	    if (this._pendingFetch) {
	      this._pendingFetch.dispose();
	    }
	    if (this._rootSubscription) {
	      this._rootSubscription.dispose();
	    }
	    var request = environment.streamQuery({
	      cacheConfig: cacheConfig,
	      onCompleted: onCompleted,
	      onError: onError,
	      onNext: onNext,
	      operation: operation
	    });
	    this._pendingFetch = {
	      dispose: function dispose() {
	        request.dispose();
	        nextReference.dispose();
	      }
	    };
	  };

	  ReactRelayQueryRenderer.prototype.getChildContext = function getChildContext() {
	    return {
	      relay: this._relayContext
	    };
	  };

	  ReactRelayQueryRenderer.prototype.render = function render() {
	    // Note that the root fragment results in `readyState.props` is already
	    // frozen by the store; this call is to freeze the readyState object and
	    // error property if set.
	    if (true) {
	      __webpack_require__(47)(this.state.readyState);
	    }
	    return this.props.render(this.state.readyState);
	  };

	  return ReactRelayQueryRenderer;
	}(__webpack_require__(2).Component);

	ReactRelayQueryRenderer.childContextTypes = {
	  relay: __webpack_require__(3).Relay
	};

	function getDefaultState() {
	  return {
	    error: null,
	    props: null,
	    retry: null
	  };
	}

	module.exports = ReactRelayQueryRenderer;

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
	 * @providesModule ReactRelayRefetchContainer
	 * 
	 * @format
	 */

	'use strict';

	var _extends3 = _interopRequireDefault(__webpack_require__(7));

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(11));

	var _possibleConstructorReturn3 = _interopRequireDefault(__webpack_require__(13));

	var _inherits3 = _interopRequireDefault(__webpack_require__(12));

	var _keys2 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(16),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(4),
	    getComponentName = _require2.getComponentName,
	    getReactComponent = _require2.getReactComponent;

	var containerContextTypes = {
	  relay: __webpack_require__(3).Relay
	};

	/**
	 * Composes a React component class, returning a new class that intercepts
	 * props, resolving them with the provided fragments and subscribing for
	 * updates.
	 */
	function createContainerWithFragments(Component, fragments, taggedNode) {
	  var ComponentClass = getReactComponent(Component);
	  var componentName = getComponentName(Component);
	  var containerName = 'Relay(' + componentName + ')';

	  var Container = function (_React$Component) {
	    (0, _inherits3['default'])(Container, _React$Component);

	    function Container(props, context) {
	      (0, _classCallCheck3['default'])(this, Container);

	      var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	      _this._handleFragmentDataUpdate = function () {
	        var profiler = __webpack_require__(10).profile('ReactRelayRefetchContainer.handleFragmentDataUpdate');
	        _this.setState({ data: _this._resolver.resolve() }, profiler.stop);
	      };

	      _this._refetch = function (refetchVariables, renderVariables, callback, options) {
	        var _assertRelayContext = assertRelayContext(_this.context.relay),
	            environment = _assertRelayContext.environment,
	            rootVariables = _assertRelayContext.variables;

	        var fetchVariables = typeof refetchVariables === 'function' ? refetchVariables(_this._getFragmentVariables()) : refetchVariables;
	        fetchVariables = (0, _extends3['default'])({}, rootVariables, fetchVariables);
	        var fragmentVariables = renderVariables ? (0, _extends3['default'])({}, rootVariables, renderVariables) : fetchVariables;

	        var onNext = function onNext(response) {
	          if (!_this._pendingRefetch) {
	            // only call callback once per refetch
	            return;
	          }
	          // TODO t15106389: add helper utility for fetching more data
	          _this._pendingRefetch = null;
	          callback && callback();
	          _this._resolver.setVariables(fragmentVariables);
	          _this.setState({ data: _this._resolver.resolve() });
	        };
	        var onError = function onError(error) {
	          _this._pendingRefetch = null;
	          callback && callback(error);
	        };

	        var cacheConfig = options ? { force: !!options.force } : undefined;
	        var _this$context$relay$e = _this.context.relay.environment.unstable_internal,
	            createOperationSelector = _this$context$relay$e.createOperationSelector,
	            getOperation = _this$context$relay$e.getOperation;

	        var query = getOperation(taggedNode);
	        var operation = createOperationSelector(query, fetchVariables);

	        // Immediately retain the results of the query to prevent cached
	        // data from being evicted
	        var reference = environment.retain(operation.root);
	        _this._references.push(reference);

	        _this._localVariables = fetchVariables;
	        if (_this._pendingRefetch) {
	          _this._pendingRefetch.dispose();
	        }
	        var pendingRefetch = environment.streamQuery({
	          cacheConfig: cacheConfig,
	          onError: onError,
	          onNext: onNext,
	          operation: operation
	        });
	        _this._pendingRefetch = pendingRefetch;
	        return {
	          dispose: function dispose() {
	            // Disposing a refetch() call should always dispose the fetch itself,
	            // but should not clear this._pendingFetch unless the refetch() being
	            // cancelled is the most recent call.
	            pendingRefetch.dispose();
	            if (_this._pendingRefetch === pendingRefetch) {
	              _this._pendingRefetch = null;
	            }
	          }
	        };
	      };

	      var relay = assertRelayContext(context.relay);
	      var createFragmentSpecResolver = relay.environment.unstable_internal.createFragmentSpecResolver;

	      _this._localVariables = null;
	      _this._pendingRefetch = null;
	      _this._references = [];
	      _this._resolver = createFragmentSpecResolver(relay, fragments, props, _this._handleFragmentDataUpdate);
	      _this.state = {
	        data: _this._resolver.resolve(),
	        relayProp: _this._buildRelayProp(relay)
	      };
	      return _this;
	    }

	    /**
	     * When new props are received, read data for the new props and subscribe
	     * for updates. Props may be the same in which case previous data and
	     * subscriptions can be reused.
	     */


	    Container.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
	      var context = __webpack_require__(21)(nextContext);
	      var relay = assertRelayContext(context.relay);
	      var _relay$environment$un = relay.environment.unstable_internal,
	          createFragmentSpecResolver = _relay$environment$un.createFragmentSpecResolver,
	          getDataIDsFromObject = _relay$environment$un.getDataIDsFromObject;

	      var prevIDs = getDataIDsFromObject(fragments, this.props);
	      var nextIDs = getDataIDsFromObject(fragments, nextProps);

	      // If the environment has changed or props point to new records then
	      // previously fetched data and any pending fetches no longer apply:
	      // - Existing references are on the old environment.
	      // - Pending fetches are for the previous records.
	      if (this.context.relay.environment !== relay.environment || !__webpack_require__(14)(prevIDs, nextIDs)) {
	        this._release();
	        this._localVariables = null;
	        this._resolver = createFragmentSpecResolver(relay, fragments, nextProps, this._handleFragmentDataUpdate);
	        this.setState({ relayProp: this._buildRelayProp(relay) });
	      } else if (!this._localVariables) {
	        this._resolver.setProps(nextProps);
	      }
	      var data = this._resolver.resolve();
	      if (data !== this.state.data) {
	        this.setState({ data: data });
	      }
	    };

	    Container.prototype.componentWillUnmount = function componentWillUnmount() {
	      this._release();
	    };

	    Container.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // Short-circuit if any Relay-related data has changed
	      if (nextContext.relay !== this.context.relay || nextState.data !== this.state.data || nextState.relayProp !== this.state.relayProp) {
	        return true;
	      }
	      // Otherwise, for convenience short-circuit if all non-Relay props
	      // are scalar and equal
	      var keys = (0, _keys2['default'])(nextProps);
	      for (var ii = 0; ii < keys.length; ii++) {
	        var _key = keys[ii];
	        if (!fragments.hasOwnProperty(_key) && !__webpack_require__(19)(nextProps[_key], this.props[_key])) {
	          return true;
	        }
	      }
	      return false;
	    };

	    Container.prototype._release = function _release() {
	      this._resolver.dispose();
	      this._references.forEach(function (disposable) {
	        return disposable.dispose();
	      });
	      this._references.length = 0;
	      if (this._pendingRefetch) {
	        this._pendingRefetch.dispose();
	        this._pendingRefetch = null;
	      }
	    };

	    Container.prototype._buildRelayProp = function _buildRelayProp(relay) {
	      return {
	        environment: relay.environment,
	        refetch: this._refetch
	      };
	    };

	    /**
	     * Render new data for the existing props/context.
	     */


	    Container.prototype._getFragmentVariables = function _getFragmentVariables() {
	      var getVariablesFromObject = this.context.relay.environment.unstable_internal.getVariablesFromObject;

	      return getVariablesFromObject(this.context.relay.variables, fragments, this.props);
	    };

	    Container.prototype.render = function render() {
	      if (ComponentClass) {
	        return __webpack_require__(2).createElement(ComponentClass, (0, _extends3['default'])({}, this.props, this.state.data, {
	          ref: 'component' // eslint-disable-line react/no-string-refs
	          , relay: this.state.relayProp
	        }));
	      } else {
	        // Stateless functional, doesn't support `ref`
	        return __webpack_require__(2).createElement(Component, (0, _extends3['default'])({}, this.props, this.state.data, {
	          relay: this.state.relayProp
	        }));
	      }
	    };

	    return Container;
	  }(__webpack_require__(2).Component);

	  profileContainer(Container, 'ReactRelayRefetchContainer');
	  Container.contextTypes = containerContextTypes;
	  Container.displayName = containerName;

	  return Container;
	}

	function assertRelayContext(relay) {
	  __webpack_require__(1)(__webpack_require__(5)(relay), 'ReactRelayRefetchContainer: Expected `context.relay` to be an object ' + 'conforming to the `RelayContext` interface, got `%s`.', relay);
	  return relay;
	}

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, taggedNode) {
	  return __webpack_require__(17)(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return createContainerWithFragments(ComponentClass, fragments, taggedNode);
	  });
	}

	module.exports = { createContainer: createContainer, createContainerWithFragments: createContainerWithFragments };

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
	 * @providesModule RelayCompatContainer
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(9),
	    buildCompatContainer = _require.buildCompatContainer;

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec) {
	  return buildCompatContainer(Component, fragmentSpec, __webpack_require__(35).createContainerWithFragments);
	}

	module.exports = { createContainer: createContainer };

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
	 * @providesModule RelayCompatEnvironment
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(24),
	    isRelayModernEnvironment = _require.isRelayModernEnvironment;

	function getRelayModernEnvironment(environment) {
	  if (isRelayModernEnvironment(environment)) {
	    return environment;
	  }
	}

	function getRelayClassicEnvironment(environment) {
	  if (__webpack_require__(18)(environment)) {
	    return environment;
	  }
	}

	module.exports = {
	  getRelayClassicEnvironment: getRelayClassicEnvironment,
	  getRelayModernEnvironment: getRelayModernEnvironment
	};

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
	 * @providesModule RelayCompatMutations
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(40),
	    getRelayClassicEnvironment = _require.getRelayClassicEnvironment,
	    getRelayModernEnvironment = _require.getRelayModernEnvironment;

	var _require2 = __webpack_require__(24),
	    commitMutation = _require2.commitMutation;

	var RelayCompatMutations = {
	  commitUpdate: function commitUpdate(environment, config) {
	    var relayStaticEnvironment = getRelayModernEnvironment(environment);
	    if (relayStaticEnvironment) {
	      return commitMutation(relayStaticEnvironment, config);
	    } else {
	      var relayClassicEnvironment = getRelayClassicEnvironment(environment);
	      __webpack_require__(1)(relayClassicEnvironment, 'RelayCompatMutations: Expected an object that conforms to the ' + '`RelayEnvironmentInterface`, got `%s`.', environment);
	      return commitRelay1Mutation(
	      // getRelayClassicEnvironment returns a RelayEnvironmentInterface
	      // (classic APIs), but we need the modern APIs on old core here.
	      relayClassicEnvironment, config);
	    }
	  }
	};

	function commitRelay1Mutation(environment, _ref) {
	  var configs = _ref.configs,
	      mutation = _ref.mutation,
	      onCompleted = _ref.onCompleted,
	      onError = _ref.onError,
	      optimisticResponse = _ref.optimisticResponse,
	      variables = _ref.variables,
	      uploadables = _ref.uploadables;
	  var getOperation = environment.unstable_internal.getOperation;

	  var operation = getOperation(mutation);
	  if (optimisticResponse && operation.node.kind === 'Mutation' && operation.node.calls && operation.node.calls.length === 1) {
	    var mutationRoot = operation.node.calls[0].name;
	    var optimisticResponseObject = optimisticResponse();
	    if (optimisticResponseObject[mutationRoot]) {
	      optimisticResponse = function optimisticResponse() {
	        return optimisticResponseObject[mutationRoot];
	      };
	    } else {
	      __webpack_require__(23)(false, 'RelayCompatMutations: Expected result from `optimisticResponse()`' + 'to contain the mutation name `%s` as a property, got `%s`', mutationRoot, optimisticResponseObject);
	    }
	  }
	  return environment.sendMutation({
	    configs: configs || [],
	    operation: operation,
	    onCompleted: onCompleted,
	    onError: onError,
	    optimisticResponse: optimisticResponse && optimisticResponse(),
	    variables: variables,
	    uploadables: uploadables
	  });
	}

	module.exports = RelayCompatMutations;

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
	 * @providesModule RelayCompatPaginationContainer
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(9),
	    buildCompatContainer = _require.buildCompatContainer;

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, connectionConfig) {
	  return buildCompatContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return __webpack_require__(36).createContainerWithFragments(ComponentClass, fragments, connectionConfig);
	  });
	}

	module.exports = { createContainer: createContainer };

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
	 * @providesModule RelayCompatRefetchContainer
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(9),
	    buildCompatContainer = _require.buildCompatContainer;

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, taggedNode) {
	  return buildCompatContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return __webpack_require__(38).createContainerWithFragments(ComponentClass, fragments, taggedNode);
	  });
	}

	module.exports = { createContainer: createContainer };

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
	 * @providesModule RelayConnectionInterface
	 * @format
	 */

	'use strict';

	module.exports = __webpack_require__(46);

/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayContainerProxy
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * This feature is deprecated and unavailable in open source.
	 */
	var RelayContainerProxy = {
	  proxyMethods: function proxyMethods(Container, Component) {},
	  injectProxyMethods: function injectProxyMethods(proxyMethods) {
	    this.proxyMethods = proxyMethods;
	  }
	};

	module.exports = RelayContainerProxy;

/***/ },
/* 46 */
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

	var _defineProperty3 = _interopRequireDefault(__webpack_require__(32));

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
/* 47 */
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
	 * @providesModule deepFreeze
	 * @format
	 */

	'use strict';

	/**
	 * Recursively "deep" freezes the supplied object.
	 *
	 * For convenience, and for consistency with the behavior of `Object.freeze`,
	 * returns the now-frozen original object.
	 */

	var _isFrozen2 = _interopRequireDefault(__webpack_require__(54));

	var _getOwnPropertyNames2 = _interopRequireDefault(__webpack_require__(53));

	var _freeze2 = _interopRequireDefault(__webpack_require__(31));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function deepFreeze(object) {
	  (0, _freeze2['default'])(object);
	  (0, _getOwnPropertyNames2['default'])(object).forEach(function (name) {
	    var property = object[name];
	    if (property && typeof property === 'object' && !(0, _isFrozen2['default'])(property)) {
	      deepFreeze(property);
	    }
	  });
	  return object;
	}

	module.exports = deepFreeze;

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
	 * @providesModule forEachRootCallArg
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * @internal
	 *
	 * Iterates over the identifying arguments in the supplied root call.
	 * If the identifying value is null or undefined, the supplied callback will be
	 * invoked once.
	 */
	function forEachRootCallArg(query, callback) {
	  __webpack_require__(1)(!query.getBatchCall(), 'forEachRootCallArg(): Cannot iterate over batch call variables.');
	  function each(identifyingArgValue, fn) {
	    if (Array.isArray(identifyingArgValue)) {
	      identifyingArgValue.forEach(function (value) {
	        return each(value, fn);
	      });
	    } else {
	      fn({
	        identifyingArgValue: identifyingArgValue,
	        identifyingArgKey: identifyingArgValue == null ? null : typeof identifyingArgValue === 'string' ? identifyingArgValue : __webpack_require__(52)(identifyingArgValue)
	      });
	    }
	  }
	  var identifyingArg = query.getIdentifyingArg();
	  var identifyingArgValue = identifyingArg && identifyingArg.value || null;
	  each(identifyingArgValue, callback);
	}

	module.exports = forEachRootCallArg;

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
	 * @providesModule generateConcreteFragmentID
	 * 
	 * @format
	 */

	'use strict';

	// Static ids always end with `:<HASH>` where HASH is an alphanumeric transform
	// of an auto-incrementing index. A double-colon is used to distinguish between
	// client ids and static ids that happen to hash to `:client`.
	var SUFFIX = '::client';

	var _nextFragmentID = 0;

	/**
	 * The "concrete fragment id" uniquely identifies a Relay.QL`fragment ...`
	 * within the source code of an application and will remain the same across
	 * runs of a particular version of an application.
	 *
	 * This function can be used to generate a unique id for fragments constructed
	 * at runtime and is guaranteed not to conflict with statically created ids.
	 */
	function generateConcreteFragmentID() {
	  return __webpack_require__(55)(_nextFragmentID++) + SUFFIX;
	}

	module.exports = generateConcreteFragmentID;

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isRelayContainer
	 * 
	 * @format
	 */

	'use strict';

	function isRelayContainer(component) {
	  return !!(component && component.getFragmentNames && component.getFragment && component.hasFragment && component.hasVariable);
	}

	module.exports = isRelayContainer;

/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isRelayVariables
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Determine if the object is a plain object that matches the `Variables` type.
	 */

	function isRelayVariables(variables) {
	  return typeof variables === 'object' && variables !== null && !Array.isArray(variables);
	}

	module.exports = isRelayVariables;

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
	 * @providesModule stableStringify
	 * 
	 * @format
	 */

	'use strict';

	var _stringify2 = _interopRequireDefault(__webpack_require__(30));

	var _keys2 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function isObject(value) {
	  return value !== null && Object.prototype.toString.call(value) === '[object Object]';
	}

	/**
	 * Simple recursive stringifier that handles basic objects (does not handle
	 * corner cases such as circular references) and produces a JSON-like
	 * serialization suitable for use as a cache key or other similar internal
	 * book-keeping detail.
	 *
	 * Sample input:
	 *
	 *     var object = {
	 *       top2: {
	 *         middle: {
	 *           inner: [1, 'foo', ['bar', 2]],
	 *           other: false,
	 *         },
	 *       },
	 *       top1: [
	 *         {first: true},
	 *         {first: false},
	 *         'random',
	 *       ],
	 *       misc: true,
	 *       extra: null,
	 *     };
	 *
	 * Sample output (some whitespace added for clarity):
	 *
	 *    {
	 *      extra:null,
	 *      misc:true,
	 *      top1:[0:{first:true},1:{first:false},2:"random"],
	 *      top2:{middle:{inner:[0:1,1:"foo",2:[0:"bar",1:2]],other:false}}
	 *    }
	 */
	function stableStringify(input) {
	  var inputIsArray = Array.isArray(input);
	  var inputIsObject = isObject(input);
	  if (inputIsArray || inputIsObject) {
	    var keys = (0, _keys2['default'])(input);
	    if (keys.length) {
	      var result = [];
	      keys.sort();

	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = input[key];
	        if (isObject(value) || Array.isArray(value)) {
	          value = stableStringify(value);
	        } else {
	          value = (0, _stringify2['default'])(value);
	        }
	        result.push(key + ':' + value);
	      }

	      if (inputIsArray) {
	        return '[' + result.join(',') + ']';
	      } else {
	        return '{' + result.join(',') + '}';
	      }
	    }
	  }
	  return (0, _stringify2['default'])(input);
	}

	module.exports = stableStringify;

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_53__;

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_54__;

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_55__;

/***/ }
/******/ ])
});
;
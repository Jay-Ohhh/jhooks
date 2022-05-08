import { useEffect, useRef, useState, useMemo, useLayoutEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var useMount = function useMount(fn) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error("useMount: parameter `fn` expected to be a function,but got \"".concat(_typeof(fn), "\"."));
    }
  }

  useEffect(function () {
    fn === null || fn === void 0 ? void 0 : fn();
  }, []);
};

function useLatest(value) {
  var ref = useRef(value);
  ref.current = value;
  return ref;
}

var useUnmount = function useUnmount(fn) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error("useUnmount expected parameter is a function, got ".concat(_typeof(fn)));
    }
  }

  var fnRef = useLatest(fn);
  useEffect(function () {
    return fnRef.current;
  }, []);
};

var useUnmountedRef = function useUnmountedRef() {
  var ref = useRef(false);
  useEffect(function () {
    ref.current = false;
    return function () {
      ref.current = true;
    };
  }, []);
  return ref;
};

function useToggle() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var reverseValue = arguments.length > 1 ? arguments[1] : undefined;

  var _useState = useState(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var actions = useMemo(function () {
    var reverseValueOrigin = reverseValue === undefined ? !defaultValue : reverseValue;

    var toggle = function toggle() {
      return setState(function (s) {
        return s === defaultValue ? reverseValueOrigin : defaultValue;
      });
    };

    var set = function set(value) {
      ~[defaultValue, reverseValueOrigin].indexOf(value) && setState(value);
    };

    var setLeft = function setLeft() {
      return setState(defaultValue);
    };

    var setRight = function setRight() {
      return setState(reverseValueOrigin);
    };

    return {
      toggle: toggle,
      set: set,
      setLeft: setLeft,
      setRight: setRight
    };
  }, []);
  return [state, actions];
}

function useBoolean() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var _useToggle = useToggle(defaultValue),
      _useToggle2 = _slicedToArray(_useToggle, 2),
      state = _useToggle2[0],
      _useToggle2$ = _useToggle2[1],
      toggle = _useToggle2$.toggle,
      _set = _useToggle2$.set;

  var actions = useMemo(function () {
    var setTrue = function setTrue() {
      return _set(true);
    };

    var setFalse = function setFalse() {
      return _set(false);
    };

    return {
      toggle: toggle,
      set: function set(v) {
        return _set(!!v);
      },
      setTrue: setTrue,
      setFalse: setFalse
    };
  }, []);
  return [state, actions];
}

var createUpdateEffect = function createUpdateEffect(hook) {
  return function (effct, deps) {
    var isMounted = useRef(false); // for react-refresh

    hook(function () {
      return function () {
        isMounted.current = false;
      };
    }, []);
    hook(function () {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        // effct 有可能会返回一个清理函数
        // return void === no return
        return effct();
      }
    }, deps);
  };
};

var useUpdateEffect = createUpdateEffect(useEffect);

var index = createUpdateEffect(useLayoutEffect);

function useMemoizedFn(fn) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error("useMemoizedFn expected parameter is a function, got ".concat(_typeof(fn)));
    }
  }

  var fnRef = useRef(fn); // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728

  fnRef.current = useMemo(function () {
    return fn;
  }, [fn]);
  var memoizedFn = useRef();

  if (!memoizedFn.current) {
    memoizedFn.current = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 为什么要绑定this，因为有可能会被 bind(xxx)
      //  ReturnType<T>: 返回 fn 的返回值的类型
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function createUseStorageState(getStorage) {
  function useStorageState(key, options) {
    var storage; // https://github.com/alibaba/hooks/issues/800

    /**
      Disabling cookies on each of these browsers disable the following:
      Chrome: cookies, localStorage, sessionStorage, IndexedDB
      Firefox: cookies, localStorage, sessionStorage
      IE: cookies only
     */

    try {
      storage = getStorage();
    } catch (err) {
      console.error(err);
    }

    var serializer = function serializer(value) {
      if (options === null || options === void 0 ? void 0 : options.serializer) {
        return options.serializer(value);
      }

      return JSON.stringify(value);
    };

    var deserializer = function deserializer(value) {
      if (options === null || options === void 0 ? void 0 : options.deserializer) {
        return options.deserializer(value);
      }

      return JSON.parse(value);
    };

    function getStoredValue() {
      try {
        var _storage;

        var raw = (_storage = storage) === null || _storage === void 0 ? void 0 : _storage.getItem(key);

        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        console.error(e);
      }

      if (isFunction(options === null || options === void 0 ? void 0 : options.defaultValue)) {
        return options === null || options === void 0 ? void 0 : options.defaultValue();
      }

      return options === null || options === void 0 ? void 0 : options.defaultValue;
    } // 为什么第一次初始化时不用保存初始值在storage里，因为刷新页面后还是初始值，没必要保存到storage里
    // useState(() => fn()); // fn() 整个生命周期只会被调用一次


    var _useState = useState(function () {
      return getStoredValue();
    }),
        _useState2 = _slicedToArray(_useState, 2),
        storedValue = _useState2[0],
        setStoredValue = _useState2[1];

    useUpdateEffect(function () {
      setStoredValue(getStoredValue());
    }, [key]); // 实际上value还有可能是其他类型值，例如dates, regex,classes等
    // 建议使用序列化库：storybookjs/telejson

    var updateState = function updateState(value) {
      try {
        setStoredValue(function (prevState) {
          var currentValue = isFunction(value) ? value(prevState) : value;

          if (currentValue === undefined) {
            var _storage2;

            (_storage2 = storage) === null || _storage2 === void 0 ? void 0 : _storage2.removeItem(key);
          } else {
            var _storage3;

            (_storage3 = storage) === null || _storage3 === void 0 ? void 0 : _storage3.setItem(key, serializer(currentValue));
          }

          return currentValue;
        });
      } catch (e) {
        console.error(e);
      }
    };

    return [storedValue, useMemoizedFn(updateState)];
  }

  return useStorageState;
}

var isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var useLocalStorageState = createUseStorageState(function () {
  return isBrowser ? localStorage : undefined;
});

var _excluded = ["defaultValue"];

function useCookieState(cookieKey) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // https://github.com/alibaba/hooks/issues/800

  /**
      Disabling cookies on each of these browsers disable the following:
      Chrome: cookies, localStorage, sessionStorage, IndexedDB
      Firefox: cookies, localStorage, sessionStorage
      IE: cookies only
     */
  function getCookieValue() {
    try {
      var cookieValue = Cookies.get(cookieKey);
      if (typeof cookieValue === 'string') return cookieValue;
    } catch (e) {
      console.error(e);
    }

    if (isFunction(options.defaultValue)) {
      return options.defaultValue();
    }

    return options.defaultValue;
  }

  var _useState = useState(function () {
    return getCookieValue();
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var updateState = useMemoizedFn(function (newValue) {
    var newOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
      var _options$newOptions = _objectSpread2(_objectSpread2({}, options), newOptions),
          defaultValue = _options$newOptions.defaultValue,
          restOptions = _objectWithoutProperties(_options$newOptions, _excluded);

      setState(function (prevState) {
        var value = isFunction(newValue) ? newValue(prevState) : newValue;

        if (value === undefined) {
          Cookies.remove(cookieKey);
        } else {
          Cookies.set(cookieKey, value, restOptions);
        }

        return value;
      });
    } catch (e) {
      console.error(e);
    }
  });
  return [state, updateState];
}

function useSafeState(initialState) {
  var unmountedRef = useUnmountedRef();

  var _useState = useState(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var setCurrentState = useCallback(function (currentState) {
    // if component is unmountedd, stop update
    if (unmountedRef.current) return;
    setState(currentState);
  }, []);
  return [state, setCurrentState];
}

function useGetState(initialState) {
  var _useState = useState(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // 与 useLatest 一样


  var stateRef = useRef(state);
  stateRef.current = state;
  var getState = useCallback(function () {
    return stateRef.current;
  }, []);
  return [state, setState, getState];
}

var defaultShouldUpdate = function defaultShouldUpdate(a, b) {
  return a !== b;
};

function usePrevious(state) {
  var shouldUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultShouldUpdate;
  var prevRef = useRef();
  var curRef = useRef();

  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}

function useRafState(initialState) {
  var ref = useRef(0);

  var _useState = useState(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var setRafState = useCallback(function (value) {
    cancelAnimationFrame(ref.current);
    ref.current = requestAnimationFrame(function () {
      setState(value);
    });
  }, []);
  useUnmount(function () {
    cancelAnimationFrame(ref.current);
  });
  return [state, setRafState];
}

function useAsyncEffect(effect, deps) {
  function isGenerator(val) {
    return typeof val[Symbol.asyncIterator] === 'function';
  }

  useEffect(function () {
    var cancelled = false;
    var e = effect();

    function execute() {
      return _execute.apply(this, arguments);
    }

    function _execute() {
      _execute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!isGenerator(e)) {
                  _context.next = 11;
                  break;
                }

              case 1:

                _context.next = 4;
                return e.next();

              case 4:
                result = _context.sent;

                if (!(cancelled || result.done)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("break", 9);

              case 7:
                _context.next = 1;
                break;

              case 9:
                _context.next = 13;
                break;

              case 11:
                _context.next = 13;
                return e;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _execute.apply(this, arguments);
    }

    execute();
    return function () {
      cancelled = true;
    };
  }, deps);
}

function useSet(initialVal) {
  var getInitValue = function getInitValue() {
    return initialVal === undefined ? new Set() : new Set(initialVal);
  };

  var _useState = useState(function () {
    return getInitValue();
  }),
      _useState2 = _slicedToArray(_useState, 2),
      set = _useState2[0],
      setSet = _useState2[1];

  var add = function add(val) {
    if (set.has(val)) {
      return;
    }

    setSet(function (prevSet) {
      var temp = new Set(prevSet);
      temp.add(val);
      return temp;
    });
  };

  var remove = function remove(val) {
    if (!set.has(val)) {
      return;
    }

    setSet(function (prevSet) {
      var temp = new Set(prevSet);
      temp.delete(val);
      return temp;
    });
  };

  var setAll = function setAll(val) {
    setSet(new Set(val));
  };

  var reset = function reset() {
    return setSet(getInitValue());
  };

  var clear = function clear() {
    return setSet(new Set());
  };

  return [set, {
    add: useMemoizedFn(add),
    remove: useMemoizedFn(remove),
    setAll: useMemoizedFn(setAll),
    reset: useMemoizedFn(reset),
    clear: useMemoizedFn(clear)
  }];
}

function useMap(initialValue) {
  var getInitValue = function getInitValue() {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  };

  var _useState = useState(function () {
    return getInitValue();
  }),
      _useState2 = _slicedToArray(_useState, 2),
      map = _useState2[0],
      setMap = _useState2[1];

  var set = function set(key, value) {
    setMap(function (prevMap) {
      var temp = new Map(prevMap);
      temp.set(key, value);
      return temp;
    });
  };

  var remove = function remove(key) {
    if (!map.has(key)) {
      return;
    }

    setMap(function (prevMap) {
      var temp = new Map(prevMap);
      temp.delete(key);
      return temp;
    });
  };

  var setAll = function setAll(val) {
    setMap(new Map(val));
  };

  var reset = function reset() {
    return setMap(getInitValue());
  };

  var clear = function clear() {
    return setMap(new Map());
  };

  var get = function get(key) {
    return map.get(key);
  };

  return [map, {
    set: useMemoizedFn(set),
    remove: useMemoizedFn(remove),
    setAll: useMemoizedFn(setAll),
    reset: useMemoizedFn(reset),
    clear: useMemoizedFn(clear),
    get: useMemoizedFn(get)
  }];
}

// remove external when no used
// 本模块可能会被多处引用，EXTERNAL_USED_COUNT用来保存同一external资源的使用次数

var EXTERNAL_USED_COUNT = {};

var loadScript = function loadScript(path) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var script = document.querySelector("script[src=\"".concat(path, "\"]"));

  if (!script) {
    var newScript = document.createElement('script');
    newScript.src = path;
    Object.keys(props).forEach(function (key) {
      newScript[key] = props[key];
    });
    newScript.setAttribute('data-status', 'loading');
    document.body.appendChild(newScript);
    return {
      ref: newScript,
      status: 'loading'
    };
  }

  return {
    ref: script,
    status: script.getAttribute('data-status') || 'ready'
  };
};

var loadCss = function loadCss(path) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var css = document.querySelector("link[href=\"".concat(path, "\"]"));

  if (!css) {
    var newCss = document.createElement('link');
    newCss.rel = 'stylesheet';
    newCss.href = path;
    Object.keys(props).forEach(function (key) {
      newCss[key] = props[key];
    }); // IE9+

    var isLegacyIECss = ('hideFocus' in newCss); // use preload in IE Edge (to detect load errors)

    if (isLegacyIECss && newCss.relList) {
      newCss.rel = 'preload';
      newCss.as = 'style';
    }

    newCss.setAttribute('data-status', 'loading');
    document.head.appendChild(newCss);
    return {
      ref: newCss,
      status: 'loading'
    };
  }

  return {
    ref: css,
    status: css.getAttribute('data-status') || 'ready'
  };
};

var useExternal = function useExternal(path, options) {
  var _useState = useState(path ? 'loading' : 'unset'),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var ref = useRef();
  useEffect(function () {
    var _ref$current2, _ref$current3;

    if (!path) {
      setStatus('unset');
      return;
    } // hash（#以及后面的） 永远不会提交到 server 端进行请求


    var pathname = path.replace(/[|#].*$/, '');

    if ((options === null || options === void 0 ? void 0 : options.type) === 'css' || !(options === null || options === void 0 ? void 0 : options.type) && /(^css!|\.css$)/.test(pathname)) {
      var result = loadCss(path, options === null || options === void 0 ? void 0 : options.css);
      ref.current = result.ref;
      setStatus(result.status);
    } else if ((options === null || options === void 0 ? void 0 : options.type) === 'js' || !(options === null || options === void 0 ? void 0 : options.type) && /(^js!|\.js$)/.test(pathname)) {
      var _result = loadScript(path, options === null || options === void 0 ? void 0 : options.js);

      ref.current = _result.ref;
      setStatus(_result.status);
    } else {
      // do nothing
      console.error("Cannot infer the type of external resource, and please provide a type ('js' | 'css'). " + 'Refer to the https://ahooks.js.org/hooks/dom/use-external/#options');
    }

    if (!ref.current) {
      return;
    }

    if (EXTERNAL_USED_COUNT[path] === undefined) {
      EXTERNAL_USED_COUNT[path] = 1;
    } else {
      EXTERNAL_USED_COUNT[path] += 1;
    }

    var handler = function handler(e) {
      var _ref$current;

      var targetStatus = e.type === 'load' ? 'ready' : 'error';
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.setAttribute('dats-status', targetStatus);
      setStatus(targetStatus);
    };

    (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.addEventListener('load', handler);
    (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.addEventListener('error', handler);
    return function () {
      var _ref$current4, _ref$current5;

      (_ref$current4 = ref.current) === null || _ref$current4 === void 0 ? void 0 : _ref$current4.removeEventListener('load', handler);
      (_ref$current5 = ref.current) === null || _ref$current5 === void 0 ? void 0 : _ref$current5.removeEventListener('error', handler);
      EXTERNAL_USED_COUNT[path] -= 1;

      if (EXTERNAL_USED_COUNT[path] === 0) {
        var _ref$current6;

        (_ref$current6 = ref.current) === null || _ref$current6 === void 0 ? void 0 : _ref$current6.remove();
      }

      ref.current = undefined;
    };
  }, [path]);
  return status;
};

function useDebounceFn(fn, options) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error("useDebounceFn expected parameter is a function, got ".concat(_typeof(fn)));
    }
  }

  var fnRef = useLatest(fn);
  var wait = (options === null || options === void 0 ? void 0 : options.wait) || 1000;
  var debounced = useMemo(function () {
    return debounce(function () {
      // fnRef.current要bind的话，需要fn进行bind之后再传进来
      // 为何 return
      // 1. debounced.flush 会立即执行函数并return（若有返回值），flush作用是取消并立即执行一次
      // 2. leading 为 true 时且fnRef.current有返回值才有效
      return fnRef.current.apply(fnRef, arguments);
    }, wait, options);
  }, []);
  useUnmount(function () {
    debounced.cancel();
  });
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
}

function useDebounce(value, options) {
  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      debounced = _useState2[0],
      setDebounced = _useState2[1];

  var _useDebounceFn = useDebounceFn(function () {
    setDebounced(value);
  }, options),
      run = _useDebounceFn.run;

  useEffect(function () {
    return run();
  }, [value]);
  return debounced;
}

function useDebounceEffect(effect, deps, options) {
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      flag = _useState2[0],
      setFlag = _useState2[1];

  var _useDebounceFn = useDebounceFn(function () {
    setFlag({});
  }, options),
      run = _useDebounceFn.run;

  useEffect(function () {
    return run();
  }, deps); // useDebounceFn 内部已实现 useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

function useThrottleFn(fn, options) {
  var _options$wait;

  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error("useThrottleFn expected parameter is a function, got ".concat(_typeof(fn)));
    }
  }

  var fnRef = useLatest(fn);
  var wait = (_options$wait = options === null || options === void 0 ? void 0 : options.wait) !== null && _options$wait !== void 0 ? _options$wait : 1000;
  var throttled = useMemo(function () {
    return throttle(function () {
      // fnRef.current要bind的话，需要fn进行bind之后再传进来
      // 为何 return
      // 1. debounced.flush 会立即执行函数并return（若有返回值），flush作用是取消并立即执行一次
      // 2. leading 为 true 时且fnRef.current有返回值才有效
      return fnRef.current.apply(fnRef, arguments);
    }, wait, options);
  }, []);
  useUnmount(function () {
    throttled.cancel();
  });
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}

function useThrottle(value, options) {
  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      throttled = _useState2[0],
      setThrottled = _useState2[1];

  var _useThrottleFn = useThrottleFn(function () {
    setThrottled(value);
  }, options),
      run = _useThrottleFn.run;

  useEffect(function () {
    return run();
  }, [value]);
  return throttled;
}

export { useAsyncEffect, useBoolean, useCookieState, useDebounce, useDebounceEffect, useDebounceFn, useExternal, useGetState, useLatest, useLocalStorageState, useMap, useMemoizedFn, useMount, usePrevious, useRafState, useSafeState, useSet, useThrottle, useThrottleFn, useToggle, useUnmount, useUnmountedRef, useUpdateEffect, index as useUpdateLayoutEffect };

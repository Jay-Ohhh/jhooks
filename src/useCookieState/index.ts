import Cookies from 'js-cookie';
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isFunction } from '../utils';

export type State = string | undefined;

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State);
}

function useCookieState(cookieKey: string, options: Options = {}) {
  // https://github.com/alibaba/hooks/issues/800
  /**
      Disabling cookies on each of these browsers disable the following:
      Chrome: cookies, localStorage, sessionStorage, IndexedDB
      Firefox: cookies, localStorage, sessionStorage
      IE: cookies only
     */
  function getCookieValue() {
    try {
      const cookieValue = Cookies.get(cookieKey);
      if (typeof cookieValue === 'string') return cookieValue;
    } catch (e) {
      console.error(e);
    }
    if (isFunction(options.defaultValue)) {
      return options.defaultValue();
    }
    return options.defaultValue;
  }

  const [state, setState] = useState<State>(() => getCookieValue());

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      try {
        const { defaultValue, ...restOptions } = { ...options, ...newOptions };
        setState((prevState) => {
          const value = isFunction(newValue) ? newValue(prevState) : newValue;
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
    },
  );

  return [state, updateState] as const;
}

export default useCookieState;

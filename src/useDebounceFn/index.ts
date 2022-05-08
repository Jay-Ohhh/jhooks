import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

type noop = (...args: any[]) => any;

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait || 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          // fnRef.current要bind的话，需要fn进行bind之后再传进来
          // 为何 return
          // 1. debounced.flush 会立即执行函数并return（若有返回值），flush作用是取消并立即执行一次
          // 2. leading 为 true 时且fnRef.current有返回值才有效
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;

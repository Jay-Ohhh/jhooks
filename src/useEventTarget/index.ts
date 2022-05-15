import { useState, useCallback } from 'react';
import useLatest from '../useLatest';

interface EventTarget<U> {
  target: {
    value: U;
  };
}

export interface Options<T, U> {
  initialValue?: T;
  transformer?: (value: U) => T;
}

function useEventTarget<T, U = T>(options?: Options<T, U>) {
  const { initialValue, transformer } = options || {};
  const [value, setValue] = useState<T | string>(initialValue || '');

  const transformerRef = useLatest(transformer);

  const reset = useCallback(() => {
    setValue(initialValue || '');
  }, []);

  const onChange = useCallback((e: EventTarget<U>) => {
    const _value = e.target.value;
    // 为什么不直接使用transformer？因为存在闭包陷阱，transformer不是最新的
    if (typeof transformerRef.current === 'function') {
      setValue(transformerRef.current(_value));
      return;
    }
    // no transformer => U and T should be the same
    setValue(_value as unknown as T);
  }, []);

  return [
    value,
    {
      onChange,
      reset,
    },
  ] as const;
}

export default useEventTarget;

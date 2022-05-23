import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

export interface Options {
  min?: number;
  max?: number;
}

export interface Actions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((preVal: number) => number)) => void;
  reset: () => void;
}

export type ValueParam = number | ((preVal: number) => number);

function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  if (typeof max === 'number') {
    target = Math.min(max, target);
  }
  if (typeof min === 'number') {
    target = Math.max(min, target);
  }
  return target;
}

function useCounter(initialValue: number = 0, options: Options = {}) {
  const { min, max } = options;

  const [current, setCurrent] = useState(() => getTargetValue(initialValue, { min, max }));

  const setValue = (value: ValueParam) => {
    setCurrent((c) => {
      const target = typeof value === 'number' ? value : value(c);
      return getTargetValue(target, { min, max });
    });
  };

  const inc = (delta: number = 1) => setValue((c) => c + delta);
  const dec = (delta: number = 1) => setValue((c) => c - delta);
  const set = (value: ValueParam) => setValue(value);
  const reset = () => setValue(initialValue);

  return [
    current,
    {
      inc: useMemoizedFn(inc),
      dec: useMemoizedFn(dec),
      set: useMemoizedFn(set),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}

export default useCounter;

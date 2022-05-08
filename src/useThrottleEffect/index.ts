import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { ThrottleOptions } from '../useThrottleFn';
import useThrottleFn from '../useThrottleFn';
import useUnmount from '../useUnmount';
import useUpdateEffect from '../useUpdateEffect';

function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({});

  const { run } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  // useThrottleFn 内部已实现 useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;

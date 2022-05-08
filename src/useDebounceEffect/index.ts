import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { DebounceOptions } from '../useDebounceFn';
import useDebounceFn from '../useDebounceFn';
import useUnmount from '../useUnmount';
import useUpdateEffect from '../useUpdateEffect';

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({});

  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  // useDebounceFn 内部已实现 useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;

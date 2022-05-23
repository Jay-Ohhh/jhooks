import isEqual from 'lodash/isEqual';
import type { DependencyList, EffectCallback } from 'react';
import { useRef } from 'react';
import type { BasicTarget } from './domTarget';
import useEffectWithTarget from './useEffectWithTarget';

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList) => {
  return isEqual(aDeps, bDeps);
};

// useDeepCompareEffectWidthTarget 与 useEffectWithTarget的区别是：深度比较新旧deps
const useDeepCompareEffectWidthTarget = (
  effect: EffectCallback,
  deps: DependencyList,
  target: BasicTarget<any> | BasicTarget<any>[],
) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef({});

  if (!depsEqual(deps, ref.current || [])) {
    ref.current = deps;
    signalRef.current = {};
  }

  useEffectWithTarget(effect, [signalRef.current], target);
};

export default useDeepCompareEffectWidthTarget;

import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

type Effect = (
  changes?: number[],
  previousDeps?: DependencyList,
  currentDeps?: DependencyList,
) => void | (() => void);

const diffTwoDeps = (deps1?: DependencyList, deps2?: DependencyList) => {
  //As this func is used only in this hook, we assume 2 deps always have same length.
  return deps1
    ? deps1.map((d, index) => (deps1[index] !== deps2?.[index] ? index : -1)).filter((d) => d >= 0)
    : deps2
    ? deps2.map((d, index) => index)
    : [];
};

const useTrackedEffect = (effect: Effect, deps?: DependencyList) => {
  const previousDepsRef = useRef<DependencyList>();

  useEffect(() => {
    const changes = diffTwoDeps(previousDepsRef.current, deps);
    const previousDeps = previousDepsRef.current;
    previousDepsRef.current = deps;
    return effect(changes, previousDeps, deps);
  }, deps);
};

export default useTrackedEffect;

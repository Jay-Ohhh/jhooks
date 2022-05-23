import isEqual from 'lodash/isEqual';
import { useRef } from 'react';
import type { DependencyList, useEffect, useLayoutEffect } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList) => {
  return isEqual(aDeps, bDeps);
};

const createDeepCompareEffect: (hook: EffectHookType) => EffectHookType =
  (hook) => (effect, deps: DependencyList) => {
    if (process.env.NODE_ENV === 'development') {
      if (!deps || !deps.length) {
        console.error(
          'This hook should not be used with no dependencies. Use React.useEffect instead.',
        );
      }
    }

    const ref = useRef<DependencyList>([]);
    const signalRef = useRef<{}>({});

    if (!depsEqual(deps, ref.current)) {
      ref.current = deps;
      signalRef.current = {};
    }

    hook(effect, [signalRef.current]);
  };

export default createDeepCompareEffect;

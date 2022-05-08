import type { DependencyList } from 'react';

export default function depsAreSame(oldDeps: DependencyList, newDeps: DependencyList) {
  if (oldDeps === newDeps) return true;
  if (oldDeps.length !== newDeps.length) return false;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], newDeps[i])) return false;
  }
  return true;
}

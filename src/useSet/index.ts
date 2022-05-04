import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useSet<K>(initialVal?: Iterable<K>) {
  const getInitValue = () => {
    return initialVal === undefined ? new Set<K>() : new Set(initialVal);
  };

  const [set, setSet] = useState<Set<K>>(() => getInitValue());

  const add = (val: K) => {
    if (set.has(val)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.add(val);
      return temp;
    });
  };

  const remove = (val: K) => {
    if (!set.has(val)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.delete(val);
      return temp;
    });
  };

  const setAll = (val: Iterable<K>) => {
    setSet(new Set(val));
  };

  const reset = () => setSet(getInitValue());

  const clear = () => setSet(new Set());

  return [
    set,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      setAll: useMemoizedFn(setAll),
      reset: useMemoizedFn(reset),
      clear: useMemoizedFn(clear),
    },
  ] as const;
}

export default useSet;

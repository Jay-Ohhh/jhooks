import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const getInitValue = () => (initialValue === undefined ? new Map<K, T>() : new Map(initialValue));

  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  const set = (key: K, value: T) => {
    setMap((prevMap) => {
      const temp = new Map(prevMap);
      temp.set(key, value);
      return temp;
    });
  };

  const remove = (key: K) => {
    if (!map.has(key)) {
      return;
    }
    setMap((prevMap) => {
      const temp = new Map(prevMap);
      temp.delete(key);
      return temp;
    });
  };

  const setAll = (val: Iterable<readonly [K, T]>) => {
    setMap(new Map(val));
  };

  const reset = () => setMap(getInitValue());

  const clear = () => setMap(new Map());

  const get = (key: K) => map.get(key);

  return [
    map,
    {
      set: useMemoizedFn(set),
      remove: useMemoizedFn(remove),
      setAll: useMemoizedFn(setAll),
      reset: useMemoizedFn(reset),
      clear: useMemoizedFn(clear),
      get: useMemoizedFn(get),
    },
  ] as const;
}

export default useMap;

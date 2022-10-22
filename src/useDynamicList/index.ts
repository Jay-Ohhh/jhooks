import { useCallback, useRef, useState } from 'react';
import { arrayMoveMutable } from '../utils';

const useDynamicList = <T>(initialList: T[] = []) => {
  const counterRef = useRef(-1);

  const keyList = useRef<number[]>([]);

  const setKey = useCallback((index: number) => {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  const [list, setList] = useState(() => {
    initialList.forEach((_, index) => {
      setKey(index);
    });

    return initialList;
  });

  const resetList = useCallback((newList: T[]) => {
    keyList.current = [];
    setList(() => {
      newList.forEach((_, index) => {
        setKey(index);
      });

      return newList;
    });
  }, []);

  const insert = useCallback((item: T, index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 0, item);
      setKey(index);

      return temp;
    });
  }, []);

  const getKey = useCallback((index: number) => keyList.current[index], []);

  const getIndex = useCallback(
    (key: number) => keyList.current.findIndex((item) => item === key),
    [],
  );

  /**
   * if `index` is set, merge items before index,
   * or else push items in the last of array.
   */
  const merge = useCallback((items: T[], index?: number) => {
    setList((l) => {
      const temp = [...l];
      if (typeof index !== 'number' || index >= l.length) {
        index = l.length;
      }

      items.forEach((_, i) => {
        setKey(index! + i);
      });

      temp.splice(index, 0, ...items);

      return temp;
    });
  }, []);

  const replace = useCallback((item: T, index: number) => {
    setList((l) => {
      const temp = [...l];
      temp[index] = item;

      return temp;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);
      keyList.current.splice(index, 1);

      return temp;
    });
  }, []);

  const move = useCallback((oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return;

    setList((l) => {
      const temp = [...l];
      arrayMoveMutable(temp, oldIndex, newIndex);
      arrayMoveMutable(keyList.current, oldIndex, newIndex);

      return temp;
    });
  }, []);

  const push = useCallback((items: T[]) => {
    setList((l) => {
      items.forEach((_, i) => {
        setKey(l.length + i);
      });

      return l.concat(items);
    });
  }, []);

  const pop = useCallback(() => {
    setList((l) => {
      keyList.current.pop();

      return l.slice(0, -1);
    });
  }, []);

  const unshift = useCallback((items: T[]) => {
    setList((l) => {
      items.forEach((_, i) => {
        setKey(0 + i);
      });

      return items.concat(l);
    });
  }, []);

  const shift = useCallback(() => {
    setList((l) => {
      keyList.current.shift();

      return l.slice(1);
    });
  }, []);

  const sortList = useCallback((result: T[]) => {
    return result
      .map((item, index) => ({ key: index, item }))
      .sort((a, b) => getIndex(a.key) - getIndex(b.key))
      .filter((item) => !!item.item)
      .map((item) => item.item);
  }, []);

  return {
    list,
    insert,
    merge,
    replace,
    remove,
    getKey,
    getIndex,
    move,
    push,
    pop,
    unshift,
    shift,
    sortList,
    resetList,
  };
};

export default useDynamicList;

import { useRef, useCallback } from 'react';
import useLatest from '../useLatest';

function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) {
  const lockRef = useRef(false);
  const fnRef = useLatest(fn);

  return useCallback(async (...args: P) => {
    if (lockRef.current) return;
    lockRef.current = true;
    try {
      const res = await fnRef.current(...args);
      return res;
    } catch (e) {
      throw e;
    } finally {
      lockRef.current = false;
    }
  }, []);
}

export default useLockFn;

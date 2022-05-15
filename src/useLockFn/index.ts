import { useRef, useCallback } from 'react';

function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        const res = await fn(...args);
        return res;
      } catch (e) {
        throw e;
      } finally {
        lockRef.current = false;
      }
    },
    [fn],
  );
}

export default useLockFn;

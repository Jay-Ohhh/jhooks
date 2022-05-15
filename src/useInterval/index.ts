import { useEffect } from 'react';
import useLatest from '../useLatest';

function useInterval(
  fn: () => void,
  delay = 0,
  options?: {
    immediate?: boolean;
  },
) {
  const fnRef = useLatest(fn);

  const immediate = options?.immediate;

  useEffect(() => {
    if (typeof delay === 'undefined' || delay < 0) return;

    if (immediate) fnRef.current();

    const timer = setInterval(() => {
      fnRef.current();
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}

export default useInterval;

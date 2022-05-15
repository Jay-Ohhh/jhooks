import { useEffect } from 'react';
import useLatest from '../useLatest';

interface Handle {
  id: number | NodeJS.Timer;
}

const setRafInterval = (callback: () => void, delay = 0): Handle => {
  if (typeof requestAnimationFrame === 'undefined') {
    return {
      id: setInterval(callback, delay),
    };
  }

  const handle: Handle = {
    id: 0,
  };
  let startTime = new Date().getTime();

  const loop = () => {
    const currentTime = new Date().getTime();
    if (currentTime - startTime >= delay) {
      callback();
      startTime = new Date().getTime();
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

const clearRafInterval = (handle: Handle) => {
  if (typeof cancelAnimationFrame === 'undefined') {
    clearInterval(handle.id as NodeJS.Timer);
    return;
  }
  cancelAnimationFrame(handle.id as number);
};

function useRafInterval(
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

    const timer = setRafInterval(() => {
      fnRef.current();
    }, delay);

    return () => {
      clearRafInterval(timer);
    };
  }, [delay]);
}

export default useRafInterval;

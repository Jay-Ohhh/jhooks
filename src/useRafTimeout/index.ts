import { useEffect } from 'react';
import useLatest from '../useLatest';

interface Handle {
  id: number | NodeJS.Timeout;
}

const setRafTime = (callback: () => void, delay = 0): Handle => {
  if (typeof requestAnimationFrame === 'undefined') {
    return {
      id: setTimeout(callback, delay),
    };
  }

  const handle: Handle = {
    id: 0,
  };
  const startTime = new Date().getTime();
  const loop = () => {
    const currentTime = new Date().getTime();
    if (currentTime - startTime >= delay) {
      callback();
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

const clearRafTimeout = (handle: Handle) => {
  if (typeof cancelAnimationFrame === 'undefined') {
    clearTimeout(handle.id as NodeJS.Timeout);
    return;
  }
  cancelAnimationFrame(handle.id as number);
};

function useRafTimeout(fn: () => void, delay = 0) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (typeof delay === 'undefined' || delay < 0) return;

    const timer = setRafTime(() => {
      fnRef.current();
    }, delay);

    return () => {
      clearRafTimeout(timer);
    };
  }, [delay]);
}
export default useRafTimeout;

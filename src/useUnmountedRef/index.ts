import { useEffect, useRef } from 'react';

const useUnmountedRef = () => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = false;
    return () => {
      ref.current = true;
    };
  }, []);

  return ref;
};

export default useUnmountedRef;

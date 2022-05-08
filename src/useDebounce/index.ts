import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';
import type { DebounceOptions } from '../useDebounceFn';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    return run();
  }, [value]);

  return debounced;
}

export default useDebounce;

import { useCallback, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useUnmount from '../useUnmount';

function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useRafState<S>(initialState?: S) {
  const ref = useRef(0);
  const [state, setState] = useState(initialState);

  // requestAnimationFrame方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行(此时虽然还没重绘，但DOM元素的尺寸已确定)
  const setRafState = useCallback((value?: S | ((prevState?: S) => S)) => {
    cancelAnimationFrame(ref.current);

    ref.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });

  return [state, setRafState] as const;
}

export default useRafState;

import { useState } from 'react';
import useEventListener from '../useEventListener';
import type { BasicTarget } from '../utils/domTarget';

export interface Options {
  onEnter?: (e?: MouseEvent) => void;
  onLeave?: (e?: MouseEvent) => void;
}

function useHover(target: BasicTarget, options?: Options) {
  const [state, setState] = useState(false);

  const { onEnter, onLeave } = options || {};
  useEventListener(
    'mouseenter',
    (e) => {
      if (!state) {
        onEnter?.(e);
        setState(true);
      }
    },
    { target },
  );

  useEventListener(
    'mouseleave',
    (e) => {
      if (state) {
        onLeave?.(e);
        setState(false);
      }
    },
    { target },
  );

  return state;
}

export default useHover;

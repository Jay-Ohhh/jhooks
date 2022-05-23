import { useState } from 'react';
import screenfull from 'screenfull';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

export interface Options {
  onEnter?: () => void;
  onExit?: () => void;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onEnter, onExit } = options || {};
  const onEnterRef = useLatest(onEnter);
  const onExitRef = useLatest(onExit);

  const [state, setState] = useState(false);
  const onChange = () => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull;
      if (isFullscreen) {
        onEnterRef.current?.();
      } else {
        // Remove a previously registered event listener.
        screenfull.off('change', onChange);
        onExitRef.current?.();
      }
      setState(isFullscreen);
    }
  };

  const enterFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) return;
    if (screenfull.isEnabled) {
      try {
        // Make an element fullscreen.
        // Accepts a DOM element and FullscreenOptions.
        screenfull.request(el);
        // Add a listener for when the browser switches in and out of fullscreen
        screenfull.on('change', onChange);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const exitFullscreen = () => {
    if (!state) return;
    if (screenfull.isEnabled) {
      // Brings you out of fullscreen.
      // Returns a promise that resolves after the element exits fullscreen.
      screenfull.exit();
    }
  };

  const toggleFullscreen = () => {
    if (state) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useUnmount(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', onChange);
    }
  });

  return [
    state,
    {
      enterFullscreen: useMemoizedFn(enterFullscreen),
      exitFullscreen: useMemoizedFn(exitFullscreen),
      toggleFullscreen: useMemoizedFn(toggleFullscreen),
      isEnabled: screenfull.isEnabled,
    },
  ] as const;
};

export default useFullscreen;

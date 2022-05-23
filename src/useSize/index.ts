import ResizeObserver from 'resize-observer-polyfill';
import useRafState from '../useRafState';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useIseIsomorphicLayoutEffectWidthTarget from '../utils/useIsomorphicLayoutEffectWidthTarget';

type Size = { width: number; height: number };

function useSize(target: BasicTarget): Size | undefined {
  const [state, setState] = useRafState<Size>();

  useIseIsomorphicLayoutEffectWidthTarget(
    () => {
      const el = getTargetElement(target);
      if (!el) return;

      const resizerObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setState({
            width: clientWidth,
            height: clientHeight,
          });
        });
      });

      resizerObserver.observe(el);

      return () => {
        resizerObserver.disconnect();
      };
    },
    [],
    target,
  );

  return state;
}

export default useSize;

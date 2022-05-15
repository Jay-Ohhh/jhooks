import isBrowser from './isBrowser';
import useEffectWithTarget from './useEffectWithTarget';
import useLayoutEffectWithTarget from './useLayoutEffectWithTarget';

const useIseIsomorphicLayoutEffectWidthTarget = isBrowser
  ? useLayoutEffectWithTarget
  : useEffectWithTarget;

export default useIseIsomorphicLayoutEffectWidthTarget;

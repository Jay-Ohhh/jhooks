import { useLayoutEffect } from 'react';
import createEffectWithTarget from './createEffectWithTarget';

const useLayoutEffectWithTarget = createEffectWithTarget(useLayoutEffect);

export default useLayoutEffectWithTarget;

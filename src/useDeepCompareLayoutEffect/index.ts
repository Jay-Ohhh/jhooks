import { useLayoutEffect } from 'react';
import createDeepCompareEffect from '../createDeepCompareEffect';

const useDeepCompareLayoutEffect = createDeepCompareEffect(useLayoutEffect);

export default useDeepCompareLayoutEffect;

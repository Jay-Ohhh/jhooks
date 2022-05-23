import { useEffect } from 'react';
import createDeepCompareEffect from '../createDeepCompareEffect';

const useDeepCompareEffect = createDeepCompareEffect(useEffect);

export default useDeepCompareEffect;

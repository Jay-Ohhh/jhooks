import { useEffect, useMemo, useState, useRef } from 'react';
import useEventListener from '../useEventListener';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useSize from '../useSize';
import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';

export interface Options<T> {
  containerTarget: BasicTarget; // 外面容器
  wrapperTarget: BasicTarget; // 内部容器
  itemHeight: number | ((index: number, data: T) => number); // 行高度，静态高度可以直接写入像素值，动态高度可传入函数	n
  overscan?: number; // 视区上、下额外展示的 DOM 节点数量
}

function useVirtualList<T = any>(list: T[], options: Options<T>) {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options;
  const itemHeightRef = useLatest(itemHeight);
  const size = useSize(containerTarget);
  // flag: function scrollTo triggers scroll
  const scrollTriggerByScrollToFunc = useRef(false);

  const [targetList, setTargetList] = useState<{ index: number; data: T }[]>([]);

  // 获取距离父容器顶部（包括被遮挡一部分的）第一个元素的在list中的index
  const getOffset = (scrollTop: number) => {
    if (typeof itemHeightRef.current === 'number') {
      return Math.floor(scrollTop / itemHeightRef.current);
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset;
  };
  // 获取显示的数量，包括顶部被遮挡一部分的元素，包括底部被遮挡一部分的元素
  const getVisibleCount = (containerHeight: number, startIndex: number) => {
    if (typeof itemHeightRef.current === 'number') {
      return Math.ceil(containerHeight / itemHeightRef.current);
    }
    let sum = 0;
    let endIndex = 0;
    for (let i = startIndex; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      if (sum > containerHeight) {
        endIndex = i;
        break;
      }
    }
    return endIndex - startIndex;
  };

  // 获取上部高度(若容器内顶部第一个元素被遮挡一部分，则不包括这个元素的高度)
  const getDistanceTop = (index: number) => {
    if (typeof itemHeightRef.current === 'number') {
      const height = index * itemHeightRef.current;
      return height;
    }

    const height = list.slice(0, index).reduce((sum, currentValue, currentIndex) => {
      // @ts-ignore
      return sum + itemHeightRef.current(currentIndex, currentValue);
    }, 0);
    return height;
  };

  const totalHeight = useMemo(() => {
    if (typeof itemHeightRef.current === 'number') {
      return list.length * itemHeightRef.current;
    }
    const height = list.reduce((sum, currentValue, currentIndex) => {
      // @ts-ignore
      return sum + itemHeightRef.current(currentIndex, currentValue);
    }, 0);
    return height;
  }, [list]);

  const calculateRange = () => {
    const container = getTargetElement(containerTarget);
    const wrapper = getTargetElement(wrapperTarget);

    if (container && wrapper) {
      const { scrollTop, clientHeight } = container;
      const offset = getOffset(scrollTop);
      const visibleCount = getVisibleCount(clientHeight, offset);

      const start = Math.max(0, offset - overscan);
      const end = Math.min(list.length, offset + visibleCount + overscan);

      const offsetTop = getDistanceTop(start);

      // @ts-ignore
      wrapper.style.height = totalHeight - offsetTop + 'px';
      // @ts-ignore
      wrapper.style.marginTop = offsetTop + 'px';

      setTargetList(
        list.slice(start, end).map((data, index) => ({
          data,
          index: index + start, // 在list中的index
        })),
      );
    }
  };

  useEffect(() => {
    if (!size?.width || !size?.height) return;
    calculateRange();
  }, [size?.width, size?.height, list]);

  useEventListener(
    'scroll',
    (e) => {
      if (scrollTriggerByScrollToFunc.current) {
        scrollTriggerByScrollToFunc.current = false;
        return;
      }
      e.preventDefault();
      calculateRange();
    },
    {
      target: containerTarget,
    },
  );
  const scrollTo = (index: number) => {
    const container = getTargetElement(containerTarget);
    if (container) {
      scrollTriggerByScrollToFunc.current = true;
      container.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };
  return [targetList, useMemoizedFn(scrollTo)] as const;
}

export default useVirtualList;

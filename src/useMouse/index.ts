import useRafState from '../useRafState';
import useEventListener from '../useEventListener';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

export interface CursorState {
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  elementX: number; // 距离指定元素左侧的距离
  elementY: number;
  elementW: number; // 指定元素的宽
  elementH: number;
  elementPosX: number; // 指定元素距离完整页面左侧的距离
  elementPosY: number;
}

const initState: CursorState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
  elementX: NaN,
  elementY: NaN,
  elementH: NaN,
  elementW: NaN,
  elementPosX: NaN,
  elementPosY: NaN,
};

function useMouse(target?: BasicTarget) {
  const [state, setState] = useRafState<CursorState>(initState);

  useEventListener(
    'mousemove',
    (e: MouseEvent) => {
      // screen参照点：电脑屏幕左上角
      // client参照点：浏览器可视内容区域左上角
      // page参照点：网页的左上角
      // pageY = clientY + window.pageYOffset(文档垂直方向滚动距离)
      const { screenX, screenY, clientX, clientY, pageX, pageY } = e;
      const newState: CursorState = {
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        elementX: NaN,
        elementY: NaN,
        elementH: NaN,
        elementW: NaN,
        elementPosX: NaN,
        elementPosY: NaN,
      };
      const targetElement = getTargetElement(target);
      if (targetElement) {
        // 返回元素的大小及其相对于浏览器可视内容区域的位置
        const { width, height, top, left } = targetElement.getBoundingClientRect();
        newState.elementPosX = left + window.pageXOffset; // 指定元素距离完整页面左侧的距离
        newState.elementPosY = top + window.pageYOffset;
        newState.elementX = clientX - left; // 距离指定元素左侧的距离
        newState.elementY = clientY - top;
        newState.elementW = width;
        newState.elementH = height;
      }
      setState(newState);
    },
    { target: document },
  );

  return state;
}

export default useMouse;

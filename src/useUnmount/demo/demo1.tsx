/**
 * title: Basic usage
 * desc: The function is called right before the component is unmounted.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在组件卸载时，执行函数。
 */

import React from 'react';
import { useBoolean, useUnmount } from 'jhooks';
import { message } from 'antd';

const MyComponent = () => {
  useUnmount(() => {
    message.info('unmount');
  });

  return <p>Hello World!</p>;
};

export default () => {
  const [state, { toggle }] = useBoolean(true);

  return (
    <>
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};

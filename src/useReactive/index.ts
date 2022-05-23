import { useRef } from 'react';
import useCreation from '../useCreation';
import useUpdate from '../useUpdate';

// key:val - 原对象:代理过的对象
const proxyMap = new WeakMap();
// key:val - 代理过的对象:原对象
const rawMap = new WeakMap();

function isObject(val: Record<string, any>) {
  return typeof val === 'object' && val !== null;
}

function observer<T extends Record<string, any>>(initialVal: T, cb: () => void): T {
  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存，防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }

  // 防止代理已经代理过的对象
  // https://github.com/alibaba/hooks/issues/839
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  const proxy = new Proxy<T>(initialVal, {
    /**
     * @param target 目标对象
     * @param key 被获取的属性名
     * @param receiver Proxy或者继承Proxy的对象
     */
    get(target, key, receiver) {
      // Reflect.get()方法与从 对象 (target[propertyKey]) 中读取属性类似，但它是通过一个函数执行来操作的。
      const res = Reflect.get(target, key, receiver);
      // 递归代理
      return isObject(res) ? observer(res, cb) : Reflect.get(target, key);
    },
    /**
     * @param target 目标对象
     * @param key 将被设置的属性名或 Symbol
     * @param val 新属性值
     * @param receiver 最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）
     */
    set(target, key, val, receiver) {
      // Reflect.set() 工作方式就像在一个对象上设置一个属性。
      const ret = Reflect.set(target, key, val);
      // 即使是在这里触发setState更新的，只要在 React 管理的事件回调和生命周期中，setState仍是异步且批量更新的
      cb();
      return ret;
    },
    /**
     * @param target 目标对象
     * @param key 待删除的属性名
     */
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);

  return proxy;
}

function useReactive<S extends Record<string, any>>(initialState: S): S {
  const update = useUpdate();
  const stateRef = useRef(initialState);

  const state = useCreation(() => {
    return observer(stateRef.current, () => {
      update();
    });
  }, []);

  return state;
}

export default useReactive;

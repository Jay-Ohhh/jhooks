import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import useUpdateEffect from '../useUpdateEffect';
import { isFunction } from '@/utils';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}

export interface IFuncStorage {
  (): Storage;
}

export interface Options<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export interface OptionsWithDefaultValue<T> extends Options<T> {
  defaultValue: T | IFuncUpdater<T>;
}

export type StorageStateResult<T> = [T | undefined, (value?: T | IFuncUpdater<T>) => void];

export type StorageStateResultHasDefaultValue<T> = [T, (value?: T | IFuncUpdater<T>) => void];

export function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T = any>(key: string, options?: Options<T>): StorageStateResult<T>;

  function useStorageState<T>(
    key: string,
    options: OptionsWithDefaultValue<T>,
  ): StorageStateResultHasDefaultValue<T>;

  function useStorageState<T>(key: string, options?: Options<T> & OptionsWithDefaultValue<T>) {
    let storage: Storage | undefined;

    // https://github.com/alibaba/hooks/issues/800
    /**
      Disabling cookies on each of these browsers disable the following:
      Chrome: cookies, localStorage, sessionStorage, IndexedDB
      Firefox: cookies, localStorage, sessionStorage
      IE: cookies only
     */
    try {
      storage = getStorage();
    } catch (err) {
      console.error(err);
    }

    const serializer = (value: T) => {
      if (options?.serializer) {
        return options.serializer(value);
      }
      return JSON.stringify(value);
    };

    const deserializer = (value: string) => {
      if (options?.deserializer) {
        return options.deserializer(value);
      }
      return JSON.parse(value);
    };

    function getStoredValue() {
      try {
        const raw = storage?.getItem(key);
        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        console.error(e);
      }
      if (isFunction(options?.defaultValue)) {
        return options?.defaultValue();
      }
      return options?.defaultValue;
    }
    // 为什么第一次初始化时不用保存初始值在storage里，因为刷新页面后还是初始值，没必要保存到storage里
    // useState(() => fn()); // fn() 整个生命周期只会被调用一次
    const [storedValue, setStoredValue] = useState<T | undefined>(() => getStoredValue());

    useUpdateEffect(() => {
      setStoredValue(getStoredValue());
    }, [key]);

    // 实际上value还有可能是其他类型值，例如dates, regex,classes等
    // 建议使用序列化库：storybookjs/telejson
    const updateState = (value?: T | IFuncUpdater<T>) => {
      try {
        setStoredValue((prevState) => {
          const currentValue = isFunction(value) ? value(prevState) : value;
          if (currentValue === undefined) {
            storage?.removeItem(key);
          } else {
            storage?.setItem(key, serializer(currentValue));
          }
          return currentValue;
        });
      } catch (e) {
        console.error(e);
      }
    };

    return [storedValue, useMemoizedFn(updateState)];
  }

  return useStorageState;
}

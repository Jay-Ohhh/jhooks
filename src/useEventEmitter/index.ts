import React, { useEffect, useRef } from 'react';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  private subscriptions = new Map<React.Key, Subscription<T>>();

  emit = (key: React.Key, val: T) => {
    if (this.subscriptions.has(key)) {
      this.subscriptions.get(key)!(val);
    }
  };

  off = (key: React.Key) => {
    if (this.subscriptions.has(key)) {
      this.subscriptions.delete(key);
    }
  };

  // on
  useSubscription = (key: React.Key, callback: Subscription<T>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const callbackRef = useRef<Subscription<T>>();
    callbackRef.current = callback;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      function subscription(val: T) {
        callbackRef.current?.(val);
      }
      this.subscriptions.set(key, subscription);
      return () => {
        this.off(key);
      };
    }, []);
  };
}

export default function useEventEmitter<T = void>() {
  const ref = useRef<EventEmitter<T>>();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
}

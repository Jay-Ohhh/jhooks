import React from 'react';
import { useSet } from 'jhooks';

export default () => {
  const [set, { add, remove, reset, clear, setAll }] = useSet<number | string>(['Hello']);

  return (
    <div>
      <button type="button" onClick={() => add(String(Date.now()))}>
        Add Timestamp
      </button>
      <button
        type="button"
        onClick={() => remove('Hello')}
        disabled={!set.has('Hello')}
        style={{ margin: '0 8px' }}
      >
        Remove Hello
      </button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <button type="button" style={{ marginLeft: 8 }} onClick={() => clear()}>
        clear
      </button>
      <button type="button" style={{ marginLeft: 8 }} onClick={() => setAll([1, 2, 3])}>
        set [1, 2, 3]
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
      </div>
    </div>
  );
};

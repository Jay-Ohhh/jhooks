import { useDebounceEffect } from 'jhooks';
import React, { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);
  useDebounceEffect(
    () => {
      setRecords((val) => [...val, value]);
    },
    [value],
    {
      wait: 2000,
    },
  );
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <div style={{ marginTop: 16 }}>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default () => {
  const [show, setShow] = useState(true)

  return <div>
    <button style={{ marginBottom: 10 }} onClick={() => { setShow(!show) }}>
      {show ? 'unmount' : 'mount'}
    </button>
    {show &&
      <MyComponent />}
  </div>
};

import React, { useState, useCallback } from 'react';
import { Card, Button } from 'antd';
import { createModal, useModel } from '@/components/useHammer';

const useCount = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  return { count, increment, decrement };
};

const CounterProvider = createModal(useCount);

const Counter1: React.FC = () => {
  const { count, increment } = useModel();

  return (
    <Card>
      计数：{count}
      <Button type="primary" onClick={increment}>
        +
      </Button>
    </Card>
  );
};

const Counter2: React.FC = () => {
  const { count, decrement } = useModel();
  return (
    <Card>
      计数：{count}
      <Button type="primary" onClick={decrement}>
        -
      </Button>
    </Card>
  );
};

export default () => (
  <>
    <CounterProvider>
      <Counter1 />
      <Counter2 />
    </CounterProvider>
  </>
);

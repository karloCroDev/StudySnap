'use client';

// External packages
import * as React from 'react';

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debounce, setDebounce] = React.useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
};

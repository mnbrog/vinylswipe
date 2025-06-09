import { useRef } from 'react';

export function useDebounce(callback, ms = 300) {
  const ref = useRef();
  return (value) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => callback(value), ms);
  };
}

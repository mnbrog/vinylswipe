import { useRef } from 'react';

export function useThrottle(callback, ms = 300) {
  const last = useRef(0);
  return (...args) => {
    const now = Date.now();
    if (now - last.current > ms) {
      last.current = now;
      callback(...args);
    }
  };
}

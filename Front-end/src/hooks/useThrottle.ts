import { useCallback, useRef } from "react";

export function useThrottle(
  callback: (...args: any[]) => void,
  delay: number = 300
) {
  const isThrottling = useRef(false);

  const throttledFunction = useCallback(
    (...args: any[]) => {
      if (!isThrottling.current) {
        callback(...args); 
        isThrottling.current = true;

        setTimeout(() => {
          isThrottling.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );

  return throttledFunction;
}

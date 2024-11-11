import { DependencyList, useEffect, useRef } from "react";

export default function useDebouncedEffect(
  callback: () => void,
  delay: number = 300,
  deps: DependencyList
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => callbackRef.current(), delay);

    return () => clearTimeout(handler);
  }, [delay, ...deps]);
}

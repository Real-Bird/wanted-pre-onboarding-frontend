import { useRef } from "react";

export default function useDebounce<T>() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return (callBackFn: CallBackFnType<T>, delay: number) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callBackFn();
    }, delay);
  };
}

type CallBackFnType<T> = (data?: unknown) => T;

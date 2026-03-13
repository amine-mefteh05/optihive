"use client";
import { useState } from "react";
import { useEffect } from "react";
import { getItem, setItem } from "./darkmode";
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    return getItem<T>(key) ?? initialValue;
  });
  useEffect(() => {
    setItem(key, value);
  }, [value]);
  return [value, setValue] as const;
}

export default useLocalStorage;

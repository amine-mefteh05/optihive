"use client";
import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";
function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return [darkMode, toggleDarkMode] as const;
}

export default useDarkMode;

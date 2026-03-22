"use client";
import { useEffect } from "react";
import { getItem } from "./localstorage";

export default function useApplyDarkmode() {
  useEffect(() => {
    const isDarkmode = getItem<boolean>("darkMode");
    if (isDarkmode) {
      globalThis.document?.documentElement?.classList?.add("dark");
    } else {
      globalThis.document?.documentElement?.classList?.remove("dark");
    }
  }, []);
}

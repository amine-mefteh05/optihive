"use client";
import useDarkMode from "../darkmode/useDarkMode";
import { Sun, Moon } from "lucide-react";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
function DarkModeToggle() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Button size="sm" variant="secondary" onClick={toggleDarkMode}>
      {mounted ? darkMode ? <Moon /> : <Sun /> : <Sun />}
    </Button>
  );
}

export default DarkModeToggle;

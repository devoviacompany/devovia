import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/site/icons/general";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  useEffect(() => {
    // Check for dark mode preference on initial load
    if (typeof window !== "undefined") {
      const isDark =
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(isDark);
      updateTheme(isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded hover:bg-muted transition-colors relative flex cursor-pointer items-center justify-center rounded-xl p-2 text-neutral-500 dark:text-neutral-500"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <SunIcon className="size-4 text-gray-600" />
      ) : (
        <MoonIcon className="size-4 text-gray-600" />
      )}
    </button>
  );
}

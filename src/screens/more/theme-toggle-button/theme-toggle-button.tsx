"use client";
import { useEffect, useState } from "react";

export const ThemeToggleButton = ({
  buttonClassName,
}: {
  buttonClassName: string;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsDarkMode(theme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode((prev) => !prev);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#000000");
    } else {
      document.documentElement.classList.remove("dark");
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#ffffff");
    }
  };

  return (
    <button className={buttonClassName} onClick={toggleTheme}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

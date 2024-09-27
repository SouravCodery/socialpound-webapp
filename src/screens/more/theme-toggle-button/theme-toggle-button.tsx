"use client";
import { useEffect, useState } from "react";

export const ThemeToggleButton = ({
  buttonClassName,
}: {
  buttonClassName: string;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let theme = localStorage.getItem("theme");

    if (!theme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      theme = prefersDark ? "dark" : "light";
    }

    setIsDarkMode(theme === "dark");
    document.documentElement.classList.add(theme === "dark" ? "dark" : "light");

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#000000" : "#ffffff"
      );
    }
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

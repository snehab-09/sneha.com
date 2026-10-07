"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    const isDark =
      savedTheme === "dark";

    setDarkMode(isDark);

    document.documentElement.classList.toggle(
      "dark",
      isDark
    );
  }, []);

  const toggleTheme = () => {
    const nextMode =
      !darkMode;

    setDarkMode(nextMode);

    document.documentElement.classList.toggle(
      "dark",
      nextMode
    );

    localStorage.setItem(
      "theme",
      nextMode
        ? "dark"
        : "light"
    );

    const savedAccent =
      localStorage.getItem("accent");

    if (!savedAccent) {
      document.documentElement.style.setProperty(
        "--accent",
        nextMode
          ? "#ffffff"
          : "#222222"
      );
    }

    window.dispatchEvent(
      new CustomEvent(
        "theme-change",
        {
          detail: {
            isDark: nextMode,
          },
        }
      )
    );
  };

  return (
    <button
      type="button"
      className="dark-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="dark-letter">
        {darkMode
          ? "L"
          : "D"}
      </span>

      <span>
        {darkMode
          ? "light"
          : "dark"}
      </span>
    </button>
  );
}
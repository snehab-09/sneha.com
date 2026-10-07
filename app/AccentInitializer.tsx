"use client";

import { useEffect } from "react";

export default function AccentInitializer() {
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    const savedAccent =
      localStorage.getItem("accent");

    const isDark =
      savedTheme === "dark";

    document.documentElement.classList.toggle(
      "dark",
      isDark
    );

    if (savedAccent) {
      document.documentElement.style.setProperty(
        "--accent",
        savedAccent
      );
    } else {
      document.documentElement.style.setProperty(
        "--accent",
        isDark
          ? "#ffffff"
          : "#222222"
      );
    }
  }, []);

  return null;
}
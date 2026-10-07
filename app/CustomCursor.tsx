"use client";

import {
  useEffect,
  useState,
} from "react";

export default function CustomCursor() {
  const [visible, setVisible] =
    useState(false);

  const [hovering, setHovering] =
    useState(false);

  useEffect(() => {
    const handleMouseMove = (
      event: MouseEvent
    ) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${event.clientX}px`
      );

      document.documentElement.style.setProperty(
        "--cursor-y",
        `${event.clientY}px`
      );

      setVisible(true);

      const target =
        event.target as HTMLElement;

      const interactive =
        target.closest(
          "a, button"
        );

      setHovering(
        Boolean(interactive)
      );
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${
        visible
          ? "cursor-visible"
          : ""
      } ${
        hovering
          ? "cursor-hover"
          : ""
      }`}
    />
  );
}
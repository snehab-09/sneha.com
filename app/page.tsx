"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const accentColors = [
  "#e85d75",
  "#e09f3e",
  "#4f9d69",
  "#4d7cfe",
  "#9b5de5",
];

const DEFAULT_ACCENT = "default";

function ArrowUpRight() {
  return (
    <svg
      className="inline-arrow"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 18L18 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M9 6H18V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownRight() {
  return (
    <svg
      className="scroll-arrow-icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 5L19 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M11 19H19V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      className="inline-arrow"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M6 14L12 20L18 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  const [colorPickerOpen, setColorPickerOpen] =
    useState(false);

  const [selectedColor, setSelectedColor] =
    useState<string>(DEFAULT_ACCENT);

  const [views, setViews] =
    useState<number | null>(null);

  useEffect(() => {
    const savedAccent =
      localStorage.getItem("accent");

    if (savedAccent) {
      setSelectedColor(savedAccent);

      document.documentElement.style.setProperty(
        "--accent",
        savedAccent
      );
    } else {
      setSelectedColor(DEFAULT_ACCENT);

      const savedTheme =
        localStorage.getItem("theme");

      document.documentElement.style.setProperty(
        "--accent",
        savedTheme === "dark"
          ? "#ffffff"
          : "#222222"
      );
    }

    const handleThemeChange = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          isDark: boolean;
        }>;

      const savedAccent =
        localStorage.getItem("accent");

      if (savedAccent) {
        document.documentElement.style.setProperty(
          "--accent",
          savedAccent
        );
      } else {
        document.documentElement.style.setProperty(
          "--accent",
          customEvent.detail.isDark
            ? "#ffffff"
            : "#222222"
        );
      }
    };

    window.addEventListener(
      "theme-change",
      handleThemeChange
    );

    return () => {
      window.removeEventListener(
        "theme-change",
        handleThemeChange
      );
    };
  }, []);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response =
          await fetch("/api/views");

        if (!response.ok) {
          throw new Error(
            "Failed to fetch views"
          );
        }

        const data =
          await response.json();

        setViews(data.views);
      } catch (error) {
        console.error(
          "Could not fetch view count:",
          error
        );
      }
    };

    fetchViews();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        "snehamaha616@gmail.com"
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Could not copy email:",
        error
      );
    }
  };

  const handleColorChange = (
    color: string
  ) => {
    if (color === DEFAULT_ACCENT) {
      localStorage.removeItem("accent");

      const savedTheme =
        localStorage.getItem("theme");

      document.documentElement.style.setProperty(
        "--accent",
        savedTheme === "dark"
          ? "#ffffff"
          : "#222222"
      );

      setSelectedColor(
        DEFAULT_ACCENT
      );

      return;
    }

    localStorage.setItem(
      "accent",
      color
    );

    document.documentElement.style.setProperty(
      "--accent",
      color
    );

    setSelectedColor(color);
  };

  return (
    <main className="site-shell">

      {/* ==================== TOP NAV ==================== */}

      <header className="topbar">

        <nav className="navigation">

          <a href="/projects">
            projects
          </a>

          <a href="/experience">
            experience
          </a>

          <a href="/proof-of-work">
            proof of work
          </a>

          <a href="#contact">
            contact
          </a>

        </nav>

        <div className="color-picker">

          <button
            type="button"
            className="color-picker-trigger"
            onClick={() =>
              setColorPickerOpen(
                (value) => !value
              )
            }
            aria-label="Pick your color"
            aria-expanded={
              colorPickerOpen
            }
          >
            <span>
              pick your color
            </span>

            <span
              className="current-color"
              style={{
                background:
                  selectedColor ===
                  DEFAULT_ACCENT
                    ? "var(--accent)"
                    : selectedColor,
              }}
            />
          </button>

          {colorPickerOpen && (
            <div className="color-palette">

              <button
                type="button"
                className={`color-swatch default-swatch ${
                  selectedColor ===
                  DEFAULT_ACCENT
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleColorChange(
                    DEFAULT_ACCENT
                  )
                }
                aria-label="Default accent"
              />

              {accentColors.map(
                (color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch ${
                      selectedColor === color
                        ? "selected"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        color,
                    }}
                    onClick={() =>
                      handleColorChange(
                        color
                      )
                    }
                    aria-label={`Choose ${color} accent`}
                  />
                )
              )}

            </div>
          )}

        </div>

      </header>

      {/* ==================== LANDING ==================== */}

      <section className="landing">

        <div className="intro-heading">

          <h1 className="hello">
            Hey, this is Sneha.
          </h1>

          <div className="email-row">

            <button
              type="button"
              className="copy-button"
              onClick={handleCopy}
              aria-label="Copy email address"
            >
              <span className="copy-icon">

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="9"
                    y="9"
                    width="11"
                    height="11"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M6 15H5.5C4.67 15 4 14.33 4 13.5V5.5C4 4.67 4.67 4 5.5 4H13.5C14.33 4 15 4.67 15 5.5V6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

              </span>
            </button>

            <a
              href="mailto:snehamaha616@gmail.com"
              className="email-link"
            >
              snehamaha616@gmail.com
            </a>

            {copied && (
              <span className="copied-label">
                copied
              </span>
            )}

            <ThemeToggle />

          </div>

        </div>

        <div className="intro">

          <p>
            I like figuring things out, pulling
            apart interesting problems and seeing
            what I can build from them. That’s taken
            me through data, AI, machine learning,
            product and GTM sometimes because I had
            a specific problem I wanted to solve and
            sometimes simply because I was curious
            about how something worked.
          </p>

          <p>
            I’ve worked on{" "}
            <a
              href="/projects"
              className="fun-link"
            >
              projects
            </a>{" "}
            ranging from credit-risk prediction
            and sales analytics to a movie
            recommendation system. I’ve also
            explored GTM research and product
            problems through hands-on{" "}
            <a
              href="/proof-of-work"
              className="fun-link"
            >
              proof of work
            </a>{" "}
            and you can find more about my{" "}
            <a
              href="/experience"
              className="fun-link"
            >
              experience
            </a>{" "}
            as a Data Analyst Intern at Kovaion.
          </p>

          <p>
            Basically, it’s a collection of things
            I’ve been curious enough to actually
            work on.
          </p>

        </div>

        <div className="scroll-cue">

          <span>
            keep scrolling
          </span>

          <span className="scroll-arrow">
            <ArrowDownRight />
          </span>

        </div>

      </section>

      {/* ==================== CONTACT ==================== */}

      <section
        id="contact"
        className="contact-section"
      >

        <div className="section-label">
          say hi
        </div>

        <div className="contact-layout">

          <div className="contact-intro">

            <p>
              If you want to talk about an
              opportunity, a project, an idea or
              something else - I&apos;m around.
            </p>

          </div>

          <div className="contact-links">

            <a
              href="mailto:snehamaha616@gmail.com"
              className="contact-link"
            >
              <span>
                email
              </span>

              <span>
                <ArrowUpRight />
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/snehab09"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span>
                linkedin
              </span>

              <span>
                <ArrowUpRight />
              </span>
            </a>

            <a
              href="https://github.com/snehab-09"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span>
                github
              </span>

              <span>
                <ArrowUpRight />
              </span>
            </a>

            <a
              href="/Resume%20Sneha%20B.pdf"
              download
              className="resume-link"
            >
              <ArrowDown />
              <span>
                download my resume
              </span>
            </a>

          </div>

        </div>

      </section>

      {/* ==================== QUOTE ==================== */}

      <section className="quote-section">

        <p className="quote-text">
          “The cave you fear to enter holds the
          treasure you seek”
        </p>

        <p className="quote-author">
          — Joseph Campbell
        </p>

      </section>

      {/* ==================== FOOTER ==================== */}

      <footer className="footer">

        <span>
          made by Sneha
        </span>

        <span className="footer-views">

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="12"
              cy="12"
              r="2.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <span>
            {views === null
              ? "— views"
              : `${views} views`}
          </span>

        </span>

        <span>
          © 2026
        </span>

      </footer>

    </main>
  );
}
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import AccentInitializer from "./AccentInitializer";
import CustomCursor from "./CustomCursor";

export const metadata: Metadata = {
  title: "Sneha B",
  description:
    "Sneha B — my little corner of the internet.",
};

const themeScript = `
(function () {
  try {
    var savedTheme =
      localStorage.getItem("theme");

    var savedAccent =
      localStorage.getItem("accent");

    if (savedTheme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }

    if (savedAccent) {
      document.documentElement.style.setProperty(
        "--accent",
        savedAccent
      );
    } else {
      document.documentElement.style.setProperty(
        "--accent",
        savedTheme === "dark"
          ? "#ffffff"
          : "#222222"
      );
    }
  } catch (error) {
    // Ignore localStorage errors
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body>
        <AccentInitializer />

        <CustomCursor />

        {children}

        <Analytics />
      </body>
    </html>
  );
}
"use client";

import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

const proofOfWork = [
  {
    number: "01",
    title: "Enterprise GTM Research",
    description:
      "An end-to-end GTM research project focused on understanding enterprise account fit AI adoption governance maturity business context stakeholder mapping and buying signals.",
    tags: [
      "GTM Research",
      "Clay",
      "Lovable",
      "AI Research",
      "Account Qualification",
    ],
    projectLink:
      "https://gtm-research-portfolio.lovable.app/",
    linkLabel:
      "view research",
  },

  {
    number: "02",
    title: "SuperKalam Product Teardown",
    description:
      "A hands-on product teardown of SuperKalam focused on identifying product friction and opportunities across content discovery, article management, onboarding, feature positioning, learning navigation and account deletion. The analysis proposes practical product improvements and ways to measure whether those changes improve the user experience.",
    tags: [
      "Product Management",
      "Product Teardown",
      "User Experience",
      "Product Analysis",
      "Recommendations",
    ],
    projectLink:
      "https://drive.google.com/file/d/1jd6l0ltkA0t8TpGktS9KqUaZ_-66hL34/view?usp=sharing",
    linkLabel:
      "view teardown",
  },
];

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

function ArrowLeft() {
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
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUp() {
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
        d="M12 19V5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M6 11L12 5L18 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProofOfWorkPage() {
  const [openProof, setOpenProof] =
    useState<number | null>(null);

  const toggleProof = (
    index: number
  ) => {
    setOpenProof(
      openProof === index
        ? null
        : index
    );
  };

  return (
    <main className="site-shell proof-page">

      <header className="proof-header">

        <div className="proof-top-row">

          <a
            href="/"
            className="back-home"
          >
            <ArrowLeft />
            <span>
              back home
            </span>
          </a>

          <ThemeToggle />

        </div>

        <div className="proof-title-wrap">

          <span className="hand-note">
            things I&apos;ve actually worked through
          </span>

          <h1>
            proof of work
          </h1>

        </div>

        <p className="proof-intro">
          A few things I&apos;ve researched
          tested and worked through beyond
          traditional projects.
        </p>

      </header>

      <section className="proof-list">

        {proofOfWork.map(
          (item, index) => {

            const isOpen =
              openProof === index;

            return (
              <article
                key={item.title}
                className={`proof-item ${
                  isOpen
                    ? "proof-open"
                    : ""
                }`}
              >

                <button
                  type="button"
                  className="proof-row"
                  onClick={() =>
                    toggleProof(index)
                  }
                  aria-expanded={isOpen}
                >

                  <span className="proof-number">
                    {item.number}
                  </span>

                  <span className="proof-name">
                    {item.title}
                  </span>

                  <span className="proof-action">
                    {isOpen
                      ? "−"
                      : "+"}
                  </span>

                </button>

                <div
                  className={`proof-details ${
                    isOpen
                      ? "proof-details-visible"
                      : ""
                  }`}
                >

                  <div className="proof-details-inner">

                    <div className="proof-description">

                      <p>
                        {item.description}
                      </p>

                    </div>

                    <div className="proof-meta">

                      <div className="proof-tags">

                        {item.tags.map(
                          (tag) => (
                            <span key={tag}>
                              {tag}
                            </span>
                          )
                        )}

                      </div>

                      <div className="proof-links">

                        <a
                          href={
                            item.projectLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <span>
                            {item.linkLabel}
                          </span>
                          <ArrowUpRight />
                        </a>

                      </div>

                    </div>

                  </div>

                </div>

              </article>
            );
          }
        )}

      </section>

      <footer className="proof-footer">

        <a href="/">
          <span>
            home
          </span>
          <ArrowUp />
        </a>

      </footer>

    </main>
  );
}
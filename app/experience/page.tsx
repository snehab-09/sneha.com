"use client";

import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

const experience = {
  number: "01",
  role: "Data Analyst Intern",
  company: "Kovaion Consulting",
  period: "Jan 2026 – Apr 2026",
  location: "Coimbatore",
  description:
    "Worked across data analysis machine learning and AI-assisted data querying during my internship at Kovaion Consulting.",
  work: [
    "Developed a borrower default prediction model using Python and feature engineering that achieved 93% accuracy and 0.94 ROC-AUC across 32,581 records.",
    "Built an LLM-based Natural Language MongoDB Query Engine enabling non-technical stakeholders to retrieve data through plain-English questions without writing MongoDB queries.",
    "Built a CRM Analytics Query System using MongoDB enabling sales users to retrieve and analyze lead data through natural-language questions.",
  ],
  tags: [
    "Python",
    "MongoDB",
    "LLaMA-3",
    "Groq",
    "FastAPI",
    "Scikit-learn",
  ],
};

export default function ExperiencePage() {
  const [openExperience, setOpenExperience] =
    useState(false);

  return (
    <main className="site-shell experience-page">

      <header className="experience-header">

        <div className="experience-top-row">

          <a
            href="/"
            className="back-home"
          >
            ← back home
          </a>

          <ThemeToggle />

        </div>


        <div className="experience-title-wrap">

          <span className="hand-note">
            things I&apos;ve worked on
          </span>

          <h1>
            experience
          </h1>

        </div>


        <p className="experience-intro">
          A little bit of the work I&apos;ve
          done in an actual team setting.
        </p>

      </header>


      <section className="experience-list">

        <article
          className={`experience-item ${
            openExperience
              ? "experience-open"
              : ""
          }`}
        >

          <button
            type="button"
            className="experience-row"
            onClick={() =>
              setOpenExperience(
                (value) => !value
              )
            }
            aria-expanded={
              openExperience
            }
          >

            <span className="experience-number">
              {experience.number}
            </span>


            <span className="experience-main">

              <span className="experience-role">
                {experience.role}
              </span>

              <span className="experience-company">
                {experience.company}
              </span>

            </span>


            <span className="experience-action">
              {openExperience
                ? "−"
                : "+"}
            </span>

          </button>


          <div
            className={`experience-details ${
              openExperience
                ? "experience-details-visible"
                : ""
            }`}
          >

            <div className="experience-details-inner">

              <div className="experience-meta">

                <span>
                  {experience.period}
                </span>

                <span>
                  {experience.location}
                </span>

              </div>


              <div className="experience-description">

                <p>
                  {experience.description}
                </p>

              </div>


              <div className="experience-work">

                <div className="experience-subtitle">
                  what I worked on
                </div>


                <ul>

                  {experience.work.map(
                    (item) => (
                      <li key={item}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </div>


              <div className="experience-tags">

                {experience.tags.map(
                  (tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>

        </article>

      </section>


      <footer className="experience-footer">

        <a href="/">
          home ↑
        </a>

      </footer>

    </main>
  );
}
"use client";

import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

const projects = [
  {
    number: "01",
    title: "Credit Risk Prediction",
    description:
      "A machine learning application for borrower risk prediction using historical loan data. The final Random Forest model achieved 93% accuracy and a 0.94 ROC-AUC score across 32,581 borrower records.",
    tags: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Streamlit",
    ],
    projectLink:
      "https://credit-risk-mlapp.streamlit.app/",
    githubLink:
      "https://github.com/snehab-09/Credit_Risk_Prediction",
  },

  {
    number: "02",
    title: "Sales Analytics Dashboard",
    description:
      "An interactive business intelligence project analyzing 12 months of retail sales data to identify revenue trends, purchasing behaviour, geographic performance and product combinations.",
    tags: [
      "Python",
      "Power BI",
      "Pandas",
      "Matplotlib",
    ],
    projectLink: "",
    githubLink:
      "https://github.com/snehab-09/Sales-Data-Analysis-PowerBI-Jupyter",
  },

  {
    number: "03",
    title: "MovieMind",
    description:
      "A content-based movie recommendation system using cosine similarity to recommend similar movies with TMDb API integration for real-time poster retrieval through an interactive Streamlit application.",
    tags: [
      "Python",
      "Streamlit",
      "Scikit-learn",
      "TMDb API",
    ],
    projectLink:
      "https://moviemind-recommender.streamlit.app/",
    githubLink:
      "https://github.com/snehab-09/MovieMind-recommender",
  },
];

export default function ProjectsPage() {
  const [openProject, setOpenProject] =
    useState<number | null>(null);

  const toggleProject = (
    index: number
  ) => {
    setOpenProject(
      openProject === index
        ? null
        : index
    );
  };

  return (
    <main className="site-shell projects-page">

      <header className="projects-header">

        <div className="projects-top-row">

          <a
            href="/"
            className="back-home"
          >
            ← back home
          </a>

          <ThemeToggle />

        </div>


        <div className="projects-title-wrap">

          <span className="hand-note">
            things I&apos;ve made
          </span>

          <h1>
            projects
          </h1>

        </div>


        <p className="projects-intro">
          A few things I&apos;ve built while
          exploring data, AI, machine learning
          and whatever caught my curiosity
          along the way.
        </p>

      </header>


      <section className="project-list">

        {projects.map(
          (project, index) => {

            const isOpen =
              openProject === index;

            return (
              <article
                key={project.title}
                className={`project-item ${
                  isOpen
                    ? "project-open"
                    : ""
                }`}
              >

                <button
                  type="button"
                  className="project-row"
                  onClick={() =>
                    toggleProject(index)
                  }
                  aria-expanded={isOpen}
                >

                  <span className="project-number">
                    {project.number}
                  </span>

                  <span className="project-name">
                    {project.title}
                  </span>

                  <span className="project-action">
                    {isOpen
                      ? "−"
                      : "+"}
                  </span>

                </button>


                <div
                  className={`project-details ${
                    isOpen
                      ? "details-visible"
                      : ""
                  }`}
                >

                  <div className="project-details-inner">

                    <div className="project-description">

                      <p>
                        {project.description}
                      </p>

                    </div>


                    <div className="project-meta">

                      <div className="project-tags">

                        {project.tags.map(
                          (tag) => (
                            <span key={tag}>
                              {tag}
                            </span>
                          )
                        )}

                      </div>


                      <div className="project-links">

                        {project.projectLink && (
                          <a
                            href={
                              project.projectLink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                          >
                            live project ↗
                          </a>
                        )}

                        {project.githubLink && (
                          <a
                            href={
                              project.githubLink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                          >
                            github ↗
                          </a>
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </article>
            );
          }
        )}

      </section>


      <footer className="projects-footer">

        <a href="/">
          home ↑
        </a>

      </footer>

    </main>
  );
}
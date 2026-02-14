import React from "react";

export default function Modal({ project, onClose }) {
  if (!project) {
    return null;
  }

  return (
    <div className="portfolio-modal" role="dialog" aria-modal="true">
      <div className="portfolio-modal__backdrop" onClick={onClose} />
      <div className="portfolio-modal__card">
        <button
          className="portfolio-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
        <div className="portfolio-modal__scroll">
          <aside className="portfolio-modal__sidebar">
            <h3 className="portfolio-modal__title">
              {project.title || "Project"}
              </h3>
              <hr/> 
            {project.role ? (
              <>
                <h5 className="portfolio-modal__role">
                  <span>My role:</span> {project.role}
                </h5>
                <hr/>
              </>
            ) : null}
            {project.summary ? (
              <div className="portfolio-modal__section">
                <h4>Project description</h4>
                <p className="portfolio-modal__summary">{project.summary}</p>
              </div>
            ) : null}

            {Array.isArray(project.skills) && project.skills.length > 0 ? (
              <div className="portfolio-modal__section">
                <h4>Skills used</h4>
                <ul className="portfolio-modal__skills">
                  {project.skills.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!project.skills &&
            Array.isArray(project.tools) &&
            project.tools.length > 0 ? (
              <div className="portfolio-modal__section">
                <h4>Tools used</h4>
                <div className="portfolio-modal__stack">
                  {project.tools.map((tool, index) => (
                    <img src={tool.image} alt="" key={index} />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div className="portfolio-modal__main">
            <div className="portfolio-modal__media">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title || "Project preview"}
                />
              ) : null}
              {project.link ? (
                <div className="portfolio-modal__link-wrap">
                  <a
                    className="portfolio-modal__link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Live Site
                  </a>
                </div>
              ) : null}
              {Array.isArray(project.gallery) && project.gallery.length > 0 ? (
                <div className="portfolio-modal__gallery">
                  {project.gallery.map((image, index) => (
                    <img src={image} alt="" key={index} />
                  ))}
                </div>
              ) : null}
            </div>

            {Array.isArray(project.highlights) && project.highlights.length > 0 ? (
              <div className="portfolio-modal__section">
                <h4>Highlights</h4>
                <ul>
                  {project.highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

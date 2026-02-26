import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from 'next/image'
import { isSanityImageUrl } from '@/sanity/sanityImageUrl'

const DESKTOP_QUERY = '(min-width: 769px)'
const IFRAME_BLOCKED_HOSTS = new Set(['syntaxdata.com', 'www.syntaxdata.com'])

const canUseIframeForLink = (link) => {
  if (!link) {
    return false
  }

  try {
    const parsedUrl = new URL(link)
    return !IFRAME_BLOCKED_HOSTS.has(parsedUrl.hostname)
  } catch {
    return false
  }
}

export default function Modal({
  project,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasMultipleProjects,
}) {
  const [isIframeLoading, setIsIframeLoading] = useState(Boolean(project?.link));
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cachedLinks, setCachedLinks] = useState(() =>
    project?.link ? [project.link] : []
  );
  const [loadedLinks, setLoadedLinks] = useState({});
  const touchStartRef = useRef({ x: null, y: null });

  const activeLink = project?.link || '';
  const canUseIframe = isDesktop && canUseIframeForLink(activeLink)

  useEffect(() => {
    if (!activeLink || !canUseIframe) {
      setIsIframeLoading(false);
      return;
    }

    setCachedLinks((prev) => (prev.includes(activeLink) ? prev : [...prev, activeLink]));
    setIsIframeLoading(!loadedLinks[activeLink]);
  }, [activeLink, loadedLinks, canUseIframe]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const updateViewport = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateViewport);
    } else {
      mediaQuery.addListener(updateViewport);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateViewport);
      } else {
        mediaQuery.removeListener(updateViewport);
      }
    };
  }, []);

  if (!project) {
    return null;
  }

  const markLinkAsLoaded = (link) => {
    setLoadedLinks((prev) => {
      if (prev[link]) {
        return prev;
      }

      return {
        ...prev,
        [link]: true,
      };
    });
  };

  const handleTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) {
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (!hasMultipleProjects) {
      return;
    }

    const startX = touchStartRef.current.x;
    const startY = touchStartRef.current.y;
    const touch = event.changedTouches?.[0];

    touchStartRef.current = { x: null, y: null };

    if (startX === null || startY === null || !touch) {
      return;
    }

    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < 40 || absX <= absY) {
      return;
    }

    if (deltaX > 0) {
      onPrevious?.();
      return;
    }

    onNext?.();
  };

  const modalContent = (
    <div
      className={`portfolio-modal${isOpen ? '' : ' portfolio-modal--closed'}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
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
            <h4 className="portfolio-modal__title">
              {project.title || "Project"}
              </h4>
            {project.role ? (
              <>
                <h5 className="portfolio-modal__role">
                  <span>My role:</span> {project.role}
                </h5>
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
                    <div className="portfolio-modal__tool-media" key={index}>
                      <Image
                        src={tool.image}
                        alt={tool.alt || ''}
                        fill
                        className="portfolio-modal__tool-image"
                        sizes="46px"
                        unoptimized={isSanityImageUrl(tool.image)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {project.link ? (
              <div className="portfolio-modal__link-wrap portfolio-modal__link-wrap--sidebar">
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
          </aside>

          <div className="portfolio-modal__main">
            <div
              className="portfolio-modal__media"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {hasMultipleProjects ? (
                <div className="portfolio-modal__project-nav" aria-label="Project navigation">
                  <button
                    type="button"
                    className="portfolio-modal__project-nav-btn portfolio-modal__project-nav-btn--prev"
                    onClick={onPrevious}
                    aria-label="Previous project"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="portfolio-modal__project-nav-btn portfolio-modal__project-nav-btn--next"
                    onClick={onNext}
                    aria-label="Next project"
                  >
                    →
                  </button>
                </div>
              ) : null}
              {project.link && canUseIframe ? (
                <div className="portfolio-modal__iframe-shell">
                  {cachedLinks.map((link) => (
                    <iframe
                      key={link}
                      src={link}
                      title={`${project.title || 'Project'} preview`}
                      className={`portfolio-modal__iframe${
                        link === activeLink ? ' portfolio-modal__iframe--active' : ''
                      }`}
                      loading="lazy"
                      onLoad={() => markLinkAsLoaded(link)}
                    />
                  ))}
                  {project.image ? (
                    <div
                      className={`portfolio-modal__iframe-placeholder${
                        isIframeLoading ? '' : ' portfolio-modal__iframe-placeholder--hidden'
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title || "Project preview"}
                        fill
                        className="portfolio-modal__hero-image"
                        sizes="(max-width: 768px) 92vw, 62vw"
                        priority
                        unoptimized={isSanityImageUrl(project.image)}
                      />
                      {isIframeLoading ? (
                        <div className="portfolio-modal__loader-wrap" aria-live="polite">
                          <span className="portfolio-modal__loader" aria-hidden="true" />
                          <span className="portfolio-modal__loader-text">Loading preview…</span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <a
                    className="portfolio-modal__link portfolio-modal__media-cta"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Live Site
                  </a>
                </div>
              ) : null}

              {(!project.link || !canUseIframe) && project.image ? (
                project.link ? (
                  <a
                    className="portfolio-modal__hero-media portfolio-modal__hero-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title || 'project'} site`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title || "Project preview"}
                      fill
                      className="portfolio-modal__hero-image"
                      sizes="(max-width: 768px) 92vw, 62vw"
                      unoptimized={isSanityImageUrl(project.image)}
                    />
                    <span className="portfolio-modal__link portfolio-modal__media-cta">
                      View Live Site
                    </span>
                  </a>
                ) : (
                  <div className="portfolio-modal__hero-media">
                    <Image
                      src={project.image}
                      alt={project.title || "Project preview"}
                      fill
                      className="portfolio-modal__hero-image"
                      sizes="(max-width: 768px) 92vw, 62vw"
                      unoptimized={isSanityImageUrl(project.image)}
                    />
                  </div>
                )
              ) : null}
              {Array.isArray(project.gallery) && project.gallery.length > 0 ? (
                <div className="portfolio-modal__gallery">
                  {project.gallery.map((image, index) => (
                    <div className="portfolio-modal__gallery-item" key={index}>
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="portfolio-modal__gallery-image"
                        sizes="(max-width: 768px) 44vw, 28vw"
                        unoptimized={isSanityImageUrl(image)}
                      />
                    </div>
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

  if (!isMounted) {
    return null;
  }

  return createPortal(modalContent, document.body);
}

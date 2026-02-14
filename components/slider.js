import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination, Scrollbar, Navigation } from 'swiper/core';

import 'swiper/swiper.min.css'
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([EffectCoverflow, Pagination, Scrollbar, Navigation]);
export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    this.openFromUrl();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.setBodyScrollLock(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeIndex !== this.state.activeIndex) {
      this.setBodyScrollLock(this.state.activeIndex !== null);
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  openModal(idx) {
    if (!this.props.slides[idx] || !this.props.slides[idx].image) {
      return;
    }
    this.setState({ activeIndex: idx });
    this.updateUrlParam(this.props.slides[idx]);
    this.scrollToProjects();
  }

  closeModal() {
    this.setState({ activeIndex: null });
    this.clearUrlParam();
  }

  getProjectSlug(project) {
    if (!project) {
      return '';
    }
    if (project.slug) {
      return String(project.slug).toLowerCase();
    }
    if (project.title) {
      return project.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }
    return '';
  }

  openFromUrl() {
    if (typeof window === 'undefined') {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('project');
    if (!slug) {
      return;
    }

    const index = this.props.slides.findIndex((slide) =>
      this.getProjectSlug(slide) === slug
    );

    if (index >= 0) {
      this.setState({ activeIndex: index });
      this.scrollToProjects();
    }
  }

  updateUrlParam(project) {
    if (typeof window === 'undefined') {
      return;
    }
    const slug = this.getProjectSlug(project);
    if (!slug) {
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('project', slug);
    if (url.hash !== '#projects') {
      url.hash = '#projects';
    }
    window.history.pushState({}, '', url.toString());
  }

  clearUrlParam() {
    if (typeof window === 'undefined') {
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.replaceState({}, '', url.toString());
  }

  scrollToProjects() {
    if (typeof window === 'undefined') {
      return;
    }
    const section = document.getElementById('projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  setBodyScrollLock(locked) {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.style.overflow = locked ? 'hidden' : '';
  }



  render() {
    const activeProject =
      this.state.activeIndex !== null
        ? this.props.slides[this.state.activeIndex]
        : null;

    return (
      <div className="slider-component">
        <h2 className="title">Projects</h2>
        <Swiper
          className       = "slider"
          autoHeight      = {true}
          effect          = {"coverflow"}
          centeredSlides  = {true}
          grabCursor      = {true}
          spaceBetween    = {10}
          slidesPerView   = {2}
          initialSlide    = {3}
          observer        = {true}
          observeParents  = {true}
          autoplay        = {true}
          navigation      = {true}
          pagination      = {{ clickable: true }}
          scrollbar       = {{ draggable: true }}
          coverflowEffect = {{
            rotate       : 25,
            stretch      : 0,
            depth        : 100,
            modifier     : 1,
            slideShadows : true
          }}
          breakpoints={{
            320: {
              width         : 320,
              slidesPerView : 1.75,
              spaceBetween  : 10,
              initialSlide   : 1
            },
            767: {
              width         : 767,
              slidesPerView : 2.5,
              spaceBetween  : 10,
              initialSlide   : 3
            },
            1024: {
              width          : 1024,
              slidesPerView  : 3,
              spaceBetween   : 50,
              initialSlide   : 1,
              centeredSlides : false
            },
            1220: {
              width          : 1220,
              slidesPerView  : 4,
              spaceBetween   : 50,
              initialSlide   : 1,
              centeredSlides : false
            },
            1660: {
              width          : 1660,
              slidesPerView  : 4,
              spaceBetween   : 50,
              initialSlide   : 1,
              centeredSlides : false
            },
          }}
        >

        { this.props.slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <button
              className="slide link"
              type="button"
              onClick={() => this.openModal(idx)}
              aria-label={slide.title ? `Open ${slide.title}` : 'Open project'}
              disabled={!slide.image}
            >
              {slide.image ? <img src={slide.image} alt={slide.title || 'Project preview'} /> : null}
            </button>
            <div className="tools">
              {slide.tools.map((tool, i) => (
                <img
                  className="tool image"
                  src={tool.image}
                  alt=""
                  key={i}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}

        </Swiper>

        {activeProject ? (
          <div className="portfolio-modal" role="dialog" aria-modal="true">
            <div className="portfolio-modal__backdrop" onClick={() => this.closeModal()} />
            <div className="portfolio-modal__card">
              <button
                className="portfolio-modal__close"
                type="button"
                onClick={() => this.closeModal()}
                aria-label="Close project details"
              >
                ×
              </button>
              <div className="portfolio-modal__scroll">
                <aside className="portfolio-modal__sidebar">
                  <h3 className="portfolio-modal__title">
                    {activeProject.title || 'Project'}
                  </h3>
                  {activeProject.role ? (
                    <p className="portfolio-modal__role">
                      <span>My role:</span> {activeProject.role}
                    </p>
                  ) : null}
                  {activeProject.summary ? (
                    <div className="portfolio-modal__section">
                      <h4>Project description</h4>
                      <p className="portfolio-modal__summary">{activeProject.summary}</p>
                    </div>
                  ) : null}

                  {Array.isArray(activeProject.skills) && activeProject.skills.length > 0 ? (
                    <div className="portfolio-modal__section">
                      <h4>Skills used</h4>
                      <ul className="portfolio-modal__skills">
                        {activeProject.skills.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {!activeProject.skills && Array.isArray(activeProject.tools) && activeProject.tools.length > 0 ? (
                    <div className="portfolio-modal__section">
                      <h4>Skills used</h4>
                      <div className="portfolio-modal__stack">
                        {activeProject.tools.map((tool, index) => (
                          <img src={tool.image} alt="" key={index} />
                        ))}
                      </div>
                    </div>
                  ) : null}

                </aside>

                <div className="portfolio-modal__main">
                  <div className="portfolio-modal__media">
                    {activeProject.image ? (
                      <img src={activeProject.image} alt={activeProject.title || 'Project preview'} />
                    ) : null}
                    {activeProject.link ? (
                      <div className="portfolio-modal__link-wrap">
                        <a
                          className="portfolio-modal__link"
                          href={activeProject.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Live Site
                        </a>
                      </div>
                    ) : null}
                    {Array.isArray(activeProject.gallery) && activeProject.gallery.length > 0 ? (
                      <div className="portfolio-modal__gallery">
                        {activeProject.gallery.map((image, index) => (
                          <img src={image} alt="" key={index} />
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {Array.isArray(activeProject.highlights) && activeProject.highlights.length > 0 ? (
                    <div className="portfolio-modal__section">
                      <h4>Highlights</h4>
                      <ul>
                        {activeProject.highlights.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <style jsx global>{`

        `}</style>
      </div>
    )
  }

}

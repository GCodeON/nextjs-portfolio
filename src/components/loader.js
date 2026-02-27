import React from 'react'

import { gsap } from 'gsap';

import Hero from './hero'


export default class CircularText extends React.Component {
  constructor(props) {
      super(props);
      this.circleText      = null
      this.circleTextTotal = null
      this.content         = null
      this.enterBackground = null
      this.enterCtrl       = null
      this.enterText       = null
      this.startTL         = null
      this.active          = false
        this.assetTimeoutMs  = 3000
        this.isMobileViewport = false
  }
      async componentDidMount() {
    this.circleText      = document.querySelectorAll('text.circles__text')
    this.content         = document.querySelector('.content')
    this.overlay         = document.querySelector('.overlay')
    this.enterCtrl       = document.querySelector('.enter')
    this.enterBackground = document.querySelector('.enter__bg')
    this.enterText = document.querySelector('.enter__text')
    this.circleTextTotal = this.circleText.length
    this.isMobileViewport = window.matchMedia('(max-width: 768px)').matches

    if (this.isMobileViewport) {
      this.assetTimeoutMs = 1200
    }

    this.setup();
    this.prepareInitialState();
    await this.waitForAssets();
    this.showFinalState();

    // this.nav    = document.querySelector('.nav'),
    // this.slides = document.querySelector('.work-component'),

  }

  setup() {
    gsap.set(this.circleText, { transformOrigin: '50% 50%' });
    gsap.set(this.enterCtrl, {pointerEvents: 'none'});
  }

  prepareInitialState() {
    gsap.set('body', { overflow: 'hidden' });
    gsap.set(this.content, { display: 'flex', opacity: 0, background: 'transparent' });
    gsap.set(this.content.children, { opacity: 0, scale: 0.98 });
    gsap.set(this.enterCtrl, { opacity: 0, scale: 1.2, pointerEvents: 'none' });
    gsap.set(this.enterText, { opacity: 0 });
    gsap.set(this.circleText, { opacity: 1, scale: 0.5, rotation: -270 });
    gsap.set(this.overlay, { background: 'none' });
  }

  waitForFonts() {
    if (typeof document === 'undefined' || !document.fonts || !document.fonts.ready) {
      return Promise.resolve();
    }

    return document.fonts.ready.catch(() => Promise.resolve());
  }

  waitForImages() {
    const images = Array.from(document.querySelectorAll('img'));

    const nearViewportImages = images.filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.top <= window.innerHeight * 1.25;
    });

    const targetImages = (nearViewportImages.length ? nearViewportImages : images).slice(0, 8);

    if (!targetImages.length) {
      return Promise.resolve();
    }

    return Promise.all(
      targetImages.map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, this.isMobileViewport ? 350 : 700);
        });
      })
    );
  }

  waitForAssets() {
    const fontPromise = this.isMobileViewport ? Promise.resolve() : this.waitForFonts();
    const assetPromise = Promise.all([fontPromise, this.waitForImages()]);
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(resolve, this.assetTimeoutMs);
    });

    return Promise.race([assetPromise, timeoutPromise]);
  }

  getHashTarget() {
    if (typeof window === 'undefined' || !window.location.hash) {
      return null;
    }

    const rawHash = window.location.hash.replace('#', '');
    const hashTargetId = rawHash.split('?')[0];

    if (!hashTargetId) {
      return null;
    }

    return document.getElementById(hashTargetId);
  }

  waitForNextPaint() {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }

  async waitForStableAnchor(target, timeoutMs = 4000, stableFrames = 6) {
    if (!target || typeof window === 'undefined') {
      return false;
    }

    const startedAt = performance.now();
    let previousTop = null;
    let previousHeight = null;
    let stableCount = 0;

    while (performance.now() - startedAt < timeoutMs) {
      const rect = target.getBoundingClientRect();
      const currentTop = Math.round(rect.top);
      const currentHeight = Math.round(rect.height);

      const hasBox = currentHeight > 0;
      const isStable =
        hasBox &&
        previousTop === currentTop &&
        previousHeight === currentHeight;

      stableCount = isStable ? stableCount + 1 : 0;
      previousTop = currentTop;
      previousHeight = currentHeight;

      if (stableCount >= stableFrames) {
        return true;
      }

      await this.waitForNextPaint();
    }

    return true;
  }

  async scrollHashTargetWhenReady({ behavior, block = 'start', delayMs = 0 }) {
    const hashTarget = this.getHashTarget();

    if (!hashTarget) {
      return false;
    }

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    await this.waitForStableAnchor(hashTarget);
    hashTarget.scrollIntoView({ behavior, block });
    return true;
  }

  showFinalState() {
    if (this.isMobileViewport) {
      gsap.set('body', { overflow: 'visible' });
      gsap.set(this.content, { opacity: 1, display: 'flex' });
      gsap.set(this.content.children, { opacity: 1, scale: 1 });
      gsap.set(this.enterCtrl, { opacity: 0, pointerEvents: 'none' });
      gsap.set(this.enterText, { opacity: 0 });
      return this.scrollHashTargetWhenReady({ behavior: 'auto', block: 'start' })
        .then((didScroll) => {
          if (!didScroll) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          }
        });
    }

    gsap.timeline()
      .set('body', { overflow: 'visible' })
      .to(this.content, {
        duration: 0.9,
        opacity: 1,
        ease: 'power2.out'
      })
      .to(this.content.children, {
        duration: 1.1,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        stagger: {
          amount: 0.2
        }
      }, '-=0.55')
      .to(this.enterCtrl, {
        duration: 0.4,
        opacity: 0.8,
        scale: 1.2,
        pointerEvents: 'none',
        ease: 'power2.out'
      }, '-=0.6');

    let video = document.getElementById('video');
    if (video) {
      video.play();
    }

    this.scrollHashTargetWhenReady({ behavior: 'auto', block: 'start' })
      .then((didScroll) => {
        if (!didScroll) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      });
  }


  hoverEnter() {
    gsap.killTweensOf([this.enterBackground,this.circleText]);
    
    gsap.to(this.enterBackground, {
        duration : 1.3,
        ease     : 'expo',
        scale    : 1.4
    });
    gsap.to(this.circleText, {
        duration : 0.5,
        ease     : 'expo',
        rotation : '+=120',
        scale    : 0.5,
        opacity  : 0.9,
        stagger  : {
            amount : -0.15
        }
    });
  };

  hoverLeave() {
    gsap.killTweensOf([this.enterBackground, this.circleText]);

    gsap.to(this.enterBackground, {
        duration : 1,
        ease     : 'expo',
        scale    : 1
    });
    gsap.to(this.circleText, {
        duration : 1,
        ease     : 'expo',
        scale    : 0.8,
        rotation : i => i%2 ? '+=120' : '-=120',
        opacity  : 1,
        stagger  : {
            amount : -0.2
        }
    });
  };

  start() {
      this.startTL = gsap.timeline()
      .addLabel('start', 0)
      .to(this.circleText, {
          duration : 3,
          ease     : 'expo.inOut',
          rotation : 90,
          stagger  : {
              amount : 0.4
          }
      }, 'start')
      .to([this.circleText, this.enterCtrl], {
          duration : 3,
          ease     : 'expo.inOut',
          startAt  : {opacity: 0, scale: 0.8 },
          scale    : 1,
          opacity  : 1,
          stagger  : {
              amount : 0.4
          }
      }, 'start')
      .to(this.circleText, {
        duration : 3,
        ease     : 'expo.inOut',
        rotation : 270,
        scale    : 0.5,
        stagger  : {
            amount : 0.1
        }
      })
      .add(() => {
          gsap.set(this.enterCtrl, {pointerEvents: 'auto'});
      }, 'start+=2');
  }
  enter() {
    gsap.killTweensOf([this.circleText]);

    gsap.set([this.content], {display: 'flex'});
    gsap.set([this.content], {background: 'transparent'});
    gsap.set(this.enterCtrl, {pointerEvents: 'none'});
    this.startTL.pause().kill();

    gsap.set([this.content], {opacity: 1});

    gsap.timeline()
    .addLabel('start', 0)
    .to('body', { overflow: 'visible' })
    .to(this.enterCtrl, {
        duration : 0.6,
        ease     : 'back.in',
        scale    : 0.2,
        opacity  : 0
    }, 'start')
    .to(this.circleText, {
        duration : 1.5,
        ease     : 'back.in',
        scale    : 0.2,
        opacity  : 0,
        rotation : '-=270',
        stagger  : {
            amount : 0.3
        }
    }, 'start+=0.2')
    .to([this.content.children], {
      duration : 2,
      ease     : 'back.out',
      startAt  : {opacity: 0, scale: 1},
      scale    : 1,
      opacity  : 1,
      stagger  : {
          amount : 0.1
      }
    }, 'start+=1.5')
    .to(this.enterText, {
      duration : 0.6,
      ease     : 'back.in',
      opacity  : 0
    }, 'start+=1')
    .to(this.enterCtrl, {
      duration : 1,
      ease     : 'back.out',
      opacity  : 0.8,
      scale    : 1.2
    }, 'start+=1.75')
    .to(this.circleText, {
      duration : 1,
      ease     : 'back.out',
      scale    : 1,
      opacity  : 1,
      rotation : '-=270',
      stagger  : {
          amount : 0.3
      }
    }, 'start+=2')

    // this.typeInit();

    gsap.set([this.overlay], {background: 'none'});

    let video = document.getElementById( 'video' );
    if(video) {
      video.play();
    }
    
    this.scrollHashTargetWhenReady({ behavior: 'smooth', block: 'end', delayMs: 2700 });


  }
  
    
  render() {


    return (
      <div className="circular-text-component">
          <svg className="circles" width="100%" height="100%" viewBox="0 0 1400 1400">
            <def>
              <path id="circle-1" d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5" />
              <path id="circle-2" d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5" />
              <path id="circle-3" d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5" />
              <path id="circle-4" d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5" />
            </def>
            <text className="circles__text circles__text--1">
              <textPath 
                className="circles__text-path" 
                href="#circle-1" 
                aria-label="" 
                textLength="2830">
                  &nbsp;Programmer&nbsp;Computer&nbsp;
              </textPath>
            </text>
            <text className="circles__text circles__text--2">
              <textPath 
                className="circles__text-path" 
                href="#circle-2" aria-label="" 
                textLength="2001">
                  &nbsp;Engineer&nbsp;Software&nbsp;
              </textPath>
            </text>
            <text className="circles__text circles__text--3">
              <textPath 
                className="circles__text-path" 
                href="#circle-3" aria-label="" 
                textLength="1341">
                  &nbsp;Developer&nbsp;Full Stack&nbsp;
              </textPath>
            </text>
            <text className="circles__text circles__text--4">
              <textPath 
                className="circles__text-path" 
                href="#circle-4" aria-label="" 
                textLength="836">
                  Developer&nbsp;Web&nbsp;
              </textPath>
            </text>
          </svg>

          <div className="content">
            <div className='overlay'>
              {this.props.children}
            </div>
          </div>
          
          <button className="enter" onClick={this.enter.bind(this)} onMouseEnter={this.hoverLeave.bind(this)} onMouseLeave={this.hoverEnter.bind(this)} >
            <div className="enter__bg" ></div>
            <span className="enter__text">Enter</span>
          </button>

  

  
        <style jsx>{`
          
        `}</style>
  
        <style jsx global>{`
          .circular-text-component {
            position : absolute;
            z-index  : 2;
          }
          .typed {
            font-family             : vortice-concept, sans-serif;
            font-size: 2em;
          }
        `}</style>
      </div>
    )
  }
}
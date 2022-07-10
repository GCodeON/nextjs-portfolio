import React from 'react'
import Head from 'next/head'

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
  }
  componentDidMount() {
    this.circleText      = document.querySelectorAll('text.circles__text')
    this.content         = document.querySelector('.content')
    this.overlay         = document.querySelector('.overlay')
    this.enterCtrl       = document.querySelector('.enter')
    this.enterBackground = document.querySelector('.enter__bg')
    this.enterText = document.querySelector('.enter__text')
    this.circleTextTotal = this.circleText.length

    this.setup(); 

    // this.nav    = document.querySelector('.nav'),
    // this.slides = document.querySelector('.work-component'),

  }

  setup() {
    gsap.set(this.enterCtrl, {opacity: '0'});
    gsap.set([this.circleText, this.content.children], {opacity: 0});
    gsap.set([this.content], {display: 'none'});
    gsap.set('body', { overflow: 'hidden' });
    gsap.set(this.circleText, { transformOrigin: '50% 50%' });
    gsap.set(this.enterCtrl, {pointerEvents: 'none'});

    this.start();
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
    
    if(window.location.hash) {
      console.log('has id hash:', window.location.hash);
      setTimeout(() => {
        document.getElementById(window.location.hash.replace("#", "")).scrollIntoView({ behavior: 'smooth' })
      }, 3000);
    }


  }
  
    
  render() {


    return (
      <div className="circular-text-component">
      <Head>
      </Head>
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
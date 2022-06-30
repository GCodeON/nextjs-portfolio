import React from 'react'
import Head from 'next/head'

import * as THREE from 'three';
import { PCDLoader } from '/node_modules/three/examples/jsm/loaders/PCDLoader.js';

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center, model;

let pageX = 0.5;
let pageY = 0.5;


function animate () {
  requestAnimationFrame( animate );

  if(model) {
    
    model.rotation.x = (pageY - 0.5) * 0.2;
    model.rotation.y = (pageX - 0.5) * 2;
  
  }
  renderer.render( scene, camera );
};

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.init();
    // this.revealScroll();

    animate();

    this.onWindowResize();
  }


  init() {
    renderer = new THREE.WebGLRenderer( { 
      antialias : true,
      canvas    : document.querySelector('.canvas')
    })

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth, window.innerHeight, 0.01, 40)
    camera.position.set( 0, 0, 1);

    scene = new THREE.Scene();
    scene.add( camera );

    this.loadModel();
    
    window.addEventListener( 'resize', this.onWindowResize );
    window.addEventListener( 'keypress', this.keyboard );

    document.addEventListener( 'mousemove', this.onDocumentMouseMove );
    document.addEventListener( 'scroll', this.onScroll );


  }

  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  onDocumentMouseMove( event ) {
    pageX = event.pageX / window.innerWidth;
    pageY = event.pageY / window.innerHeight;
  }
  
  onScroll() {
    let elem = document.querySelector('.canvas');
    let rect = elem.getBoundingClientRect();

    const t = rect.top;

    if(model) {
      pageY = -t * 0.01;

    }
  }

  keyboard( ev ) {

    const points = scene.getObjectByName( 'Zaghetto.pcd' );

    switch ( ev.key || String.fromCharCode( ev.keyCode || ev.charCode ) ) {

      case '+':
        points.material.size *= 1.2;
        break;

      case '-':
        points.material.size /= 1.2;
        break;

      case 'c':
        let color =  Math.random() * 0xffffff;
        points.material.color.setHex( color );
        alert(`set hex ${ color }`);
        break;

    }

    animate();

  }

  loadModel() {
    const loader = new PCDLoader();
    loader.load( '/models/Zaghetto.pcd', ( points ) => {

      model = points;
      model.geometry.center();
      model.geometry.rotateX( Math.PI );

      const pink =  14177201.841730215;
      const green = 4310673.115896333;
      const greener =  7076721.028454992;
      const white =  13885951.190900838;

      model.material.color.setHex( green );
  
      scene.add( model );

      animate();

    });
  }

  revealScroll() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger    : this.hero,
        pin        : false,
        pinSpacing : false,
        scrub      : true,
        markers    : true
      }
    });
  
    tl.to(this.quote, {
      autoAlpha: 1
    }).to(
      this.hero,
      {
        autoAlpha: 0
      },
      0.5
    );
    
  }

  render() {
    return (
      <div className='about-component'>
        <Head>
        
        </Head>
        <div className="about container" ref={(mount) => { this.mount = mount }}>
          <canvas className="canvas"></canvas>
          <div className="overlay container top left">
            <h1 className="title">Creative</h1>
            {/* <p className="typewiter">Full stack developer experienced building cloud hosted software applications.</p> */}
          </div>
          <div className="overlay container top right">
            <h1 className="title">Leader</h1>
            {/* <p className="typewiter">Able to lead high performing teams</p> */}
          </div>
          <div className="overlay container bottom left">
            <h1 className="title">Problem Solver</h1>
            {/* <p className="typewiter">Constantly learning something new every day to effectively implement solutions </p> */}
          </div>
          <div className="overlay container bottom right">
            <h1 className="title">Team Player</h1>
            {/* <p className="typewiter">Great collaborator and effectively communicating with team members, project managers and stakeholders.</p> */}
          </div>
        </div>

        <style jsx>{`
          .canvas {
            display: block;
          }
            
        `}</style>

      </div>
    )
  }
}


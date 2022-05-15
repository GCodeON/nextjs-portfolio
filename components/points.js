import React from 'react'
import Head from 'next/head'

import * as THREE from 'three';
import { PCDLoader } from '/node_modules/three/examples/jsm/loaders/PCDLoader.js';
// import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'


let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center;

function animate () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

export default class Points extends React.Component {
  constructor(props) {
    super(props);

    this.frame = null
  }
  componentDidMount() {
    this.init();

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

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth, window.innerHeight, 0.01, 40)

    camera.position.set( 0, 0, 1);
    scene.add( camera );

    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', animate ); // use if there is no animation loop
    // controls.minDistance = 0.5;
    // controls.maxDistance = 10;

    const loader = new PCDLoader();
    loader.load( '/models/Zaghetto.pcd', ( points ) => {

      points.geometry.center();
      points.geometry.rotateX( Math.PI );
      scene.add( points );

      animate();

    });

    console.log('points loaded');

    window.addEventListener( 'resize', this.onWindowResize );

    window.addEventListener( 'keypress', this.keyboard );


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
        points.material.color.setHex( Math.random() * 0xffffff );
        break;

    }

    animate();

  }

  onWindowResize() {
 
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  // onDocumentMouseMove( event ) {
  //   mouse.x = ( event.clientX - window.innerWidth / 2 ) * 8;
  //   mouse.y = ( event.clientY - window.innerHeight / 2 ) * 8;
  // }



  render() {
    return (
      <div className='component'>
      <Head>
       
      </Head>
      <div className="container" ref={(mount) => { this.mount = mount }}>
        <canvas className="canvas"></canvas>
      </div>


      <style jsx>{`

                  
      `}</style>

    </div>
    )
  }
}


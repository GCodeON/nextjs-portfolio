import React from 'react'
import Head from 'next/head'

import * as THREE from 'three';
import { OrbitControls } from '@/node_modules/three/examples/jsm/controls/OrbitControls'

let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center;

function animate () {
  requestAnimationFrame( animate );

  camera.position.x += ( mouse.x - camera.position.x ) * 0.15;
  camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
  camera.lookAt( center );

  renderer.render( scene, camera );
};

export default class Kinect extends React.Component {
  constructor(props) {
    super(props);

    this.frame = null
  }
  componentDidMount() {


    this.init();

    animate();

  }


  init() {

    renderer = new THREE.WebGLRenderer( { 
      antialias : true,
      canvas    : document.querySelector('.bg')
    })

    renderer = setPixelRatio( window.devicePixelRatio );
    renderer = setSize( window.innerWidth, window.innerHeight );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth, window.innerHeight, 0.01, 40)

    camera.position.set( 0, 0, 1);
    scene.add( camera );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 0.5;
    controls.maxDistance = 10;


  }

  onWindowResize() {
 
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  onDocumentMouseMove( event ) {
    mouse.x = ( event.clientX - window.innerWidth / 2 ) * 8;
    mouse.y = ( event.clientY - window.innerHeight / 2 ) * 8;
  }


  render() {
    return (
      <div className='component'>
      <Head>
       
      </Head>
      <div className="container" ref={(mount) => { this.mount = mount }}>
        <canvas className=""></canvas>
      </div>


      <style jsx>{`



                  
      `}</style>

    </div>
    )
  }
}


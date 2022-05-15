import React from 'react'
import Head from 'next/head'

import * as THREE from 'three';
import { PCDLoader } from '/node_modules/three/examples/jsm/loaders/PCDLoader.js';
// import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'


let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center, model;


function animate () {
  requestAnimationFrame( animate );

  if(model) {
    // model.rotation.y += 0.01;

    // camera.position.x += ( mouse.x - camera.position.x ) * 0.15;
    // camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
    // camera.lookAt( center );
  
  }
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
    
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth, window.innerHeight, 0.01, 40)
    camera.position.set( 0, 0, 1);

    scene = new THREE.Scene();
    center = new THREE.Vector3();
    center.z = - 1;

    scene.add( camera );

    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', animate ); // use if there is no animation loop
    // controls.minDistance = 0.5;
    // controls.maxDistance = 10;

    this.loadModel();
    mouse = new THREE.Vector3( 0, 0, 1 );
    
    window.addEventListener( 'resize', this.onWindowResize );
    document.addEventListener( 'mousemove', this.onDocumentMouseMove );
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
        <canvas className="canvas"></canvas>
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


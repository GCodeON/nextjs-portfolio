import React from 'react'
import Head from 'next/head'

import * as THREE from 'three'

let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center;
let controls;

let objectA, objectB;

function animate () {
  requestAnimationFrame( animate );
  rotate();
  renderer.render( scene, camera );
};

function rotate() {
  objectA.rotation.z += 0.02;
  objectB.rotation.z += -0.01;
  objectB.rotation.y += 0.01;
}

export default class threeD extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    renderer =  new THREE.WebGLRenderer({
      canvas: document.querySelector('.bg')
    });
    renderer.setSize( window.innerWidth , window.innerHeight )
    renderer.setPixelRatio( window.devicePixelRatio );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    camera.position.setZ(15);
    renderer.render(scene, camera);

    this.createRing();
    this.createDodecahedron();

    window.addEventListener( 'resize', this.onWindowResize );

    animate();
  }

  onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  createRing() {
    geometry = new THREE.RingGeometry(2.5, 1, 16);
    material = new THREE.MeshBasicMaterial( {
      color     : '0xFF6347',
      wireframe : true
    })

    objectA = new THREE.Mesh(geometry, material);
    scene.add(objectA);
  }

  createDodecahedron() {
    geometry = new THREE.IcosahedronGeometry(7);
    material = new THREE.MeshBasicMaterial( {
      wireframe : true
    })

    objectB = new THREE.Mesh(geometry, material);
    scene.add(objectB);
  }

  render() {
    return (
    <div className="3d-component">
      <Head>
     
      </Head>
      <canvas className="bg"></canvas>
      <style jsx>{`

        canvas {
          position : fixed;
          top      : 0;
          left     : 0;
        }
        .content {
          position : relative;
        }
                  
      `}</style>

    </div>
    )
  }
}


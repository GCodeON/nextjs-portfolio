import React from 'react'
import Head from 'next/head'

import * as THREE from 'three'

let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center;

let objectA, objectB;

function animate () {
  requestAnimationFrame( animate );
  // objectA.rotation.y += 0.03;
  objectA.rotation.z += 0.01;
  objectB.rotation.y += -0.03;
  renderer.render( scene, camera );
};

export default class threeD extends React.Component {
  constructor(props) {
    super(props);

  }
  


  async componentDidMount() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer =  new THREE.WebGLRenderer({
      canvas: document.querySelector('.bg')
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth , window.innerHeight )

    camera.position.setZ(15);
    renderer.render(scene, camera);
    console.log("scene loaded", scene, camera, renderer);
    

    this.createRing()
    this.createDodecahedron()

    window.addEventListener( 'resize', this.onWindowResize );
    animate();
  }


  createRing() {
    geometry = new THREE.RingGeometry(4.5, 10, 16);
    material = new THREE.MeshBasicMaterial( {
      color     : '0xFF6347',
      wireframe : true
    })

    objectA = new THREE.Mesh(geometry, material);
    scene.add(objectA);
  }

  createDodecahedron() {
    geometry = new THREE.TetrahedronGeometry(2, 1);
    material = new THREE.MeshBasicMaterial( {
      wireframe : true
    })

    objectB = new THREE.Mesh(geometry, material);
    scene.add(objectB);
  }

  onWindowResize() {
 
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    console.log('onResize');
  }

  render() {
    return (
    <div className="3d-component">
      <Head>
     
      </Head>
      <canvas className="bg"></canvas>
        <div >
          {/* <div className="content">
            <div className="item">

              <span className="pretitle">Test</span>
              <h2 className="title">3D</h2>
            </div>
          </div> */}
        </div>
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


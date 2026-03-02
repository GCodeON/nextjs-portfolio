import React from 'react'

import * as THREE from 'three'

let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center;
let controls;

let objectA, objectB;
let animationFrameId = null;

function animate () {
  animationFrameId = requestAnimationFrame( animate );
  if (!renderer || !scene || !camera || !objectA || !objectB) {
    return;
  }
  rotate();
  renderer.render( scene, camera );
};

function rotate() {
  objectA.rotation.z += 0.02;
  objectB.rotation.z += -0.01;
  objectB.rotation.y += 0.01;
}

function startAnimation() {
  if (animationFrameId !== null) {
    return;
  }

  animate();
}

function stopAnimation() {
  if (animationFrameId === null) {
    return;
  }

  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
}

export default class threeD extends React.Component {
  constructor(props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }
  
  componentDidMount() {
    renderer =  new THREE.WebGLRenderer({
      canvas: document.querySelector('.bg')
    });
    renderer.setSize( window.innerWidth , window.innerHeight )
    renderer.setPixelRatio( Math.min(window.devicePixelRatio || 1, 1.5) );

    scene = new THREE.Scene(); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    camera.position.setZ(15);
    renderer.render(scene, camera);

    this.createRing();
    this.createDodecahedron();

    window.addEventListener( 'resize', this.onWindowResize );
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    if (!document.hidden) {
      startAnimation();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    stopAnimation();

    if (objectA) {
      objectA.geometry?.dispose?.();
      objectA.material?.dispose?.();
      scene?.remove?.(objectA);
      objectA = null;
    }

    if (objectB) {
      objectB.geometry?.dispose?.();
      objectB.material?.dispose?.();
      scene?.remove?.(objectB);
      objectB = null;
    }

    renderer?.dispose?.();
    scene = null;
    camera = null;
    renderer = null;
    geometry = null;
    material = null;
  }

  onVisibilityChange() {
    if (document.hidden) {
      stopAnimation();
      return;
    }

    if (renderer && scene && camera && objectA && objectB) {
      startAnimation();
    }
  }

  onWindowResize() {
    if (!renderer || !camera) {
      return;
    }

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


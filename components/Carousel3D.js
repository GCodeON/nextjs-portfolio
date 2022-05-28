import React from 'react'
import Head from 'next/head'
import image from 'next/image';

import TWEEN from '@tweenjs/tween.js'

import * as THREE from 'three'
import OrbitControls from 'threejs-orbit-controls';

let container,
camera, scene, renderer, center,
updatecamera = false,
carouselupdate = true,
carousel = null,

objectA = null,

// carousel,
targetRotationY            = 0,
targetRotationOnMouseDownY = 0,
targetRotationX            = 0,
targetRotationOnMouseDownX = 0,

windowHalfX = 0,
windowHalfY = 0,
mouse       = {
  x : 0,
  y : 0
}, 
prevmouse={
  x : 0,
  y : 0
},
mouseX            = 0,
mouseXOnMouseDown = 0,
mouseY            = 0,
mouseYOnMouseDown = 0,
reflectionplane   = null;


function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  // if (carouselupdate && carousel) {
  //   carousel.rotation.y += ( targetRotationY - carousel.rotation.y ) * 0.05;
  // }
  // if (updatecamera && Math.abs(mouse.y-prevmouse.y)>Math.abs(mouse.x-prevmouse.x)) {
  //   camera.position.z +=  (mouse.y-prevmouse.y)*20;
  //   renderer.render( scene, camera );
  //   updatecamera=false;
  //   //carouselupdate=true;
  //   // TWEEN.update();
  // }
}

export default class Carousel3D extends React.Component {
  constructor(props) {
    super(props);

    this.w = null;
    this.h = null;
    this.container = null;
    

    this.radius              = null;
    this.width               = this.props.width;
    this.height              = this.props.height;
    this.reflectionOpacity   = 0.2;
    this.reflectionHeightPer = 0.4;
    this.imagesList          = this.props.list;
    this.images              = this.imagesList;
    this.l                   = this.images.length;
    this.howMany             = 0;
    this.carouselLength      = this.images ? this.images.length : 0;
    this.anglePer            =  2*Math.PI/this.l 

    this.cntx = null;
  }

  componentDidMount() {

    console.log('angleper', this.anglePer);
    this.init();
  }

  init() {
    this.w = window.innerWidth
    this.h = window.innerHeight;

    renderer = new THREE.WebGLRenderer( {
      canvas: document.querySelector('.carousel')
    });

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );

    camera.position.setZ(10);
    renderer.render(scene, camera);


    // center = new THREE.Vector3();
    // center.z = - 1000;
    // this.createRing();
    this.buildCarousel();

    window.addEventListener( 'resize', this.onWindowResize );
    this.addControls();

    scene.add(carousel);
    console.log('added carousel', scene, camera, carousel);
    
    renderer.render(scene, camera);

    animate();
  }

  onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  addControls() {
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', animate ); // use if there is no animation loop
    controls.minDistance = 0.5;
    controls.maxDistance = 10;
  }

  buildCarousel() {
    let size, 
        height, 
        aa,
        text3d, 
        textMaterial, 
        text, 
        textcontainer,
        texture, 
        plane, 
        canvas, 
        gradient, 
        texture2, 
        material, 
        geometry;

    let w        = this.width,
        h        = this.height,
        reflectH = this.reflectionHeightPer*h,
        r        = this.radius
        
      
    carousel = new THREE.Object3D();

    this.imagesList.map((item, i) => {
    
      let geometry = null;

      const loader = new THREE.TextureLoader();
      loader.load(item.image, (texture) => {

        aa = i * this.anglePer;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide
        });
        geometry = new THREE.PlaneGeometry(w, h, 3, 3);

        plane = new THREE.Mesh(geometry, material);

        // plane.rotation.y    = -aa - Math.PI / 2;
        console.log('angle, aa', this.anglePer, aa)
        plane.position.set( new THREE.Vector3( r * Math.cos(aa), 0, r * Math.sin(aa) ));

        plane.doubleSided   = true;
        plane.carouselAngle = aa; //plane.rotation.y;
        plane.scale.x       = -1;

        carousel.add(plane);
      });
    })
    
  };

  createRing() {
    let geometry, material;

    geometry = new THREE.RingGeometry(2.5, 1, 16);
    material = new THREE.MeshBasicMaterial( {
      color     : '0xFF6347',
      wireframe : true
    })

    objectA = new THREE.Mesh(geometry, material);
    scene.add(objectA);
  }

  render() {
    return (
      <div>
        <Head>

        </Head>
        <div className="carousel-component">
          <canvas className="carousel"></canvas>
        </div>

        <style jsx>{`



        `}</style>
      </div>
    )
  }
}

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
    

    this.radius              = this.props.radius;
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

    camera.position.setZ(500);
    renderer.render(scene, camera);

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
        geometry,
        reflectH = this.reflectionHeightPer * this.h
        
      
    carousel = new THREE.Object3D();

    this.imagesList.map((item, i) => {
  
      const loader = new THREE.TextureLoader();
      loader.load(item.image, (texture) => {
        this.createPlane(texture, i);
      });
    })
    
  };

  createPlane(texture, index) {
    let material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    let geometry = new THREE.PlaneGeometry(this.w, this.h, 3, 3);

    let plane = new THREE.Mesh(geometry, material);

    let aa = index * this.anglePer;
    plane.rotation.y = -aa-Math.PI/2;
    plane.position.set( new THREE.Vector3( this.radius * Math.cos(aa), 0, this.radius * Math.sin(aa) ));
    console.log('rotation and position', -aa, plane.rotation, plane.position )
    plane.doubleSided   = true;
    plane.carouselAngle = aa; //plane.rotation.y;
    plane.scale.x       = -1;

    console.log('texture caption', this.imagesList[index].caption);
    if (texture.caption) {
        // position text caption, relative to image plane
        textcontainer.position.x=plane.position.x;
        textcontainer.position.y=plane.position.y-size-0.5*h-5;
        textcontainer.position.z=plane.position.z;
        textcontainer.rotation.y=plane.rotation.y;
        text.scale.x=plane.scale.x;
        text.position.x=w*0.5;
    }

    carousel.add(plane);



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

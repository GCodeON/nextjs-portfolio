import React from 'react'
import Head from 'next/head'

import TWEEN from '@tweenjs/tween.js'


import * as THREE from 'three'
import image from 'next/image';

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


function animate() 
{
    requestAnimationFrame( animate );
    // render();
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
    renderer.render( scene, camera );
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
    this.anglePer            = null;

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

    camera.position.setZ(15);
    renderer.render(scene, camera);


    // center = new THREE.Vector3();
    // center.z = - 1000;
    this.createRing();
    this.buildCarousel();

    window.addEventListener( 'resize', this.onWindowResize );

    scene.add(carousel);
    console.log('added carousel', scene, camera, carousel);
    
    renderer.render(scene, camera);

    animate();

    // if(carousel) {
    //   scene.add(carousel);
    //   console.log('added carousel');
    //   renderer.render(scene, camera);

    //   animate();
    // }
    

  }

  onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
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
        r        = this.radius,
        anglePer = this.anglePer;
        
      
    carousel = new THREE.Object3D();
    this.imagesList.map((item, i) => {



  const boxWidth = 2;
  const boxHeight = 2;
  const boxDepth = 1;
  let geometry = null;

  const cubes = [];  // just an array we can use to rotate the cubes
  const loader = new THREE.TextureLoader();
  loader.load(item.image, (texture, i) => {
    geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // cubes.push(cube);  // add to our list of cubes to rotate
      aa = i * anglePer;
      geometry = new THREE.PlaneGeometry(w, h, 3, 3);

      plane = new THREE.Mesh(geometry, material);
      plane.rotation.y = -aa - Math.PI / 2;

      plane.doubleSided = true;
      plane.carouselAngle = aa;
      plane.scale.x = -1;

      carousel.add(plane);
  });


      // aa = i * anglePer;

      // const loader = new THREE.TextureLoader();

      // const material = new THREE.MeshBasicMaterial({
      //   map  : loader.load(item.image),
      //   side : THREE.DoubleSide
      // });

      // geometry = new THREE.PlaneGeometry(w, h, 3, 3);

      // plane = new THREE.Mesh(geometry, material);
      // plane.rotation.y = -aa - Math.PI / 2;

      // plane.doubleSided = true;
      // plane.carouselAngle = aa;
      // plane.scale.x = -1;

      // // console.log('add image plane', texture, material, plane);

      // carousel.add(plane);

      // let loader = new THREE.TextureLoader();

      // // load a resource
      // loader.load(
      //   // resource URL
      //   item.image,

      //   // onLoad callback
      //    (texture ) => {
        
      //     texture.needsUpdate = true;
    
      //     let materialOptions =  { 
      //       map: texture,
      //       side: THREE.DoubleSide
      //     }
    
      //     material = new THREE.MeshBasicMaterial(materialOptions);
      //     geometry = new THREE.PlaneGeometry(w, h, 3, 3);
    
      //     plane = new THREE.Mesh(geometry, material);
      //     plane.rotation.y = -aa - Math.PI / 2;
    
      //     plane.doubleSided = true;
      //     plane.carouselAngle = aa;
      //     plane.scale.x = -1;
    
      //     // console.log('add image plane', texture, material, plane);

      //     carousel.add(plane);
      //   },

      //   // onProgress callback currently not supported
      //   undefined,

      //   // onError callback
      //   function ( err ) {
      //     console.error( 'An error happened.' );
      //   }
      // );
    })

    


    // reflectionplane.position.set( new THREE.Vector3( r*Math.cos(aa), 0, r*Math.sin(aa) ));
    // plane.position.set( new THREE.Vector3( r * Math.cos(aa), 0, r * Math.sin(aa) ));
    
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

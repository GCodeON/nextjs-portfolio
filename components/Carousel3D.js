import React from 'react'
import Head from 'next/head'

import TWEEN from '@tweenjs/tween.js'


import * as THREE from 'three'
import image from 'next/image';

let container,
camera, scene, renderer,
updatecamera = false,
carouselupdate = true,
carousel = null,

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

    carousel = new THREE.Object3D();
    console.log('new carousel 3D', carousel);

    this.init();
  }

  init() {
    this.w = window.innerWidth
    this.h = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, this.w / this.h, 1, 1000 );

    camera.position.z = 500;
    scene.add (camera);

    // projector = new THREE.Projector();
    renderer = new THREE.WebGLRenderer( {
      canvas: document.querySelector('.carousel')
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    this.buildCarousel();

    scene.add(carousel);

    animate();

  }

  buildCarousel() {
    console.log('buildCarousel', this.props.list);

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
        
      

    this.carouselBuild =  this.imagesList.map((item, i) => {

      aa = i * anglePer;

      // image plane

      let image = new Image(50, 50);

      image.src = item.image;

      image.onload = (img) => {
        console.log('get image', img);

        texture = new THREE.Texture(img.path[0].currentSrc);
        texture.needsUpdate = true;

        let materialOptions =  { 
          map: texture,
          side: THREE.DoubleSide
        }

        material = new THREE.MeshBasicMaterial(materialOptions);
        geometry = new THREE.PlaneGeometry(w, h, 3, 3);

        plane = new THREE.Mesh(geometry, material);
        plane.rotation.y = -aa - Math.PI / 2;

        plane.doubleSided = true;
        plane.carouselAngle = aa;
        plane.scale.x = -1;

        console.log('add image plane', plane);
        carousel.add(plane);
      
      };


      

      // reflection

      // canvas = document.createElement( 'canvas' );
      // this.cntx = canvas.getContext( '2d' );
      // console.log('define', this.cntx);
      // canvas.width = w;
      // canvas.height = reflectH;


      // this.cntx.save();
      // this.cntx.globalAlpha = this.reflectionOpacity;
      // this.cntx.translate(0, h-1);
      // this.cntx.scale(1, -1);			
      // this.cntx.drawImage(image, 0, 0, w, h /*,0,0,scope.w, scope.reflectionHeightPer*scope.h*/);				
      // this.cntx.restore();
      // this.cntx.globalCompositeOperation = "destination-out";

            
      //   gradient = this.cntx.createLinearGradient(0, 0, 0, reflectH);
      //   //gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      //   gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
      //   //gradient.addColorStop(0, "rgba(255, 255, 255, " + (scope.reflectionOpacity) + ")");
      //   gradient.addColorStop(0, "rgba(255, 255, 255, 0.0)");
      //   this.cntx.fillStyle = gradient;
      //   this.cntx.fillRect(0, 0, w, 2*reflectH);		

      // console.log('test callback', this.cntx);

      // texture2                      = new THREE.Texture( canvas );
      // texture2.needsUpdate          = true;
      // material                      = new THREE.MeshBasicMaterial( { map: texture2, side: THREE.DoubleSide, transparent: true } );
      // reflectionplane               = new THREE.Mesh( new THREE.PlaneGeometry( w,  reflectH, 3, 3 ), material );
      // reflectionplane.rotation.y    = -aa-Math.PI/2;
  
      // reflectionplane.doubleSided   = true;
      // reflectionplane.carouselAngle = aa;
      // reflectionplane.scale.x       = -1;
      // // reflectionplane.position.y    = textcontainer.position.y-10-3*size;

      // carousel.add(plane);
      // carousel.add(reflectionplane);







      // const loader = new THREE.ImageLoader();
      // console.log('loader', loader);
      // loader.load(
      //   // resource URL
      //   item.image,
      
      //   // onLoad callback
      //    ( image ) => {
      //     // // use the image, e.g. draw part of it on a canvas
      //     // const canvas = document.createElement( 'canvas' );
      //     // const context = canvas.getContext( '2d' );
      //     // context.drawImage( image, 100, 100 );


         
      //   },
      
      //   // onProgress callback currently not supported
      //   undefined,
      
      //   // onError callback
      //   function () {
      //     console.error( 'An error happened.' );
      //   }
      // );

      
	

    })
    // reflectionplane.position.set( new THREE.Vector3( r*Math.cos(aa), 0, r*Math.sin(aa) ));
    // plane.position.set( new THREE.Vector3( r * Math.cos(aa), 0, r * Math.sin(aa) ));
    console.log('carousel', carousel);
  };


 


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

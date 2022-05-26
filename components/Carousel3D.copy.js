import React from 'react'
import Head from 'next/head'

import TWEEN from '@tweenjs/tween.js'

import * as THREE from 'three'

let container,
camera, scene, renderer,
updatecamera = false,
carouselupdate = true,

carousel,
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
mouseYOnMouseDown = 0;


function animate() {
  requestAnimationFrame( animate );
  // this.render();

  if (carousel && carouselupdate) {
    carousel.rotation.y += ( targetRotationY - carousel.rotation.y ) * 0.05;
  }
  if (updatecamera && Math.abs(mouse.y-prevmouse.y)>Math.abs(mouse.x-prevmouse.x)) {
    camera.position.z += (mouse.y-prevmouse.y)*20;
  }
  renderer.render( scene, camera );
  updatecamera = false;
  //carouselupdate=true;
  TWEEN.update();
}

export default class Work extends React.Component {
  constructor(props) {
    super(props);

    this.carousel            = null
    this.radius              = null;
    this.width               = null;
    this.height              = null;
    this.reflectionOpacity   = 0.2;
    this.reflectionHeightPer = 0.4;
    this.imagesList          = [];
    this.images              = this.imagesList;
    this.l                   = this.images.length;
    this.howMany             = 0;
    this.carouselLength      = this.images ? this.images.length : 0;
    this.anglePer            = null;
  }

  componentDidMount() {


    

    // CarouselApplication.init([
    //   {url:'/images/img-01.jpg', caption:'d1.jpg', width:150, height:100},
    //   {url:'/images/img-02.jpg', caption:'d2.jpg', width:150, height:100},
    //   {url:'/images/img-03.jpg', caption:'d3.jpg', width:150, height:100},
    //   {url:'/images/img-04.jpg', caption:'d4.jpg', width:150, height:100},
    //   {url:'/images/img-05.jpg', caption:'d5.jpg', width:150, height:100},
    //   {url:'/images/img-06.jpg', caption:'d6.jpg', width:150, height:100}
    // ]);
    // console.log('check component load');

    this.init();
  
  }

  init(images) {
    renderer =  new THREE.WebGLRenderer({
      canvas: document.querySelector('.carousel')
    });
    renderer.setSize( window.innerWidth , window.innerHeight )
    renderer.setPixelRatio( window.devicePixelRatio );

    scene             = new THREE.Scene();
    camera            = new THREE.PerspectiveCamera( 70,  window.innerWidth / window.innerHeight, 1, 1000 );

    console.log('renderer', renderer, scene, camera);

    windowHalfX = 0.5 * window.innerWidth,
    windowHalfY = 0.5 * window.innerHeight

    camera.position.z = 500;
    scene.add( camera );
    // projector = new THREE.Projector();


    // Carousel
    let carouselTHREE = this.createCarousel(200, 150, 100);

    
    scene.add( carouselTHREE );


    // container.appendChild( renderer.domElement );

    window.addEventListener( 'dblclick', this.onDblClick, false );
    window.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
    window.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
    window.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
    
    animate();

  }

  createCarousel(radius, width, height) {
    // THREE.Object3D.call(this);

    // let create = {};

    new THREE.Object3D();

    this.radius = radius;
    this.width = width;
    this.height = height;
    this.anglePer = ( this.l > 0 ) ? 2 * Math.PI / this.l : 0;

    // for (i=-0; i < this.l; i++) {
    //     this.images[i].image= new Image();
    //     this.images[i].image.onload=function(i){ 
    //       return () => { 
    //         this.buildCarousel(scope, i);
    //       } 
    //     }(i);


    // }
    return this.images.map((i)=> {
      this.buildCarousel(scope, i);
      this.images[i].image.src = this.images[i].url;
    })

  }

  buildCarousel(scope, i) {
    let img = this.images[i];
    let size, height, text3d, textMaterial, text, textcontainer,
        texture, plane, canvas, cntx, gradient, texture2, material, reflectionPlane, 
        w = this.width, 
        h = this.height, 
        reflectH = this.reflectionHeightPer * h, r = this.radius, anglePer = this.anglePer, aa;
    
    // text caption
    if (img.caption) {
      size             = (0.4)*(w/img.caption.length);
      height           = 2;
      text3d           = new THREE.TextGeometry( img.caption, {
        size          : size,
        height        : height,
        curveSegments : 2,
        font          : 'vortice-concept'
      });
      textMaterial     = new THREE.MeshBasicMaterial( { 
        color: 0xffffff, 
        overdraw: true 
      } );
      text             = new THREE.Mesh( text3d, textMaterial );
      text.doubleSided = false;
      textcontainer    = new THREE.Object3D();
      textcontainer.add(text);
    }
    
    // image plane
    texture             = new THREE.Texture(img.image);                                                             /*THREE.ImageUtils.loadTexture( img.url );*/
    texture.needsUpdate = true;
    material            = new THREE.MeshBasicMaterial({ 
      map      : texture,
      side     : THREE.DoubleSide,
      overdraw : true
    });
    plane               = new THREE.Mesh( new THREE.PlaneGeometry( w, h, 3, 3 ), material );
    aa                  = i * anglePer;
    plane.rotation.y    = -aa-Math.PI/2;
    plane.position      = new THREE.Vector3( r*Math.cos(aa), 0, r*Math.sin(aa) );
    plane.doubleSided   = true;
    plane.carouselAngle = aa;                                                                                       //plane.rotation.y;
    plane.scale.x       = -1;
    
    if (img.caption)
    {
        // position text caption, relative to image plane
        textcontainer.position.x=plane.position.x;
        textcontainer.position.y=plane.position.y-size-0.5*h-5;
        textcontainer.position.z=plane.position.z;
        textcontainer.rotation.y=plane.rotation.y;
        text.scale.x=plane.scale.x;
        text.position.x=w*0.5;
    }
    
    // reflection
    /*
        There are different ways for creating reflections. 
        One possible approach is to add another copy of the object turned upside-down and place semi-transparent plane between these two copies:
        http://mrdoob.github.com/three.js/examples/webgl_geometry_text.html
    */
    canvas        = document.createElement( 'canvas' );
    canvas.width  = w;
    canvas.height = reflectH;

    cntx = canvas.getContext( '2d' );
    cntx.save();
    cntx.globalAlpha = scope.reflectionOpacity;
    cntx.translate(0, h-1);
    cntx.scale(1, -1);				
    cntx.drawImage(img.image, 0, 0, w, h /*,0,0,scope.w, scope.reflectionHeightPer*scope.h*/);				
    cntx.restore();
    cntx.globalCompositeOperation = "destination-out";
    
    gradient = cntx.createLinearGradient(0, 0, 0, reflectH);
    //gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
    //gradient.addColorStop(0, "rgba(255, 255, 255, " + (scope.reflectionOpacity) + ")");
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.0)");
    cntx.fillStyle = gradient;
    cntx.fillRect(0, 0, w, 2*reflectH);				
    
    texture2                      = new THREE.Texture( canvas );
    texture2.needsUpdate          = true;
    material                      = new THREE.MeshBasicMaterial( { map: texture2, side: THREE.DoubleSide, transparent: true } );
    reflectionplane               = new THREE.Mesh( new THREE.PlaneGeometry( w,  reflectH, 3, 3 ), material );
    reflectionplane.rotation.y    = -aa-Math.PI/2;
    reflectionplane.position      = new THREE.Vector3( r*Math.cos(aa), 0, r*Math.sin(aa) );
    reflectionplane.doubleSided   = true;
    reflectionplane.carouselAngle = aa;
    reflectionplane.scale.x       = -1;
    reflectionplane.position.y    = textcontainer.position.y-10-3*size;
    
    // add them to the carousel
    scene.add( plane );
    scene.add( reflectionplane );
    if (this.images[i].caption) {
      scene.add( textcontainer );
    }
  };

  rotateToItem(item, callback) {
    var angle, b, ang;
    
    // find shortest rotation angle (modulo)
    angle=(item.carouselAngle-Math.PI/2)%(2*Math.PI);
    b=this.rotation.y%(2*Math.PI);
    
    if (b>0) b=-2*Math.PI+b;
    
    this.rotation.y=b;
    
    if (angle<b) angle+=2*Math.PI;
    
    if ((angle-b)>2*Math.PI-(angle-b))
        ang=b+(-(2*Math.PI-(angle-b)));
    else
        ang=b+(angle-b);
    
    // tween it
    new TWEEN.Tween(this.rotation)
        .to({y:ang},800)
        .easing(TWEEN.Easing.Exponential.EaseInOut)
        .onComplete(function(){
            if (callback)
                callback.call(rotateToItem());
        })
        .start();
  };

  onDblClick( e ) {
    e.preventDefault();
    dblclick = true;
    carouselupdate = false;
    
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    var vector  = new THREE.Vector3( mouse.x, mouse.y, 1 );
    projector.unprojectVector( vector, camera );

    var rayCaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    var intersects = rayCaster.intersectObjects( carousel.children );

    if ( intersects.length > 0 ) {
      carousel.rotateToItem(intersects[0].object, function() {
        targetRotationY = this.rotation.y;
        carouselupdate  = true;
      });
    }

  }
    
    onDocumentMouseDown( e ) {
      e.preventDefault();

      window.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
      window.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
      window.addEventListener( 'mouseout', this.onDocumentMouseOut, false );

      mouse.x                    = ( e.clientX / window.innerWidth ) * 2 - 1;
      mouse.y                    = - ( e.clientY / window.innerHeight ) * 2 + 1;
      prevmouse                  = {x:mouse.x,y:mouse.y};
      mouseXOnMouseDown          = e.clientX - windowHalfX;
      mouseYOnMouseDown          = e.clientY - windowHalfY;
      targetRotationOnMouseDownY = targetRotationY;
      targetRotationOnMouseDownX = targetRotationX;
    }
    
    onDocumentMouseMove( e ) {
      mouseX  = e.clientX - windowHalfX;
      mouseY  = e.clientY - windowHalfY;
      mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

      targetRotationY = targetRotationOnMouseDownY + ( mouseX - mouseXOnMouseDown ) * 0.02;
      targetRotationX = targetRotationOnMouseDownX + ( mouseY - mouseYOnMouseDown ) * 0.02;
      updatecamera    = true;
    }

    onDocumentMouseUp( e ) {
      window.removeEventListener( 'mousemove', this.onDocumentMouseMove, false );
      window.removeEventListener( 'mouseup', this. onDocumentMouseUp, false );
      window.removeEventListener( 'mouseout', this.onDocumentMouseOut, false );
    }

    onDocumentMouseOut( e ) {
      window.removeEventListener( 'mousemove', this.onDocumentMouseMove, false );
      window.removeEventListener( 'mouseup', this.onDocumentMouseUp, false );
      window.removeEventListener( 'mouseout', this.onDocumentMouseOut, false );
    }

  onDocumentTouchStart( e ) {
    if ( e.touches.length == 1 ) {
      e.preventDefault();

      mouse.x                    = ( e.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
      mouse.y                    = - ( e.touches[ 0 ].pageY / window.innerHeight ) * 2 + 1;
      prevmouse                  = {x:mouse.x,y:mouse.y};
      mouseXOnMouseDown          = e.clientX - windowHalfX;
      mouseYOnMouseDown          = e.clientY - windowHalfY;
      targetRotationOnMouseDownY = targetRotationY;
      targetRotationOnMouseDownX = targetRotationX;

    }
  }

  onDocumentTouchMove( e ) {
    if ( e.touches.length == 1 ) {
      e.preventDefault();

      mouse.x                    = ( e.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
      mouse.y                    = - ( e.touches[ 0 ].pageY / window.innerHeight ) * 2 + 1;
      prevmouse                  = {x:mouse.x,y:mouse.y};
      mouseXOnMouseDown          = e.clientX - windowHalfX;
      mouseYOnMouseDown          = e.clientY - windowHalfY;
      targetRotationOnMouseDownY = targetRotationY;
      targetRotationOnMouseDownX = targetRotationX;
      updatecamera               = true;
    }
  }

  requestAnimationFrame() {

    return window.webkitRequestAnimationFrame ||window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback, element) {
      window.setTimeout( callback, 1000 / 60 );
    };
  
  }
    
  // render() {

  // }
    


  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css"></link>
        </Head>
        <div className="work-component">
          <canvas className="carousel"></canvas>
        </div>

        <style jsx>{`

        `}</style>
      </div>
    )
  }
}

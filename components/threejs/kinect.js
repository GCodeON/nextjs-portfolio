import React from 'react'
import Head from 'next/head'

import * as THREE from 'three';

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
    this.video    = null,
    this.frame = null
  }
  componentDidMount() {
    this.video = document.getElementById( 'video' );

    this.init();

    animate();

  }


  init() {
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 0, 500 );

    scene = new THREE.Scene();
    center = new THREE.Vector3();
    center.z = - 1000;

    const texture = new THREE.VideoTexture( this.video );
	  texture.minFilter = THREE.NearestFilter;

    const width = 640, height = 480;
    const nearClipping = 850, farClipping = 4000;

    geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array( width * height * 3 );

    for ( let i = 0, j = 0, l = vertices.length; i < l; i += 3, j ++ ) {

      vertices[ i ] = j % width;
      vertices[ i + 1 ] = Math.floor( j / width );

    }

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    material = new THREE.ShaderMaterial( {

      uniforms: {
        "map"          : { value: texture },
        "width"        : { value: width },
        "height"       : { value: height },
        "nearClipping" : { value: nearClipping },
        "farClipping"  : { value: farClipping },

        "pointSize" : { value: 2 },
        "zOffset"   : { value: 1000 }
      },
      vertexShader   : `
      uniform sampler2D map;
  
      uniform float width;
      uniform float height;
      uniform float nearClipping, farClipping;
  
      uniform float pointSize;
      uniform float zOffset;
  
      varying vec2 vUv;
  
      const float XtoZ = 1.11146; // tan( 1.0144686 / 2.0 ) * 2.0;
      const float YtoZ = 0.83359; // tan( 0.7898090 / 2.0 ) * 2.0;
  
      void main() {
  
        vUv = vec2( position.x / width, position.y / height );
  
        vec4 color = texture2D( map, vUv );
        float depth = ( color.r + color.g + color.b ) / 3.0;
  
        // Projection code by @kcmic
  
        float z = ( 1.0 - depth ) * (farClipping - nearClipping) + nearClipping;
  
        vec4 pos = vec4(
          ( position.x / width - 0.5 ) * z * XtoZ,
          ( position.y / height - 0.5 ) * z * YtoZ,
          - z + zOffset,
          1.0);
  
        gl_PointSize = pointSize;
        gl_Position = projectionMatrix * modelViewMatrix * pos;
  
      }
  `,
      fragmentShader :  `
           uniform sampler2D map;
      
           varying vec2 vUv;
      
           void main() {
      
             vec4 color = texture2D( map, vUv );
            gl_FragColor = vec4( color.r, color.g, color.b, 0.2 );
      
           }`,
      blending       : THREE.AdditiveBlending,
      depthTest      : false,
      depthWrite     : false,
      transparent    : true

    } );

    mesh = new THREE.Points( geometry, material );
		scene.add( mesh );

    this.video.play();

    renderer = new THREE.WebGLRenderer( {
      canvas: document.querySelector('.video')
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    mouse = new THREE.Vector3( 0, 0, 1 );

    document.addEventListener( 'mousemove', this.onDocumentMouseMove );

    window.addEventListener( 'resize', this.onWindowResize );


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
      <div>
      <Head>
       
      </Head>
      <div className="video-kinect" ref={(mount) => { this.mount = mount }}>
        
        <video id="video" autoPlay loop muted playsInline crossOrigin="anonymous">
          <source src="/textures/kinect.mp4"/>
        </video>
        <canvas className="video"></canvas>
      </div>


      <style jsx>{`

      #video {
        display: none;
      }

      // canvas {
      //   position : fixed;
      //   top      : 0;
      //   left     : 0;
      // }

                  
      `}</style>

    </div>
    )
  }
}


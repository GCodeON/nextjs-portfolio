import React from 'react'
import Head from 'next/head'

import * as THREE from 'three'


export default class threeD extends React.Component {
  constructor(props) {
    super(props);
    this.planes = null,
    this.smooth = null
  }
  


  async componentDidMount() {
    const scene = new THREE.Scene();
    console.log("scene loaded", scene);

  }

  render() {
    return (
    <div className="3d-component">
      <Head>
     
      </Head>
      <canvas className="bg"></canvas>
        <div >
          <div className="content">
            <div className="item">

              <span className="pretitle">Test</span>
              <h2 className="title">3D</h2>
            </div>
          </div>
        </div>
      <style jsx>{`

        canvas {
          position : fixed;
          top      : 0;
          left     : 0;
        }
                  
      `}</style>

    </div>
    )
  }
}


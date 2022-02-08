import React from 'react'
import Head from 'next/head'


import { Controller, Scene } from 'react-scrollmagic';

export default class Work extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  
  }


  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css"></link>
        </Head>
        <div className="work-component">

        <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
          <Scene pin>
            <div id="about" className="panel blue"><span >Panel</span></div>
          </Scene>
          <Scene pin>
            <div id="work" className="panel turqoise"><span>Panel</span></div>
          </Scene>
          <Scene pin>
            <div id="experience" className="panel green"><span>Panel</span></div>
          </Scene>
          <Scene pin>
            <div id="contact" className="panel bordeaux"><span>Panel</span></div>
          </Scene>
        </Controller>
        </div>

        <style jsx>{`

        `}</style>
      </div>
    )
  }
}

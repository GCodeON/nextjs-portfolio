import React from 'react'
import Head from 'next/head'

import Kinect from './kinect'
import Planes from './planes'

export default class Hero extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {

  }

  render() {
    return (
      <div>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css" />
      </Head>
      <div className="overlay">
        <div className="hero">
            <div className="intro">
                <span className="subline"></span>
                <h2 className="title">Gerardo</h2>
                <h2 className="title">Soto</h2>
            </div>
        </div>

        <Planes></Planes>

      </div>
    </div>
    )
  }
}


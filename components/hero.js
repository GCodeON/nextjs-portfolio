import React from 'react'
import Head from 'next/head'

import Link from 'next/link'

import Nav from './nav'

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
      {/* <Nav></Nav> */}
      <div className="overlay">
        <div className="hero">
            <div className="intro">
              {/* <span className="subline">Software Developer</span> */}
                <h2 className="title">Gerardo</h2>
                <h2 className="title">Soto</h2>

            </div>
        </div>


      </div>

  
      <style jsx global>{`

        `}</style>
    </div>
    )
  }
}


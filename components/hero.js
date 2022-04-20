import React from 'react'
import Head from 'next/head'

import Link from 'next/link'

import { FaGithub, FaLinkedin } from 'react-icons/fa';


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
               
                <h2 className="title">Gerardo</h2>
                <h2 className="title">Soto</h2>

                <div className="links">
                  <a href="https://github.com/GCodeON">
                    <FaGithub className="github icon"></FaGithub>
                   </a>

                  <a href="/test">
                    <FaLinkedin className="linkedin icon"></FaLinkedin>
                  </a>
                </div>
{/* 
                <span className="subline">Software Developer</span> */}

            </div>
        </div>


      </div>

  
      <style jsx global>{`
          .icon {
            display   : inline;
            font-size : x-large;
            color     : white;
            margin    : 2em 10px;
          }
        `}</style>
    </div>
    )
  }
}


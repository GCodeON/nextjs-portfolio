import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { FaGithub, FaLinkedin } from 'react-icons/fa';

import Layout from '../components/layout'

import CircularText from '../components/CircularText'
import ThreeD from '../components/3D'
import Hero from '../components/hero'
import Planes from '../components/planes'
import Work from '../components/work'
import Kinect from '../components/kinect'
import SimplePlane from '../components/SimplePlane'

export default function Home({props}) {

  return (
    <Layout>
      <Head>
        <title>GS | Gerardo Soto</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/kxo3pgz.css"></link>
        <script async src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
      </Head>
      {/* <nav className="nav">
          <a className="item current" href="#about">About</a>
          <a className="item"  href="#work">Work</a>
          <a className="item" href="#experience">Experience</a>
          <a className="item" href="#contact">Contact</a>
      </nav> */}
      <ThreeD></ThreeD>
      <CircularText strings={[]}>

          <Hero></Hero>  
          <Planes></Planes>
          <Kinect></Kinect>
          {/* <SimplePlane></SimplePlane> */}
          {/* <Work></Work> */}
      </CircularText>

      <div className="links">
        <a href="https://www.linkedin.com/in/gerardo-soto-becerra/" target="_blank">
          <FaLinkedin className="linkedin icon"></FaLinkedin>
        </a>
        <a href="https://github.com/GCodeON" target="_blank">
          <FaGithub className="github icon"></FaGithub>
        </a>


      </div>


      
      <style jsx>{`
          .links {
            position        : absolute;
            bottom          : 20px;
            left            : 0;
            right           : 0;
            display         : inline-flex;
            justify-content : center;
            z-index         : 2;
          }
      `}</style>

      <style jsx global>{`
  
      `}</style>
    </Layout>
  )
}

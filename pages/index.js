import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { FaGithub, FaLinkedin } from 'react-icons/fa';

import Layout from '../components/layout'

import CircularText from '../components/CircularText'
import ThreeD from '../components/3D'
import Hero from '../components/hero'
import Planes from '../components/planes'
import Carousel3D from '../components/Carousel3D'
import Kinect from '../components/kinect'
import Points from '../components/points'

export default function Home({props}) {

  let carousel = [
    {
      image   : '/tools/node.svg',
      caption : 'NODE JS'
    },
    {
      image   : '/tools/Threejs.svg',
      caption : 'THREE JS'
    },
    {
      image   : '/tools/react.png',
      caption : 'REACT JS'
    },
    {
      image   : '/tools/nextjs.png',
      caption : 'NEXT JS'
    }
  ]



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
          <Hero/>
          <Points/>
          <Planes/>
          <Kinect/>
          <Carousel3D 
            list   = {carousel}
            width  = {5}
            height = {5}
            radius = {3}
          />

      </CircularText>

      <div className="links">
        <a href="https://www.linkedin.com/in/gerardo-soto-becerra/" target="_blank">
          <FaLinkedin className="linkedin icon"/>
        </a>
        <a href="https://github.com/GCodeON" target="_blank">
          <FaGithub className="github icon"/>
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

          .container {
            position : relative;
            margin   : 0 auto;
            padding  : 0;
            cursor   : pointer
          }
      `}</style>

      <style jsx global>{`
  
      `}</style>
    </Layout>
  )
}

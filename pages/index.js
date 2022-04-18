import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/layout'
import CircularText from '../components/CircularText'

import Work from '../components/work'
import Kinect from '../components/kinect'
import Planes from '../components/planes'
import ThreeD from '../components/3D'


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
      <CircularText></CircularText>
      <ThreeD></ThreeD>
       
      <style jsx>{`

      `}</style>

      <style jsx global>{`
  
      `}</style>
    </Layout>
  )
}

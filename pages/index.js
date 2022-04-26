import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { FaGithub, FaLinkedin } from 'react-icons/fa';

import Layout from '../components/layout'
import CircularText from '../components/CircularText'

import Typed from 'typed.js';

import Hero from '../components/hero'
// import Work from '../components/work'
// import Kinect from '../components/kinect'
import Planes from '../components/planes'

import ThreeD from '../components/3D'



export default function Home({props}) {

  // useEffect(() => {
  //   const options = {
  //     strings: [
  //       'Some <i>strings</i> are slanted',
  //       'Some <strong>strings</strong> are bold',
  //       'HTML characters &times; &copy;'
  //     ],
  //     typeSpeed: 50,
  //     backSpeed: 50,
  //   };
    
  //   // elRef refers to the <span> rendered below
  //   typed.current = new Typed(el.current, options);
    
  //   return () => {
  //     // Make sure to destroy Typed instance during cleanup
  //     // to prevent memory leaks
  //     typed.current.destroy();
  //   }
  // }, [])

  
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
      <CircularText 
        strings={[]}
      >
        <div className='overlay'>

        {/* <span 
              className='typed'
              style={{ whiteSpace: 'pre' }} 
              ref={(el) => { this.el = el; }}
            /> */}
          <Hero></Hero>  
          <Planes></Planes>
        </div>
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

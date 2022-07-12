import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

import Layout from '../components/layout'
import Loader from '../components/loader'
import ThreeD from '../components/3D'

import Hero from '../components/hero'
import About from '../components/about'
import Slider from '../components/slider'
import Timeline from '../components/timeline'
import Contact from '../components/contact'
import Kinect from '../components/kinect'

export default function Home({props}) {

  const slider = [
    {
      image   : '',
      link    : '',
      tools: []
    },
    {
      image   : '/images/rescue.png',
      link    : 'https://rescueagency.com/',
      tools: [
        {
          image   : '/tools/php.svg',
        },
        {
          image   : '/tools/laravel.png',
        },
        {
          image   : '/tools/vue.png',
        },
        {
          image   : '/tools/js.png',
        },
        {
          image   : '/tools/mysql.png',
        }
      ]
    },
    {
      image   : '/images/up2sd.png',
      link    : 'https://up2sd.org/',
      tools: [
        {
          image   : '/tools/nuxtjs.svg',
        },
        {
          image   : '/tools/vue.png',
        },
        {
          image   : '/tools/js.png',
        },
        {
          image   : '/tools/nodejs.svg',
        },
        {
          image   : '/tools/strapi.svg',
        }
      ]
    },
    {
      image   : '/images/hustle&strive.png',
      link    : 'https://hustlestrive.com/',
      tools: [
        {
          image   : '/tools/nextjs-white.svg',
        },
        {
          image   : '/tools/react.png',
        },
        {
          image   : '/tools/js.png',
        },
        {
          image   : '/tools/aws.png',
        }
      ]
    },
    {
      image   : '/images/sta.png',
      link    : 'https://sharetheairva.com/',
      tools: [
        {
          image   : '/tools/php.svg',
        },
        {
          image   : '/tools/laravel.png',
        },
        {
          image   : '/tools/vue.png',
        },
        {
          image   : '/tools/js.png',
        },
        {
          image   : '/tools/mysql.png',
        }
      ]
    },
    {
      image   : '/images/aocs.png',
      link    : 'https://agentsofchangesummit.org/',
      tools: [
        {
          image   : '/tools/nuxtjs.svg',
        },
        {
          image   : '/tools/vue.png',
        },
        {
          image   : '/tools/js.png',
        },
        {
          image   : '/tools/aws.png',
        },
        {
          image   : '/tools/contentful.webp',
        }
      ]
    },
    {
      image   : '/images/yahlok.png',
      link    : 'https://yahlok.org/',
      tools: [
        {
          image   : '/tools/php.svg',
        },
        {
          image   : '/tools/wordpress.png',
        },
        {
          image   : '/tools/vue.png',
        },
        {
          image   : '/tools/js.png',
        },
        {
          image   : '/tools/mysql.png',
        }
      ]
    },
    {
      image   : '/images/methfree.png',
      link    : 'https://methfreelacounty.org/',
      tools: [
        {
          image   : '/tools/html5.png',
        },
        {
          image   : '/tools/js.png',
        },
        {
          image   : '/tools/css3.png',
        }
      ]
    },
    {
      image   : '',
      link    : '',
      tools: []
    },
  ]

  const timeline = [
    {
      dates   : '2017-Present',
      company : 'Rescue Agency',
      title   : 'Full Stack<br>Web Developer',
      class   : 'left',
      link    : 'https://rescueagency.com/'
    },
    {
      dates   : '2017-2019',
      company : 'SoftStack Factory',
      title   : 'Programming <br>Instructor',
      class   : 'right',
      link    : 'https://www.softstackfactory.com/'
    },
    {
      dates   : '2017-2018',
      company : 'Learning Equality',
      title   : 'Software Intern',
      class   : 'left',
      link    : 'https://learningequality.org/'
    },
    {
      dates   : '2013-2015',
      company : "Porter's Pub",
      title   : 'Graphic Designer',
      class   : 'right',
      link    : 'https://www.porterspublodica.com/'
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

      <ThreeD></ThreeD>
      <Loader strings={[]}>
          <Hero/>
          <section id="about">
            <About 
            title={'About'}
            description={"Full stack developer <br>highly experienced<br> designing, building, <br>and scaling <br>cloud hosted <br>software applications"}
            />
          </section>

          <section id="projects">
              <Slider slides={slider}/>
          </section>
        
          <section id="experience">
            <Timeline exp={timeline} />
          </section>
          <section id="contact">
            <Contact />
            <Kinect/> 
          </section>
      </Loader>

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

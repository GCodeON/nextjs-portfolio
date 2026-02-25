import { FaGithub, FaLinkedin } from 'react-icons/fa'

import Layout from './layout'
import Loader from './loader'
import ThreeD from './threejs/3D'

import Hero from './hero'
import About from './about'
import Slider from './slider'
import Timeline from './timeline'
import Contact from './contact'
import Kinect from './threejs/kinect'

export default function HomePage() {
  const about = [
    'Transforming static<br> design comps <br>into pixel perfect <br>interactive <br>applications',
    'Using NUXTjs, VUE, <br>NEXTjs, React, <br>NODE, AWS,<br> Laravel',
    'Designing, Building,<br> and scaling <br>cloud hosted <br>software'
  ]

  const tools = [
    { image: '/tools/vue.png' },
    { image: '/tools/nuxtjs.svg' },
    { image: '/tools/react.png' },
    { image: '/tools/nextjs-white.svg' },
    { image: '/tools/nodejs.svg' },
    { image: '/tools/typescript.svg' },
    { image: '/tools/gql.svg' },
    { image: '/tools/Threejs.svg' },
    { image: '/tools/python.png' },
    { image: '/tools/sass.png' },
    { image: '/tools/mysql.png' },
    { image: '/tools/mongodb.png' },
    { image: '/tools/wordpress.png' },
    { image: '/tools/laravel.png' },
    { image: '/tools/php.svg' },
    { image: '/tools/drupal.png' },
    { image: '/tools/strapi.svg' },
    { image: '/tools/html5.png' },
    { image: '/tools/js.png' },
    { image: '/tools/css3.png' },
    { image: '/tools/contentful.webp' },
    { image: '/tools/aws.png' }
  ]

  const slider = [
    {
      title: 'T Palmer Agency Website',
      role: 'Full Stack Web Developer',
      image: '/images/tpalmeragency.png',
      link: 'https://tpalmeragency.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      title: 'Rescue Agency Website',
      role: 'Full Stack Web Developer',
      image: '/images/rescue.png',
      link: 'https://rescueagency.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/laravel.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      title: 'Up2SD Website',
      role: 'Full Stack Web Developer',
      image: '/images/up2sd.png',
      link: 'https://up2sd.org/',
      tools: [
        { image: '/tools/nuxtjs.svg' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/nodejs.svg' },
        { image: '/tools/strapi.svg' }
      ]
    },
    {
      image: '/images/hartleygroup.png',
      link: 'https://harteygroup.co/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '/images/hustle&strive.png',
      link: 'https://hustlestrive.com/',
      tools: [
        { image: '/tools/nextjs-white.svg' },
        { image: '/tools/react.png' },
        { image: '/tools/js.png' },
        { image: '/tools/aws.png' }
      ]
    },
    {
      image: '/images/sta.png',
      link: 'https://sharetheairva.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/laravel.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '/images/aocs.png',
      link: 'https://agentsofchangesummit.org/',
      tools: [
        { image: '/tools/nuxtjs.svg' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/aws.png' },
        { image: '/tools/contentful.webp' }
      ]
    },
    {
      image: '/images/yahlok.png',
      link: 'https://yahlok.org/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '/images/methfree.png',
      link: 'https://methfreelacounty.org/',
      tools: [
        { image: '/tools/html5.png' },
        { image: '/tools/js.png' },
        { image: '/tools/css3.png' }
      ]
    },
    {
      image: '/images/fof.png',
      link: 'https://futureoffounders.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '',
      link: '',
      tools: []
    }
  ]

  const timeline = [
    {
      dates: '2024-Present',
      company: 'T Palmer Agency',
      title: 'Web Developer',
      type: 'Full-time',
      class: 'left',
      link: 'https://www.tpalmeragency.com/'
    },
    {
      dates: '2022-2023',
      company: 'Cortica',
      title: 'Full Stack<br>Software Engineer',
      type: 'Full-time',
      class: 'right',
      link: 'https://www.corticacare.com/'
    },
    {
      dates: '2018-2022',
      company: 'Rescue Agency',
      title: 'Web Developer',
      type: 'Full-time',
      class: 'left',
      link: 'https://rescueagency.com/'
    },
    {
      dates: '2018-2019',
      company: 'SoftStack Factory',
      title: 'Programming <br>Instructor',
      type: 'Part-time',
      class: 'right',
      link: 'https://www.softstackfactory.com/'
    },
    {
      dates: '2017-2018',
      company: 'Learning Equality',
      title: 'Software Intern',
      type: 'Internship',
      class: 'left',
      link: 'https://learningequality.org/'
    },
    {
      dates: '2017-2018',
      company: 'Rescue Agency',
      title: 'Web Intern',
      type: 'Internship',
      class: 'right',
      link: 'https://rescueagency.com/'
    },
    {
      dates: '2013-2015',
      company: "Porter's Pub",
      title: 'Graphic Designer',
      type: 'Part-time',
      class: 'left',
      link: 'https://www.porterspublodica.com/'
    }
  ]

  return (
    <Layout>
      <ThreeD />
      <Loader strings={[]}>
        <Hero />
        <section id="about">
          <About skills={tools} title="About" description={about} />
        </section>

        <section id="projects">
          <Slider slides={slider} />
        </section>

        <section id="experience">
          <Timeline exp={timeline} />
        </section>
        <section id="contact">
          <Contact />
          <Kinect />
        </section>
      </Loader>

      <div className="links">
        <a href="https://www.linkedin.com/in/gerardo-soto-becerra/" target="_blank" rel="noreferrer">
          <FaLinkedin className="linkedin icon" />
        </a>
        <a href="https://github.com/GCodeON" target="_blank" rel="noreferrer">
          <FaGithub className="github icon" />
        </a>
      </div>

      <style jsx>{`
        .links {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: inline-flex;
          justify-content: center;
          z-index: 2;
        }

        .container {
          position: relative;
          margin: 0 auto;
          padding: 0;
          cursor: pointer;
        }
      `}</style>

      <style jsx global>{``}</style>
    </Layout>
  )
}

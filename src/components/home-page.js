'use client'
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

import useAppReady from '@/hooks/useAppReady'
import useHomePageData from '@/hooks/useHomePageData'
import { TIMELINE } from '@/constants/homePage'

export default function HomePage({ data }) {
  useAppReady()

  const { skillsList, projectsList, linkedInUrl, gitHubUrl } = useHomePageData(data);

  return (
    <div className="app-shell">
      <Layout>
        <ThreeD />
        <Loader strings={[]}>
          <Hero />
          <section id="about">
            <About skills={skillsList} title="About" description={data?.description} />
          </section>

          <section id="projects">
            <Slider slides={projectsList} />
          </section>

          <section id="experience">
            <Timeline exp={TIMELINE} />
          </section>
          <section id="contact">
            <Contact />
            <Kinect />
          </section>
        </Loader>

        <div className="links">
          <a href={linkedInUrl} target="_blank" rel="noreferrer">
            <FaLinkedin className="linkedin icon" />
          </a>
          <a href={gitHubUrl} target="_blank" rel="noreferrer">
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
    </div>
  )
}

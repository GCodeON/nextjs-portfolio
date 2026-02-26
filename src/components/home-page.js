'use client'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import dynamic from 'next/dynamic'

import Layout from './layout'
import Loader from './loader'
import Hero from './hero'
import Slider from './slider'
import Timeline from './timeline'
import Contact from './contact'

import useAppReady from '@/hooks/useAppReady'
import useHomePageData from '@/hooks/useHomePageData'

const ThreeD = dynamic(() => import('./threejs/3D'), { ssr: false })
const About = dynamic(() => import('./about'), { ssr: false })
const Kinect = dynamic(() => import('./threejs/kinect'), { ssr: false })

export default function HomePage({ data }) {
  useAppReady()

  const { skillsList, projectsList, experienceList, linkedInUrl, gitHubUrl } = useHomePageData(data);

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
            <Timeline exp={experienceList} />
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

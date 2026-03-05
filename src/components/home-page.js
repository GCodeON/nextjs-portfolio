'use client'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import dynamic from 'next/dynamic'

import Layout from './layout'
import Loader from './loader'
import Hero from './hero'

import useAppReady from '@/hooks/useAppReady'
import useHomePageData from '@/hooks/useHomePageData'
import useHomePageObservability from '@/hooks/useHomePageObservability'

const ThreeD = dynamic(() => import('./threejs/3D'), { ssr: false })
const About = dynamic(() => import('./about'), { ssr: false })
const Kinect = dynamic(() => import('./threejs/kinect'), { ssr: false })
const Slider = dynamic(() => import('./slider'), { ssr: false })
const Timeline = dynamic(() => import('./timeline'), { ssr: false })
const BlogPreview = dynamic(() => import('./blog-preview'), { ssr: false })
const Contact = dynamic(() => import('./contact'), { ssr: false })

export default function HomePage({ data }) {
  useAppReady()
  const {
    showThreeD,
    showKinect,
    showProjects,
    showExperience,
    showContact,
    projectsSectionRef,
    experienceSectionRef,
    contactSectionRef,
  } = useHomePageObservability()

  const { 
    skillsList, 
    projectsList, 
    experienceList, 
    blogPosts, 
    linkedInUrl, 
    gitHubUrl 
  } = useHomePageData(data);

  return (
    <div className="app-shell">
      <Layout>
        {showThreeD ? <ThreeD /> : null}
        <Loader strings={[]}>
          <Hero />
          <section id="about">
            <About skills={skillsList} title="About" description={data?.description} />
          </section>

          <section id="projects" ref={projectsSectionRef}>
            {showProjects ? <Slider slides={projectsList} /> : null}
          </section>

          <section id="experience" ref={experienceSectionRef}>
            {showExperience ? <Timeline exp={experienceList} /> : null}
          </section>
          
          {Array.isArray(blogPosts) && blogPosts.length > 0 ? (
            <section id="blog">
              <BlogPreview posts={blogPosts} />
            </section>
          ) : null}

          <section id="contact" ref={contactSectionRef}>
            {showContact ? <Contact /> : null}
            {showContact && showKinect ? <Kinect /> : null}
          </section>
        </Loader>

        <div className="links">
          <a href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
            <FaLinkedin className="linkedin icon" />
          </a>
          <a href={gitHubUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
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

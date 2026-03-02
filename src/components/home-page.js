'use client'
import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import dynamic from 'next/dynamic'

import Layout from './layout'
import Loader from './loader'
import Hero from './hero'

import useAppReady from '@/hooks/useAppReady'
import useHomePageData from '@/hooks/useHomePageData'

const ThreeD = dynamic(() => import('./threejs/3D'), { ssr: false })
const About = dynamic(() => import('./about'), { ssr: false })
const Kinect = dynamic(() => import('./threejs/kinect'), { ssr: false })
const Slider = dynamic(() => import('./slider'), { ssr: false })
const Timeline = dynamic(() => import('./timeline'), { ssr: false })
const Contact = dynamic(() => import('./contact'), { ssr: false })

export default function HomePage({ data }) {
  useAppReady()
  const [showThreeD, setShowThreeD] = useState(false)
  const [showKinect, setShowKinect] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showExperience, setShowExperience] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const projectsSectionRef = useRef(null)
  const experienceSectionRef = useRef(null)
  const contactSectionRef = useRef(null)

  const { skillsList, projectsList, experienceList, linkedInUrl, gitHubUrl } = useHomePageData(data);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    let cancelled = false
    let idleId = null
    let timeoutId = null

    const mountThree = () => {
      if (!cancelled) {
        setShowThreeD(true)
      }
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(mountThree, { timeout: 2000 })
    } else {
      timeoutId = window.setTimeout(mountThree, 800)
    }

    return () => {
      cancelled = true

      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || showKinect) {
      return undefined
    }

    const target = contactSectionRef.current
    if (!target) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) {
          return
        }

        setShowKinect(true)
        observer.disconnect()
      },
      { root: null, rootMargin: '250px 0px', threshold: 0.01 }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [showKinect])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const observeAndReveal = (target, reveal) => {
      if (!target) {
        return null
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (!entry?.isIntersecting) {
            return
          }

          reveal(true)
          observer.disconnect()
        },
        { root: null, rootMargin: '320px 0px', threshold: 0.01 }
      )

      observer.observe(target)
      return observer
    }

    const projectsObserver = observeAndReveal(projectsSectionRef.current, setShowProjects)
    const experienceObserver = observeAndReveal(experienceSectionRef.current, setShowExperience)
    const contactObserver = observeAndReveal(contactSectionRef.current, setShowContact)

    return () => {
      projectsObserver?.disconnect()
      experienceObserver?.disconnect()
      contactObserver?.disconnect()
    }
  }, [])

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

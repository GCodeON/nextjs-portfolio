import { useEffect, useRef, useState } from 'react'

export default function useHomePageObservability() {
  const [showThreeD, setShowThreeD] = useState(false)
  const [showKinect, setShowKinect] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showExperience, setShowExperience] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const projectsSectionRef = useRef(null)
  const experienceSectionRef = useRef(null)
  const contactSectionRef = useRef(null)

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

  return {
    showThreeD,
    showKinect,
    showProjects,
    showExperience,
    showContact,
    projectsSectionRef,
    experienceSectionRef,
    contactSectionRef,
  }
}
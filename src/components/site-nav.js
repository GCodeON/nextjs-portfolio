'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const HOME_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
]

export default function SiteNav() {
  const pathname = usePathname()
  const currentPath = pathname || ''
  const isHome = currentPath === '/'
  const [activeSection, setActiveSection] = useState('')
  const clickLockedSectionRef = useRef('')

  useEffect(() => {
    if (!isHome || typeof window === 'undefined') {
      setActiveSection('')
      return undefined
    }

    const sections = HOME_SECTIONS
      .map(({ id }) => ({ id, element: document.getElementById(id) }))
      .filter(({ element }) => Boolean(element))

    if (sections.length === 0) {
      return undefined
    }

    const syncHash = (sectionId) => {
      const currentHash = window.location.hash || ''
      const currentBase = currentHash.split('?')[0]
      const targetHash = `#${sectionId}`

      if (currentBase === targetHash) {
        return
      }

      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${targetHash}`)
    }

    let frameId = null
    let unlockTimerId = null

    const clearUnlockTimer = () => {
      if (unlockTimerId !== null) {
        window.clearTimeout(unlockTimerId)
        unlockTimerId = null
      }
    }

    const scheduleUnlock = () => {
      clearUnlockTimer()
      unlockTimerId = window.setTimeout(() => {
        clickLockedSectionRef.current = ''
        requestUpdate()
      }, 160)
    }

    const updateActiveSection = () => {
      frameId = null

      if (clickLockedSectionRef.current) {
        const lockedId = clickLockedSectionRef.current
        setActiveSection((previous) => (previous === lockedId ? previous : lockedId))
        return
      }

      const triggerLine = 140

      let nextId = ''

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect()
        if (rect.top <= triggerLine) {
          nextId = section.id
        }
      }

      setActiveSection((previous) => {
        if (previous === nextId) {
          return previous
        }

        if (nextId) {
          syncHash(nextId)
        }

        return nextId
      })
    }

    const requestUpdate = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(updateActiveSection)
    }

    const handleScroll = () => {
      if (clickLockedSectionRef.current) {
        scheduleUnlock()
      }

      requestUpdate()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', requestUpdate)

    const currentHashId = window.location.hash.replace('#', '').split('?')[0]
    if (currentHashId && sections.some(({ id }) => id === currentHashId)) {
      setActiveSection(currentHashId)
    } else {
      setActiveSection('')
    }

    requestUpdate()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', requestUpdate)
      clearUnlockTimer()
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [isHome])

  const handleSectionClick = (sectionId) => {
    clickLockedSectionRef.current = sectionId
    setActiveSection(sectionId)
  }

  if (isHome) {
    return (
      <nav className="nav nav--home" aria-label="Section navigation">
        <div className="nav__links">
          {HOME_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`item ${activeSection === id ? 'current' : ''}`}
              onClick={() => handleSectionClick(id)}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <nav className="nav nav--page" aria-label="Primary navigation">
      <Link href="/" className="nav__logo" aria-label="Go to home page">
        gerardo soto
      </Link>
      <div className="nav__links nav__links--page">
        <Link href="/" className={`item ${currentPath === '/' ? 'current' : ''}`}>
          Home
        </Link>
        <Link href="/blog" className={`item ${currentPath.startsWith('/blog') ? 'current' : ''}`}>
          Blog
        </Link>
      </div>
    </nav>
  )
}

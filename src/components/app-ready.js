'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AppReady() {
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false

    const reveal = () => {
      if (cancelled || !document?.body) {
        return
      }

      document.body.classList.remove('app-loading')
      document.body.classList.add('app-ready')
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(reveal)
    })

    return () => {
      cancelled = true
    }
  }, [pathname])

  return null
}

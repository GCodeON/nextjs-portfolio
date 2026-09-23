'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { 
  waitForFonts, 
  isMobileViewport, 
  DESKTOP_TIMEOUT_MS, 
  MOBILE_TIMEOUT_MS 
} from '@/hooks/waitForFonts.util'

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

    (async () => {
      await waitForFonts({ timeoutMs: isMobileViewport() ? MOBILE_TIMEOUT_MS : DESKTOP_TIMEOUT_MS })

      requestAnimationFrame(() => {
        requestAnimationFrame(reveal)
      })
    })()

    return () => {
      cancelled = true
    }
  }, [pathname])

  return null
}

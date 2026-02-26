import { useEffect } from 'react'

export default function useAppReady() {
  useEffect(() => {
    let cancelled = false
    const hasHashTarget = typeof window !== 'undefined' && Boolean(window.location.hash)

    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (!hasHashTarget && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const waitForPaint = () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })

    const revealApp = () => {
      if (cancelled || !document.body) {
        return
      }

      document.body.classList.remove('app-loading')
      document.body.classList.add('app-ready')
    }

    ;(async () => {
      await waitForPaint()
      revealApp()
    })()

    return () => {
      cancelled = true
    }
  }, [])
}

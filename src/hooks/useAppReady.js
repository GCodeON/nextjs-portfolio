import { useEffect } from 'react'

export default function useAppReady() {
  useEffect(() => {
    let cancelled = false

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

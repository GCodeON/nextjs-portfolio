import { useEffect } from 'react'

export default function useAppReady() {
  useEffect(() => {
    let cancelled = false

    const waitForWindowLoad = () => {
      if (document.readyState === 'complete') {
        return Promise.resolve()
      }

      return new Promise((resolve) => {
        window.addEventListener('load', resolve, { once: true })
      })
    }

    const waitForFonts = () => {
      if (!document.fonts || !document.fonts.ready) {
        return Promise.resolve()
      }

      return document.fonts.ready.catch(() => Promise.resolve())
    }

    const waitForImages = () => {
      const images = Array.from(document.images || [])

      if (!images.length) {
        return Promise.resolve()
      }

      return Promise.all(
        images.map((image) => {
          if (image.complete) {
            return Promise.resolve()
          }

          return new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true })
            image.addEventListener('error', resolve, { once: true })
          })
        })
      )
    }

    const waitForPaint = () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })

    ;(async () => {
      await Promise.all([waitForWindowLoad(), waitForFonts(), waitForImages()])
      await waitForPaint()

      if (!cancelled) {
        document.body.classList.remove('app-loading')
        document.body.classList.add('app-ready')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])
}

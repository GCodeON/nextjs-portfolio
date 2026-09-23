import { useEffect } from 'react'

export default function useAppReady() {
  useEffect(() => {
    const hasHashTarget = typeof window !== 'undefined' && Boolean(window.location.hash)

    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (!hasHashTarget && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [])
}

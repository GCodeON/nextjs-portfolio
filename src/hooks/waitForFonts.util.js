export const DESKTOP_TIMEOUT_MS = 2000
export const MOBILE_TIMEOUT_MS = 1800

const REQUIRED_FONTS = [
  '400 1em vortice-concept',
  '300 1em niagara',
  '300 1em ambroise-firmin-std',
  '400 1em modesto-condensed'
]

const TYPEKIT_HREF_MATCH = 'use.typekit.net'

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
}

// @font-face rules aren't registered in document.fonts until this stylesheet itself has loaded/parsed,
// so document.fonts.load()/ready would resolve instantly (no-op) if called beforehand.
function waitForTypekitStylesheets() {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((link) =>
    link.href.includes(TYPEKIT_HREF_MATCH)
  )

  if (!links.length) {
    return Promise.resolve()
  }

  return Promise.all(
    links.map((link) => {
      if (link.sheet) {
        return Promise.resolve()
      }

      return new Promise((resolve) => {
        link.addEventListener('load', resolve, { once: true })
        link.addEventListener('error', resolve, { once: true })
      })
    })
  )
}

export function waitForFonts({ timeoutMs = DESKTOP_TIMEOUT_MS } = {}) {
  if (typeof document === 'undefined' || !document.fonts) {
    return Promise.resolve()
  }

  const work = waitForTypekitStylesheets().then(() => {
    const loadPromises = REQUIRED_FONTS.map((font) => document.fonts.load(font).catch(() => {}))
    return Promise.all([document.fonts.ready, ...loadPromises]).catch(() => {})
  })

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(resolve, timeoutMs)
  })

  return Promise.race([work, timeoutPromise])
}

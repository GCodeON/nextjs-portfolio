export const DESKTOP_TIMEOUT_MS = 2000
export const MOBILE_TIMEOUT_MS = 1200

const REQUIRED_FONTS = [
  '400 1em vortice-concept',
  '300 1em niagara',
  '300 1em ambroise-firmin-std',
  '400 1em modesto-condensed'
]

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
}

export function waitForFonts({ timeoutMs = DESKTOP_TIMEOUT_MS } = {}) {
  if (typeof document === 'undefined' || !document.fonts) {
    return Promise.resolve()
  }

  const loadPromises = REQUIRED_FONTS.map((font) => document.fonts.load(font).catch(() => {}))
  const readyPromise = Promise.all([document.fonts.ready, ...loadPromises]).catch(() => {})

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(resolve, timeoutMs)
  })

  return Promise.race([readyPromise, timeoutPromise])
}

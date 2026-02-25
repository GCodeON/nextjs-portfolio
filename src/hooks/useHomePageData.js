import { useMemo } from 'react'

import { urlFor } from '@/sanity/sanityImageUrl'
import { FALLBACK_SLIDER, FALLBACK_TOOLS } from '@/constants/homePage'

const asLink = (value) => {
  if (typeof value === 'string') {
    return value
  }

  return value?.current || ''
}

const asImageUrl = (value, width, height, fitMode) => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value?.url === 'string') {
    return value.url
  }

  try {
    let imageBuilder = urlFor(value).auto('format')

    if (width) {
      imageBuilder = imageBuilder.width(width)
    }

    if (height) {
      imageBuilder = imageBuilder.height(height)
    }

    if (fitMode) {
      imageBuilder = imageBuilder.fit(fitMode)
    }

    return imageBuilder.url()
  } catch {
    return ''
  }
}

const normalizeTool = (tool, index) => {
  const imageSource = tool?.image || tool?.icon || tool
  const image = asImageUrl(imageSource, 120, undefined, 'max')

  if (!image) {
    return null
  }

  return {
    image,
    alt: tool?.alt || tool?.name || `Tool ${index + 1}`
  }
}

const normalizeProjectTool = (tool) => {
  const imageSource = tool?.image || tool?.icon || tool
  const image = asImageUrl(imageSource, 80, undefined, 'max')

  if (!image) {
    return null
  }

  return {
    image,
    alt: tool?.alt || tool?.name || ''
  }
}

const normalizeGallery = (gallery) => {
  if (!Array.isArray(gallery)) {
    return []
  }

  return gallery
    .map((image) => {
      if (typeof image === 'string') {
        return image
      }

      return asImageUrl(image, 1800, 1200)
    })
    .filter(Boolean)
}

const normalizeProject = (project) => {
  const projectImage = asImageUrl(project?.image, 1800, 1200)

  if (!projectImage) {
    return null
  }

  return {
    ...project,
    title: project?.title || project?.name || 'Project',
    image: projectImage,
    link: asLink(project?.link),
    tools: Array.isArray(project?.tools)
      ? project.tools.map(normalizeProjectTool).filter(Boolean)
      : [],
    gallery: normalizeGallery(project?.gallery)
  }
}

export default function useHomePageData(data) {
  return useMemo(() => {
    const tools = Array.isArray(data?.tools)
      ? data.tools.map(normalizeTool).filter(Boolean)
      : []

    const slider = Array.isArray(data?.projects)
      ? data.projects.map(normalizeProject).filter(Boolean)
      : []

    return {
      skillsList: tools.length ? tools : FALLBACK_TOOLS,
      projectsList: slider.length ? slider : FALLBACK_SLIDER,
      linkedInUrl: asLink(data?.linkedIn || data?.linkedin),
      gitHubUrl: asLink(data?.GitHub || data?.github || data?.gitHub)
    }
  }, [data])
}

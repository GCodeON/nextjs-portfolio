import { buildSanityImageUrl } from '@/sanity/sanityImageUrl'
import { FALLBACK_SLIDER, FALLBACK_TOOLS, TIMELINE } from '@/constants/homePage'

export const asLink = (value) => {
  if (typeof value === 'string') {
    return value
  }

  return value?.current || ''
}

export const asImageUrl = (value, width, height, fitMode) => {
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
    return buildSanityImageUrl(value, {
      width,
      height,
      fit: fitMode || 'max',
      quality: 75,
      autoFormat: true
    })
  } catch {
    return ''
  }
}

export const normalizeTool = (tool, index) => {
  const image = asImageUrl(tool, 120, undefined, 'max')

  if (!image) {
    return null
  }

  return {
    image,
    alt: tool?.alt || tool?.title || `Tool ${index + 1}`
  }
}

export const normalizeProjectTool = (tool) => {
  const image = asImageUrl(tool, 80, undefined, 'max')

  if (!image) {
    return null
  }

  return {
    image,
    alt: tool?.alt || tool?.title || ''
  }
}

export const normalizeProject = (project) => {
  const projectImage = asImageUrl(project?.image, 1800, 1200)

  if (!project?.title && !projectImage) {
    return null
  }

  return {
    ...project,
    title: project?.title || 'Project',
    image: projectImage || '',
    link: asLink(project?.siteUrl),
    tools: Array.isArray(project?.tools)
      ? project.tools.map(normalizeProjectTool).filter(Boolean)
      : []
  }
}

export const normalizeExperience = (item, index) => {
  if (!item) {
    return null
  }

  const company = item.company || ''
  const title = item.title || ''
  const dates = item.dates || ''
  const type = item.type || ''

  if (!company && !title && !dates) {
    return null
  }

  return {
    ...item,
    company,
    title,
    dates,
    type,
    link: asLink(item.siteUrl),
    class: item.class || (index % 2 === 0 ? 'left' : 'right')
  }
}

export const normalizeBlogPost = (post) => {
  if (!post?._id) {
    return null
  }

  const title = post?.title || 'Untitled post'
  const slug = typeof post?.slug === 'string' ? post.slug : ''
  const summary = post?.description || post?.summary || post?.excerpt || ''
  const publishedAt = post?.publishedAt || post?._createdAt || ''
  const image = asImageUrl(post?.mainImage, 960, 540, 'crop')

  return {
    id: post._id,
    title,
    slug,
    summary,
    publishedAt,
    image
  }
}

export const buildHomePageData = (data) => {
  const tools = Array.isArray(data?.tools)
    ? data.tools.map(normalizeTool).filter(Boolean)
    : []

  const slider = Array.isArray(data?.projects)
    ? data.projects.map(normalizeProject).filter(Boolean)
    : []

  const experienceSource = Array.isArray(data?.experience) ? data.experience : []
  const experience = experienceSource.map(normalizeExperience).filter(Boolean)

  const blogPosts = Array.isArray(data?.blogPosts)
    ? data.blogPosts.map(normalizeBlogPost).filter(Boolean)
    : []

  return {
    skillsList: tools.length ? tools : FALLBACK_TOOLS,
    projectsList: slider.length ? slider : FALLBACK_SLIDER,
    experienceList: experience.length ? experience : TIMELINE,
    blogPosts,
    linkedInUrl: asLink(data?.linkedIn),
    gitHubUrl: asLink(data?.GitHub)
  }
}

import { buildSanityImageUrl } from '@/sanity/sanityImageUrl'

export const toParagraphs = (content) => {
  if (!content) {
    return []
  }

  if (typeof content === 'string') {
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  }

  if (!Array.isArray(content)) {
    return []
  }

  return content
    .filter((block) => block?._type === 'block')
    .map((block) => Array.isArray(block.children)
      ? block.children.map((child) => child?.text || '').join('').trim()
      : '')
    .filter(Boolean)
}

export const formatBlogDate = (value) => {
  if (!value) {
    return ''
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }

  return parsed.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const asBlogImageUrl = (value) => {
  if (!value) {
    return ''
  }

  try {
    return buildSanityImageUrl(value, {
      width: 1600,
      height: 900,
      fit: 'crop',
      quality: 75,
      autoFormat: true
    })
  } catch {
    return ''
  }
}

export const buildBlogPostData = (post) => {
  const title = post?.title || 'Blog Post'
  const publishedAt = post?.publishedAt || ''
  const imageUrl = asBlogImageUrl(post?.heroImage)
  const paragraphs = toParagraphs(post?.content)

  return {
    id: post?._id || 'post',
    title,
    publishedAt,
    formattedDate: formatBlogDate(publishedAt),
    imageUrl,
    paragraphs,
    fallbackCopy: post?.summary || 'Post content coming soon.'
  }
}
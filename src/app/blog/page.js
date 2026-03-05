import BlogPreview from '@/components/blog-preview'
import { client } from '@/sanity/client'
import { BLOG_LIST_QUERY } from '@/sanity/queries/index'
import { normalizeBlogPost } from '@/hooks/homePageData.utils'

export const revalidate = 60

export default async function BlogPage() {
  let postsData = []

  try {
    postsData = await client.fetch(BLOG_LIST_QUERY, {})
  } catch {
    postsData = []
  }

  const posts = Array.isArray(postsData)
    ? postsData.map(normalizeBlogPost).filter(Boolean)
    : []

  return (
    <main className="blog-post-page">
      <BlogPreview posts={posts} />
    </main>
  )
}
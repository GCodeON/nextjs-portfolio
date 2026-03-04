import Image from 'next/image'
import { notFound } from 'next/navigation'

import { client } from '@/sanity/client'
import { buildBlogPostData } from '@/hooks/blogPostData.utils'

const BLOG_SLUGS_QUERY = `*[_type == "blog" && defined(slug.current)]{ "slug": slug.current }`

const BLOG_POST_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  "title": coalesce(title, "Untitled post"),
  "slug": slug.current,
  "summary": coalesce(description, ""),
  "publishedAt": coalesce(publishedAt, _createdAt),
  "heroImage": mainImage,
  "content": body
}`

export const revalidate = 120

export async function generateStaticParams() {
  const slugs = await client.fetch(BLOG_SLUGS_QUERY)

  return Array.isArray(slugs)
    ? slugs
      .map((item) => item?.slug)
      .filter(Boolean)
      .map((slug) => ({ slug }))
    : []
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug || ''

  if (!slug) {
    notFound()
  }

  const post = await client.fetch(BLOG_POST_QUERY, { slug })

  if (!post?._id) {
    notFound()
  }

  const prepared = buildBlogPostData(post)

  return (
    <main className="blog-post-page">
      <article className="blog-post container">
        <header className="blog-post-header">
          <h1 className="pretitle transparent">{prepared.title}</h1>
          {prepared.publishedAt ? (
            <time className="blog-post-date" dateTime={prepared.publishedAt}>
              {prepared.formattedDate}
            </time>
          ) : null}
        </header>

        {prepared.imageUrl ? (
          <div className="blog-post-image-wrap">
            <Image
              src={prepared.imageUrl}
              alt={prepared.title || 'Blog image'}
              width={1600}
              height={900}
              className="blog-post-image"
              priority
            />
          </div>
        ) : null}

        <section className="blog-post-content">
          {prepared.paragraphs.length ? prepared.paragraphs.map((paragraph, index) => (
            <p key={`${prepared.id}-${index}`}>{paragraph}</p>
          )) : (
            <p>{prepared.fallbackCopy}</p>
          )}
        </section>
      </article>
    </main>
  )
}
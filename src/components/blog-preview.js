import Image from 'next/image'
import Link from 'next/link'

const formatDate = (value) => {
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

export default function BlogPreview({ posts = [] }) {
  if (!posts.length) {
    return null
  }

  return (
    <div className="blog-preview container">
      <h2 className="pretitle transparent">Latest Blog</h2>
      <div className="blog-preview-list">
        {posts.map((post) => (
          <article key={post.id} className="blog-preview-item">
            {post.image ? (
              <div className="blog-preview-image-wrap">
                {post.slug ? (
                  <Link href={`/blog/${post.slug}`} aria-label={`Open ${post.title}`}>
                    <Image
                      src={post.image}
                      alt={post.title || 'Blog preview image'}
                      width={960}
                      height={540}
                      className="blog-preview-image"
                    />
                  </Link>
                ) : (
                  <Image
                    src={post.image}
                    alt={post.title || 'Blog preview image'}
                    width={960}
                    height={540}
                    className="blog-preview-image"
                  />
                )}
              </div>
            ) : null}

            <h3 className="blog-preview-title">
              {post.slug ? <Link href={`/blog/${post.slug}`}>{post.title}</Link> : post.title}
            </h3>
            {post.summary ? <p className="blog-preview-summary">{post.summary}</p> : null}
            {post.publishedAt ? (
              <time className="blog-preview-date" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
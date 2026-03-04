"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PAGE_TRANSITION_MS = 90
const TRANSITION_RESET_MS = 650

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
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigateTimeoutRef = useRef(null)
  const resetTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        window.clearTimeout(navigateTimeoutRef.current)
      }

      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    posts.forEach((post) => {
      if (post?.slug) {
        router.prefetch(`/blog/${post.slug}`)
      }
    })
  }, [posts, router])

  const onNavigate = (event, slug) => {
    if (!slug) {
      return
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()

    if (isTransitioning) {
      return
    }

    setIsTransitioning(true)

    navigateTimeoutRef.current = window.setTimeout(() => {
      router.push(`/blog/${slug}`)
    }, PAGE_TRANSITION_MS)

    resetTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_RESET_MS)
  }

  if (!posts.length) {
    return null
  }

  return (
    <div className={`blog-preview container${isTransitioning ? ' is-transitioning' : ''}`}>
      <h2 className="pretitle transparent">Latest Blog</h2>
      <div className="blog-preview-list">
        {posts.map((post) => (
          <article key={post.id} className="blog-preview-item">
            {post.image ? (
              <div className="blog-preview-image-wrap">
                {post.slug ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Open ${post.title}`}
                    onClick={(event) => onNavigate(event, post.slug)}
                  >
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
              {post.slug ? (
                <Link href={`/blog/${post.slug}`} onClick={(event) => onNavigate(event, post.slug)}>
                  {post.title}
                </Link>
              ) : post.title}
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
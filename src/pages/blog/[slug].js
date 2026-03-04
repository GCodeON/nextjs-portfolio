import Image from 'next/image'
import { client } from '@/sanity/client'
import useBlogPostData from '@/hooks/useBlogPostData'

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

export default function BlogPost({ post }) {
    const prepared = useBlogPostData(post)

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

export async function getStaticPaths() {
    const slugs = await client.fetch(BLOG_SLUGS_QUERY)

    return {
        paths: Array.isArray(slugs)
            ? slugs
                .map((item) => item?.slug)
                .filter(Boolean)
                .map((slug) => ({ params: { slug } }))
            : [],
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const slug = params?.slug || ''

    if (!slug) {
        return {
            notFound: true
        }
    }

    const post = await client.fetch(BLOG_POST_QUERY, { slug })

    if (!post?._id) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post
        },
        revalidate: 120
    }
}
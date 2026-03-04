const TOOLS_FIELDS = `
  _key,
  _type,
  alt,
  title,
  asset
`

const EXPERIENCE_FIELDS = `
  _key,
  company,
  title,
  dates,
  type,
  siteUrl
`

const PROJECT_FIELDS = `
  _key,
  title,
  role,
  siteUrl,
  image,
  tools[]{
    ${TOOLS_FIELDS}
  }
`

export const HOME_PAGE_QUERY = `*[_type == "about"][0]{
  name,
  description,
  experience[]{
    ${EXPERIENCE_FIELDS}
  },
  linkedIn,
  GitHub,
  tools[]{
    ${TOOLS_FIELDS}
  },
  projects[]{
    ${PROJECT_FIELDS}
  },
  "blogPosts": *[_type == "blog"]
    | order(coalesce(publishedAt, _createdAt) desc)[0...3]{
      _id,
      "title": coalesce(title, "Untitled post"),
      "slug": slug.current,
      description,
      mainImage,
      publishedAt,
      _createdAt
    }
}`

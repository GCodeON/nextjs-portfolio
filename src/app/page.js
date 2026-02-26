import HomePage from '../components/home-page'
import { client } from "@/sanity/client";

const QUERY = `*[_type == "about"][0]{
  description,
  linkedIn,
  linkedin,
  GitHub,
  github,
  gitHub,
  tools[]{
    _key,
    _type,
    alt,
    name,
    title,
    image,
    icon,
    asset
  },
  projects[]{
    _key,
    title,
    name,
    role,
    summary,
    skills,
    highlights,
    slug,
    link,
    siteUrl,
    image,
    mainImage,
    gallery,
    tools[]{
      _key,
      _type,
      alt,
      name,
      title,
      image,
      icon,
      asset
    }
  }
}`;

export default async function Page() {
  const data = await client.fetch(QUERY, {});
  return <HomePage data={data} />
}

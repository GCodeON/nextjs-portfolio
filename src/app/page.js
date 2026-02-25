import HomePage from '../components/home-page'
import { client } from "@/sanity/client";

const QUERY = `*[_type == "about"][0]{
  ...,
  tools[]{
    ...,
    image
  },
  projects[]{
    ...,
    image,
    gallery,
    tools[]{
      ...,
      image
    }
  }
}`;

export default async function Page() {
  const data = await client.fetch(QUERY, {});
  return <HomePage data={data} />
}

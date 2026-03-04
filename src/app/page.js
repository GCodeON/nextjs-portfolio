import HomePage from '../components/home-page'
import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from '@/sanity/queries/homePage'

export const revalidate = 60

export default async function Page() {
  const data = await client.fetch(HOME_PAGE_QUERY, {});
  return <HomePage data={data} />
}

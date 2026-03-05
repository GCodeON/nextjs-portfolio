import HomePage from '../components/home-page'
import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from '@/sanity/queries/index'

export const revalidate = 60

export default async function Page() {
  let data = null

  try {
    data = await client.fetch(HOME_PAGE_QUERY, {})
  } catch (error) {
    console.error('Failed to fetch homepage data from Sanity:', error)
  }

  return <HomePage data={data} />
}

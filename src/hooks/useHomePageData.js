import { buildHomePageData } from './homePageData.utils'
import usePreparedData from './usePreparedData'

export default function useHomePageData(data) {
  return usePreparedData(data, buildHomePageData)
}

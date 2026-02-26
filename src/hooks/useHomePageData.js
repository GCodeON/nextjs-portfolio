import { useMemo } from 'react'

import { buildHomePageData } from './homePageData.utils'

export default function useHomePageData(data) {
  return useMemo(() => buildHomePageData(data), [data])
}

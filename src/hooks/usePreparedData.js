import { useMemo } from 'react'

export default function usePreparedData(input, builder) {
  return useMemo(() => builder(input), [input, builder])
}
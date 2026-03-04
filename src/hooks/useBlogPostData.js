import { buildBlogPostData } from './blogPostData.utils'
import usePreparedData from './usePreparedData'

export default function useBlogPostData(post) {
  return usePreparedData(post, buildBlogPostData)
}
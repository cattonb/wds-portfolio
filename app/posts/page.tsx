import PostsWithSearch from '@/components/posts-with-search'
import { getContents } from '@/lib/content'

export default async function PostsPage() {
  const posts = await getContents('posts')

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Posts</h1>

        <PostsWithSearch posts={posts} />
      </div>
    </section>
  )
}

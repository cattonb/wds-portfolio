import { getContents } from '@/lib/content'
import React from 'react'
import Posts from './posts'
import Link from 'next/link'

export default async function RecentPosts() {
  const posts = await getContents('posts', 4)
  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Recent Posts</h2>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>All posts</span>
        </Link>
      </div>
    </section>
  )
}

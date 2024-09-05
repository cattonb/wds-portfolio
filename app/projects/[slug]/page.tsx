import MDXContent from '@/components/mdx-content'
import { getContentBySlug, getContents } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = await getContents('projects')
  const slugs = projects.map(project => ({ slug: project.slug }))
  return slugs
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params

  const project = await getContentBySlug(slug, 'projects')

  if (!project) {
    notFound()
  }

  const { metaData, content } = project
  const { title, image, author, publishedAt } = metaData

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to projects</span>
        </Link>

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent source={content} />
        </main>

        {/* <footer className='mt-16'>
          <NewsletterForm />
        </footer> */}
      </div>
    </section>
  )
}

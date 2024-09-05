import Projects from '@/components/projects'
import { getContents } from '@/lib/content'

export default async function ProjectsPage() {
  const projects = await getContents('projects')

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Projects</h1>
        <Projects projects={projects} />
      </div>
    </section>
  )
}

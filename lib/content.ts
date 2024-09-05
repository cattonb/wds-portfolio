import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

type Directory = 'posts' | 'projects'

export type Content = {
  metaData: ContentMetaData
  content: string
}

export type ContentMetaData = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

const rootDirectory = (directory: Directory) =>
  path.join(process.cwd(), 'content', directory)

export async function getContentBySlug(
  slug: string,
  directory: Directory
): Promise<Content | null> {
  try {
    const filePath = path.join(rootDirectory(directory), `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    const { data, content } = matter(fileContents)

    return { metaData: { ...data, slug }, content }
  } catch (err) {
    return null
  }
}

export async function getContents(
  directory: Directory,
  limit?: number
): Promise<ContentMetaData[]> {
  const files = fs.readdirSync(rootDirectory(directory))

  const posts = files
    .map(file => getContentMetaData(file, directory))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    posts.slice(0, limit)
  }

  return posts
}

export function getContentMetaData(
  filepath: string,
  directory: Directory
): ContentMetaData {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory(directory), filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { data } = matter(fileContent)

  return { ...data, slug }
}

'use client'

import { NewsletterFormSchema, NewsletterFormSchemaType } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useNewsletterForm() {
  return useForm<NewsletterFormSchemaType>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: ''
    }
  })
}

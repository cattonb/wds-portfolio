'use client'

import { ContactFormSchema, ContactFormSchemaType } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useContactForm() {
  return useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: '',
      message: '',
      name: ''
    }
  })
}

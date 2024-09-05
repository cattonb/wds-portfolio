'use server'

import { Resend } from 'resend'
import {
  ContactFormSchema,
  ContactFormSchemaType,
  NewsletterFormSchema
} from './schemas'
import ContactFormEmail from '@/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: ContactFormSchemaType) {
  const result = ContactFormSchema.safeParse(formData)

  if (!result.success) {
    return { error: result.error.format() }
  }

  const data = result.data

  try {
    const { data: resendData, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [data.email],
      subject: `Name: ${data.name} Email: ${data.email}`,
      react: ContactFormEmail(data)
    })

    if (!resendData || error) {
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message }
    }

    return { error: 'Failed to send email' }
  }
}

export async function subscribe(formData: { email: string }) {
  const result = NewsletterFormSchema.safeParse(formData)

  if (!result.success) {
    return { error: result.error.format() }
  }

  // const data = result.data

  try {
    // Add in the add to subscriver here...

    return { success: result.success }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }

    return { error: 'Failed to send email' }
  }
}

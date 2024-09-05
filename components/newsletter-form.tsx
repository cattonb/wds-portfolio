'use client'

import { Input } from '@/components/ui/input'
import { useContactForm } from '@/hooks/useContactForm'
import { Textarea } from '@/components/ui/textarea'
import { Button } from './ui/button'
import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { NewsletterFormSchemaType } from '@/lib/schemas'
import { toast } from 'sonner'
import { useNewsletterForm } from '@/hooks/useNewsletterForm'
import { subscribe } from '@/lib/actions'
import { Card, CardContent } from './ui/card'

export default function NewsletterForm() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useNewsletterForm()

  const processForm: SubmitHandler<NewsletterFormSchemaType> = async data => {
    const result = await subscribe(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Thank you for subscribing!')
    reset()
  }

  return (
    <section>
      <Card className='rounded-lg border-0 dark:border'>
        <CardContent className='flex flex-col gap-8 pt-6 md:flex-row md:justify-between md:pt-8'>
          <div>
            <h2 className='text-2xl font-bold'>Subscribe to my newsletter</h2>
            <p className='text-muted-foreground'>
              Get updates on my work and projects.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(processForm)}
            className='flex flex-col items-start gap-3'
          >
            <div className='w-full'>
              <Input
                type='email'
                id='email'
                autoComplete='email'
                placeholder='Email'
                className='w-full'
                {...register('email')}
              />

              {errors.email?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='w-full'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full disabled:opacity-50'
              >
                {isSubmitting ? 'Submitting...' : 'Subscribe'}
              </Button>
            </div>

            <div>
              <p className='text-xs text-muted-foreground'>
                We care about your data. Read our{' '}
                <Link href='/privacy' className='font-bold'>
                  privacy&nbsp;policy.
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

'use client'

import { Input } from '@/components/ui/input'
import { useContactForm } from '@/hooks/useContactForm'
import { Textarea } from '@/components/ui/textarea'
import { Button } from './ui/button'
import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { ContactFormSchemaType } from '@/lib/schemas'
import { toast } from 'sonner'
import { sendEmail } from '@/lib/actions'

export default function ContactForm() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useContactForm()

  const processForm: SubmitHandler<ContactFormSchemaType> = async data => {
    const result = await sendEmail(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Message sent successfully!')
    reset()
  }

  return (
    <section className='relative isolate'>
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-zinc-200 opacity-75 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-zinc-700'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
            width={200}
            height={200}
            x='50%'
            y={-64}
            patternUnits='userSpaceOnUse'
          >
            <path d='M100 200V.5M.5 .5H200' fill='none' />
          </pattern>
        </defs>
        <svg
          x='50%'
          y={-64}
          className='overflow-visible fill-zinc-50 dark:fill-zinc-900/75'
        >
          <path
            d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z'
            strokeWidth={0}
          />
        </svg>
        <rect
          width='100%'
          height='100%'
          strokeWidth={0}
          fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
        />
      </svg>

      <div className='relative'>
        <form
          className='mt-16 lg:flex-auto'
          onSubmit={handleSubmit(processForm)}
          noValidate
        >
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <Input
                id='name'
                type='text'
                placeholder='Name'
                autoComplete='given-name'
                {...register('name')}
              />

              {errors.name?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                autoComplete='email'
                {...register('email')}
              />

              {errors.email?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='sm:col-span-2'>
              <Textarea
                rows={4}
                id='email'
                placeholder='Message'
                {...register('message')}
              />

              {errors.message?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          <div className='mt-6'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full disabled:opacity-50'
            >
              {isSubmitting ? 'Submitting' : 'Contact Us'}
            </Button>
          </div>
          <p className='mt-4 text-xs text-muted-foreground'>
            By submitting this form, I agree to the{' '}
            <Link href='/privacy' className='font-bold'>
              privacy policy.
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

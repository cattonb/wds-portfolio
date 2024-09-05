import ContactForm from '@/components/contact-form'
import React from 'react'

export default function Contact() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h2 className='title'>Lets talk about your project</h2>
        <ContactForm />
      </div>
    </section>
  )
}

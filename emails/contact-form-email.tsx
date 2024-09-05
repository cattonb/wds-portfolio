import { ContactFormSchemaType } from '@/lib/schemas'

const ContactFormEmail: React.FC<Readonly<ContactFormSchemaType>> = ({
  email,
  name,
  message
}) => (
  <div>
    <h1>Contact form submission</h1>
    <p>
      From <strong>{name}</strong> at {email}
    </p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
)

export default ContactFormEmail

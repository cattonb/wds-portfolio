'use client'

import { ReactNode } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { Toaster } from './ui/sonner'

interface ProvidersProps {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute='class'
      enableSystem
      defaultTheme='system'
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </ThemeProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}

export default Providers

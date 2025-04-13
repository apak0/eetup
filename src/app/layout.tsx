import { Toaster } from 'react-hot-toast'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { Footer } from '../components/Footer'
import { TopBar } from '../components/TopBar'

import { Providers } from './Providers'

import './globals.css'

import { ToastFirer } from '@/components/ToastFirer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eeetup',
  description: 'Order food from your favorite restaurants',
  viewport: 'width=device-width, initial-scale=1.0',
  keywords: 'food delivery, restaurants, delivery, online ordering',
  icons: {
    icon: '/logo.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const theme: any = cookieStore.get('theme')?.value

  return (
    <html lang="en" className={classNames({ dark: theme === 'dark' })}>
      <head></head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <>
            <TopBar />
            <Toaster position="bottom-right" />
            <ToastFirer />
            <main className="max-w-app mx-auto px-2 lg:px-10">{children}</main>
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  )
}

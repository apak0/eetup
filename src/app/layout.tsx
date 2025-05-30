import { Toaster } from 'react-hot-toast'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

import { Providers } from './Providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eeetup',
  description: 'Order food from your favorite restaurants',
  keywords: 'food delivery, restaurants, delivery, online ordering',
  icons: {
    icon: '/LOGO.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
            <Header />
            <Toaster position="bottom-right" />
            <main className="px-2 lg:px-10">{children}</main>
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  )
}

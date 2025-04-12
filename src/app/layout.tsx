import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '../components/Footer'
import { TopBar } from '../components/TopBar'

import { Providers } from './Providers'

import './globals.css'

import { ToastFirer } from '@/components/ToastFirer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eeetup',
  description: 'Order food from your favorite restaurants',
  icons: {
    icon: '/logo.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="description" content="Your favorite restaurants at your doorstep" />
        <meta name="keywords" content="food delivery, restaurants, delivery, online ordering" />
      </head>
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

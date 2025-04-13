import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '../components/Footer'
import { TopBar } from '../components/TopBar'

import { ProviderWrapper } from './Providers'

import './globals.css'

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
  return (
    <html lang="en">
      <head></head>
      <body className={`${inter.className} antialiased`}>
        <ProviderWrapper>
          <>
            <TopBar />
            <Toaster position="bottom-right" />

            <main className="max-w-app mx-auto px-2 lg:px-10">{children}</main>
            <Footer />
          </>
        </ProviderWrapper>
      </body>
    </html>
  )
}

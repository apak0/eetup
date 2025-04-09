import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from './components/Footer'
import { TopBar } from './components/TopBar'
import { ProviderWrapper } from './Providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neemmee',
  description: 'Neemmee food chain',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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

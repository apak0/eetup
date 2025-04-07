import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from 'react-hot-toast'
import './globals.css'
import { TopBar } from './components/TopBar'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neemmee',
  description: 'Neemmee food chain',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <TopBar />
        <Toaster position="bottom-right" />
        <main className="max-w-app mx-auto px-2 lg:px-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from 'react-hot-toast'
import './globals.css'
import { TopBar } from './components/TopBar'

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
        {children}
      </body>
    </html>
  )
}

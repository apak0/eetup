import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neemmee',
  description: 'Neemmee food chain',
}

export default function StoreAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div>Admin Dashboard</div>

      <div></div>
    </div>
  )
}

import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '../components/Footer'
import { TopBar } from '../components/TopBar'

import BurgerImage from './home_burger_img/page'
import GroceryImage from './home_grocory_basket_img/page'
import { ProviderWrapper } from './Providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FoodDelivery',
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
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Your favorite restaurants at your doorstep" />
        <meta name="keywords" content="food delivery, restaurants, delivery, online ordering" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ProviderWrapper>
          <>
            <TopBar />
            <Toaster position="bottom-right" />
            <GroceryImage />
            <BurgerImage />
            <main className="max-w-app mx-auto px-2 lg:px-10">{children}</main>
            <Footer />
          </>
        </ProviderWrapper>
      </body>
    </html>
  )
}

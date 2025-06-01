'use client'
import React, { createContext, useContext, useState } from 'react'
import { ImageKitProvider } from '@imagekit/next'
import { SessionProvider } from 'next-auth/react'

import { Preference } from './restaurants/[companyId]/type'

const BasketContext = createContext<{
  savedBasket: { [k: string]: Preference[] }
  setSavedBasket: (basket: { [k: string]: Preference[] }) => void
}>({ savedBasket: {}, setSavedBasket: () => {} })
export const useBasket = () => useContext(BasketContext)

export const Providers = ({ children }: { children: any }) => {
  const [savedBasket, setSavedBasketHandler] = useState<{ [k: string]: Preference[] }>(JSON.parse(localStorage.getItem('savedBasket') || '{}'))

  const setSavedBasket = (value: { [k: string]: Preference[] }) => {
    setSavedBasketHandler(value)
    localStorage.setItem('savedBasket', JSON.stringify(savedBasket))
  }

  return (
    <ImageKitProvider urlEndpoint="https://ik.imagekit.io/7hymjkd5q">
      <SessionProvider>
        <BasketContext.Provider value={{ savedBasket, setSavedBasket }}>{children}</BasketContext.Provider>
      </SessionProvider>
    </ImageKitProvider>
  )
}

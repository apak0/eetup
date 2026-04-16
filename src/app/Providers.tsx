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
  const getInitialBasket = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return JSON.parse(window.localStorage.getItem('savedBasket') || '{}')
      } catch {
        return {}
      }
    }
    return {}
  }

  const [savedBasket, setSavedBasketHandler] = useState<{ [k: string]: Preference[] }>(getInitialBasket())

  const setSavedBasket = (value: { [k: string]: Preference[] }) => {
    setSavedBasketHandler(value)
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('savedBasket', JSON.stringify(value))
    }
  }

  return (
    <ImageKitProvider urlEndpoint="https://ik.imagekit.io/7hymjkd5q">
      <SessionProvider>
        <BasketContext.Provider value={{ savedBasket, setSavedBasket }}>{children}</BasketContext.Provider>
      </SessionProvider>
    </ImageKitProvider>
  )
}

'use client'

import { Button } from '@headlessui/react'
import { ShoppingBasket } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { SignInButton } from './sign-in'
import { UserDropdown } from './user-dropdown'

import { useBasket } from '@/app/Providers'

export const AuthStatus = () => {
  const { data: session, status } = useSession()
  const savedBasket: any = useBasket().savedBasket || {}
  const restaurantId = Object.keys(savedBasket)?.[0]

  if (status === 'loading') return null

  return session?.user ? (
    <>
      {restaurantId && (
        <Button className="btn-text h-10 w-10" onClick={() => redirect(`/restaurants/${restaurantId}`)}>
          <ShoppingBasket className="text-orange-4" size={20} />
        </Button>
      )}
      <UserDropdown />
    </>
  ) : (
    <SignInButton />
  )
}

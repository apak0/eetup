'use client'
import { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Checkbox } from '@headlessui/react'
import { CheckBadgeIcon } from '@heroicons/react/16/solid'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { registerCompanyAction } from './actions'

export default function RegisterAsCompany() {
  const router = useRouter()

  const searchParams = new URLSearchParams(window.location.search)

  const [formState, formAction] = useActionState<{ values?: any; error?: any; message?: any }, any>(registerCompanyAction, { values: {} })

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (formState?.error) {
      toast.error(formState?.message, { duration: 15000 })
    } else if (formState?.message) {
      router.push('/')
      toast.success(formState?.message, { duration: 15000 })
    }
  }, [formState])

  const values = formState?.values || {}
  const token = searchParams.get('token') || ''
  const decodedToken = jwt.decode(token) as { email: any }

  return (
    <form action={formAction} className="card shadow-md dark:shadow-none flex flex-col items-center justify-center my-16 p-16 min-w-1/2">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="mb-4">Register Your Company</h1>
        <p>Partner with us to reach more customers, make more money and grow your business online</p>
        <p>Your success story starts here</p>
      </div>
      <div className="flex flex-col w-80 gap-4">
        <input type="text" name="email" id="email" placeholder="User Name" required disabled autoComplete="off" defaultValue={decodedToken?.email} />
        <input type="text" name="cocId" id="cocId" placeholder="Chamber of Commerce ID" required autoComplete="off" defaultValue={values?.cocId} />
        <input type="password" name="password" id="password" placeholder="Password" required autoComplete="new-password" />
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm Password" required autoComplete="new-password" />
        <h2 className="text-lg font-semibold">Company Address</h2>
        {/* add address fields with labels and required sign */}
        <input type="text" name="postcode" id="postcode" placeholder="Postcode" required autoComplete="postal-code" defaultValue={values?.postcode} />
        <input type="text" name="city" id="city" placeholder="City" required autoComplete="address-level2" defaultValue={values?.city} />
        <input type="text" name="street" id="street" placeholder="Street" required autoComplete="address-line1" defaultValue={values?.street} />
        <input
          type="text"
          name="houseNumber"
          id="houseNumber"
          placeholder="House Number"
          required
          autoComplete="address-line2"
          defaultValue={values?.houseNumber}
        />
        <input
          type="text"
          name="houseNumberAddition"
          id="houseNumberAddition"
          placeholder="House Number Addition (optional)"
          autoComplete="address-line3"
          defaultValue={values?.houseNumberAddition}
        />
        <input hidden type="text" name="token" id="token" defaultValue={token} />
      </div>
      <div className="grid gap-4 mt-8 w-80">
        <div className="flex items-center gap-2">
          <input type="checkbox" name="privacy-policy" id="privacy-policy" required defaultChecked={values?.['privacy-policy'] ? true : false} />
          <Checkbox className="group size-6 rounded-md bg-orange-3/100 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-bg-orange-3/100 data-focus:outline data-focus:outline-offset-2 data-focus:outline-white">
            <CheckBadgeIcon className="hidden size-4 fill-black group-data-checked:block" />
          </Checkbox>
          <label htmlFor="privacy-policy" className="mb-0">
            I agree to the <Link href="/privacy-policy">privacy policy</Link>
          </label>
        </div>
        <button className="w-full" type="submit">
          Start as Company
        </button>
      </div>
    </form>
  )
}

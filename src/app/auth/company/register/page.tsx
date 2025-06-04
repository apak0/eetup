'use client'
import { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Checkbox, Field, Label } from '@headlessui/react'
import jwt from 'jsonwebtoken'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { registerCompanyAction } from './actions'

export default function RegisterAsCompany() {
  const router = useRouter()

  const searchParams = new URLSearchParams(window.location.search)

  const [formState, formAction] = useActionState<{ values?: any; error?: any; message?: any }, any>(registerCompanyAction, { values: {} })

  useEffect(() => {
    if (formState?.error) {
      toast.error(formState?.error, { duration: 15000 })
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
        <Field className="flex items-center gap-1 group mt-10 mb-2">
          <Checkbox
            defaultChecked={values?.['privacy-policy'] ? true : false}
            name="privacyPolicy"
            className="checkbox group size-5 rounded-md p-0.5 border-1 border-(--border-color) flex items-center justify-center group-hover:bg-orange-1 data-checked:bg-orange-1 transition-colors duration-200"
          >
            <CheckIcon strokeWidth={3} className="hidden group-data-checked:block text-orange-3" />
          </Checkbox>

          <Label className="mb-0 ml-1">I agree to the</Label>
          <Link href="/privacy-policy">privacy policy</Link>
        </Field>

        <button className="w-full" type="submit">
          Start as Company
        </button>
      </div>
    </form>
  )
}

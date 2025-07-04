'use client'
import { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Checkbox, Field, Label } from '@headlessui/react'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { startCompanyAction } from './actions'

import { PhoneInput } from '@/components/reusables/PhoneInput'

export default function StartAsCompany() {
  const router = useRouter()
  const [formState, formAction] = useActionState<{ values?: any; error?: any; message?: any }, any>(startCompanyAction, { values: {} })

  useEffect(() => {
    if (formState?.error) {
      toast.error(formState?.error, { duration: 15000 })
    } else if (formState?.message) {
      router.push('/')
      toast.success(formState?.message, { duration: 15000 })
    }
  }, [formState])

  const values = formState?.values || {}
  return (
    <form action={formAction} className="card shadow-md dark:shadow-none flex flex-col items-center justify-center my-16 p-16 min-w-1/2">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="mb-4">Start as Company</h1>
        <p>Partner with us to reach more customers, make more money and grow your business online.</p>
        <p>Your success story starts here.</p>
      </div>
      <div className="flex flex-col w-80 gap-4 ">
        <input
          type="text"
          name="organization"
          id="organization"
          placeholder="Company Name"
          required
          autoComplete="organization"
          defaultValue={values?.organization}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Company Email"
          required
          autoComplete="email"
          defaultValue={values?.email}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Owner First Name"
          required
          autoComplete="given-name"
          defaultValue={values?.firstName}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Owner Last Name"
          required
          autoComplete="family-name"
          defaultValue={values?.lastName}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <PhoneInput name="tel" placeholder="Company Phone" value={values?.tel} />
      </div>
      <div className="grid gap-4 mt-8 w-80">
        {/* add privacy-policy checkbox */}
        <Field className="flex items-center gap-1 group mt-10 mb-2">
          <Checkbox
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

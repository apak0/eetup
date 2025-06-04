'use client'
import { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { startCompanyAction } from './actions'

import { PhoneInput } from '@/components/reusables/PhoneInput'

export default function StartAsCompany() {
  const router = useRouter()
  const [formState, formAction] = useActionState<{ values?: any; error?: any; message?: any }, any>(startCompanyAction, { values: {} })

  useEffect(() => {
    if (formState?.error) {
      toast.error(formState?.message, { duration: 15000 })
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Company Email"
          required
          autoComplete="email"
          defaultValue={values?.email}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Owner First Name"
          required
          autoComplete="given-name"
          defaultValue={values?.firstName}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Owner Last Name"
          required
          autoComplete="family-name"
          defaultValue={values?.lastName}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <PhoneInput name="tel" placeholder="Company Phone" value={values?.tel} />
      </div>
      <div className="grid gap-4 mt-8 w-80">
        {/* add privacy-policy checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox className="group size-6 rounded-md bg-orange-3/100 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-bg-orange-3/100 data-focus:outline data-focus:outline-offset-2 data-focus:outline-white">
            <CheckIcon className="hidden size-4 fill-black group-data-checked:block" />
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

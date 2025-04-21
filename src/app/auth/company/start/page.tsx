import Link from 'next/link'

import { startCompanyRegister } from './actions'

import { PhoneInput } from '@/components/reusables/PhoneInput'

export default function StartAsCompany() {
  const formAction = async (formData: FormData) => {
    'use server'

    const res = await startCompanyRegister(formData)

    console.log('ahoy1', res)
    // TODO: handle error and success messages

    // if (res.error) {
    //   const headerList = await headers()
    //   const pathname = headerList.get('current-path')
    //   redirect(pathname + '?' + qs.stringify({ error: res.message }))
    // } else {
    //   const headerList = await headers()
    //   const pathname = headerList.get('current-path')
    //   redirect(pathname + '?' + qs.stringify({ success: res.message }))
    // }
  }

  // TODO: style inputs at global level
  return (
    <form action={formAction} className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-16">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="mb-4">Start As Company</h1>
        <p>Partner with us to reach more customers, make more money and grow your business online</p>
        <p>Your success story starts here</p>
      </div>
      <div className="flex flex-col w-80 gap-4 ">
        <input
          type="text"
          name="organization"
          id="organization"
          placeholder="Company Name"
          required
          autoComplete="organization"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Company Email"
          required
          autoComplete="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Owner First Name"
          required
          autoComplete="given-name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Owner Last Name"
          required
          autoComplete="family-name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400 text-sm"
        />
        <PhoneInput name="tel" placeholder="Company Phone" />
      </div>
      <div className="grid gap-4 mt-8 w-80">
        {/* add privacy-policy checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" name="privacy-policy" id="privacy-policy" required />
          <label htmlFor="privacy-policy">
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

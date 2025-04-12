import jwt from 'jsonwebtoken'
import Link from 'next/link'

import { registerCompany } from './actions'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function RegisterAsCompany({ searchParams }: Props) {
  const token = (await searchParams).token as string

  const formAction = async (formData: FormData) => {
    'use server'

    const res = await registerCompany(formData)

    console.log('ahoy3', res)
    // TODO: handle error and success messages
  }

  const decodedToken = jwt.decode(token) as { email: string }

  return (
    <form action={formAction} className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-16">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="mb-4">Register Your Company</h1>
        <p>Partner with us to reach more customers, make more money and grow your business online</p>
        <p>Your success story starts here</p>
      </div>
      <div className="flex flex-col w-80 gap-4">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="User Name"
          required
          disabled
          autoComplete="off"
          defaultValue={decodedToken?.email}
        />
        <input type="text" name="cocId" id="cocId" placeholder="Chamber of Commerce ID" required autoComplete="off" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Confirm Password"
          required
          autoComplete="new-password"
        />
        <h2 className="text-lg font-semibold">Company Address</h2>
        {/* add address fields with labels and required sign */}
        <input type="text" name="postcode" id="postcode" placeholder="Postcode" required autoComplete="postal-code" />
        <input type="text" name="city" id="city" placeholder="City" required autoComplete="address-level2" />
        <input type="text" name="street" id="street" placeholder="Street" required autoComplete="address-line1" />
        <input
          type="text"
          name="houseNumber"
          id="houseNumber"
          placeholder="House Number"
          required
          autoComplete="address-line2"
        />
        <input
          type="text"
          name="houseNumberAddition"
          id="houseNumberAddition"
          placeholder="House Number Addition (optional)"
          autoComplete="address-line3"
        />
        <input hidden type="text" name="token" id="token" defaultValue={token} />
      </div>
      <div className="grid gap-4 mt-8 w-80">
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

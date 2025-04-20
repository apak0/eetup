import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { register } from '@/lib/services'

export default function Register({ setLoginContent, setAuthOpen }: { setLoginContent: (val: string) => void; setAuthOpen: any }) {
  const router = useRouter()
  const [policyAccepted, setPolicyAccepted] = useState(false)

  const authenticate = async (state: any, formData: FormData) => {
    const object: any = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    await register(object)
      .then(() => {
        setAuthOpen(false)
        router.push('/restaurants')
        toast.success(
          <div>
            <h3>Registered successfully!</h3>Verify your email in order to be able to finish your orders.
          </div>,
          { duration: 5000 },
        )
      })
      .catch(() => {
        toast.error('Could not register, please try again')
      })
  }

  const [, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch}>
      <h1 className="mb-8 text-center">Register</h1>

      <div className="flex flex-col gap-4">
        <input type="firstName" name="firstName" placeholder="First Name" required autoComplete="given-name" />
        <input type="lastName" name="lastName" placeholder="Last Name" required autoComplete="family-name" />
        <input type="email" name="email" placeholder="Email" required autoComplete="email" />
        <input type="password" name="password" placeholder="Password" required />

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="privacyPolicy"
            name="privacyPolicy"
            className="w-4 h-4 accent-gray-200"
            checked={policyAccepted}
            onChange={(e) => setPolicyAccepted(e.target.checked)}
            required
          />
          <label htmlFor="privacyPolicy" className="text-sm">
            I agree the{' '}
            <Link href="/hub/privacy-policy" className="hover:underline" target="_blank">
              Privacy Policy
            </Link>
          </label>
        </div>
      </div>
      <div className="grid gap-4 mt-8">
        <LoginButton disabled={!policyAccepted} />
        <button onClick={() => setLoginContent('login')} className="btn-link ml-auto" type="button">
          to login
        </button>
      </div>
    </form>
  )
}

function LoginButton({ disabled = false }) {
  const { pending } = useFormStatus()

  const handleClick = (event: any) => {
    if (pending || disabled) {
      event.preventDefault()
    }
  }

  return (
    <button className="w-full" aria-disabled={pending || disabled} type="submit" onClick={handleClick} disabled={disabled}>
      Register
    </button>
  )
}

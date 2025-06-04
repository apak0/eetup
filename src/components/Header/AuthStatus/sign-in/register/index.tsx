import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

import { registerUserAction } from './actions'

export default function Register({ setLoginContent, setAuthOpen }: { setLoginContent: (val: string) => void; setAuthOpen: any }) {
  const [formState, formAction] = useActionState<{ values?: any; error?: any; message?: any }, any>(registerUserAction, { values: {} })

  const [policyAccepted, setPolicyAccepted] = useState(false)

  useEffect(() => {
    if (formState?.error) {
      toast.error(formState.message, { duration: 5000 })
    } else if (formState?.message) {
      setAuthOpen(false)
      toast.success('Check your email to verify your account', { duration: 5000 })
    }
  }, [formState])

  const values = formState?.values || {}

  return (
    <form action={formAction}>
      <h1 className="mb-8 text-center">Register</h1>

      <div className="flex flex-col gap-4">
        <input type="firstName" name="firstName" placeholder="First Name" required autoComplete="given-name" defaultValue={values?.firstName} />
        <input type="lastName" name="lastName" placeholder="Last Name" required autoComplete="family-name" defaultValue={values?.lastName} />
        <input type="email" name="email" placeholder="Email" required autoComplete="email" defaultValue={values?.email} />
        <input type="password" name="password" placeholder="Password" required />

        <div className="flex items-center gap-2 mt-2">
          <Checkbox
            id="privacyPolicy"
            name="privacyPolicy"
            checked={policyAccepted}
            onChange={setPolicyAccepted}
            className="group size-6 rounded-md bg-orange-3/100 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-bg-orange-3/100 data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
          >
            <CheckIcon className="hidden size-4 fill-black group-data-checked:block" />
          </Checkbox>

          <label htmlFor="privacyPolicy" className="text-sm mb-0">
            I agree to the{' '}
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

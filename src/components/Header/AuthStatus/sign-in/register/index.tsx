import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { Checkbox, Field, Label } from '@headlessui/react'
import { CheckIcon } from 'lucide-react'
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

        <Field className="flex items-center gap-1 group">
          <Checkbox
            name="privacyPolicy"
            checked={policyAccepted}
            onChange={setPolicyAccepted}
            className="checkbox group size-5 rounded-md p-0.5 border-1 border-(--border-color) flex items-center justify-center group-hover:bg-orange-1 data-checked:bg-orange-1 transition-colors duration-200"
          >
            <CheckIcon strokeWidth={3} className="hidden group-data-checked:block text-orange-3" />
          </Checkbox>

          <Label className="mb-0 ml-1">I agree to the </Label>
          <Link href="/hub/privacy-policy" className="hover:underline text-sm" target="_blank">
            Privacy Policy
          </Link>
        </Field>
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

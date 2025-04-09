'use client'

import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { register } from '@/app/lib/services'

export default function Register({ setLoginContent }: { setLoginContent: (val: string) => void }) {
  const router = useRouter()
  const authenticate = async (state: any, formData: FormData) => {
    const object: any = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    await register(object)
      .then(() => {
        toast.success('Registered successfully!')
        router.replace('/auth/login')
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
        <input type="firstName" name="firstName" placeholder="First Name" required />
        <input type="lastName" name="lastName" placeholder="Last Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
      </div>
      <div className="grid gap-4 mt-8">
        <LoginButton />
        <button onClick={() => setLoginContent('login')} className="link ml-auto" type="button">
          to login
        </button>
      </div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <button className="w-full" aria-disabled={pending} type="submit" onClick={handleClick}>
      Register
    </button>
  )
}

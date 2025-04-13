import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

import { login } from '@/lib/services'

export default function Login({
  setLoginContent,
  setAuthOpen,
}: {
  setLoginContent: (val: string) => void
  setAuthOpen: any
}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authenticate = async (state: any, formData: FormData) => {
    const object: any = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    const result = login(object)
      .then((res) => {
        if (res.isCompany) {
          router.push('/company/admin')
        } else {
          router.push('/restaurants')
        }
        setAuthOpen(false)
      })
      .catch(console.error)

    return result
  }
  const [, dispatch] = useActionState(authenticate, undefined)

  return (
    <div>
      <form action={dispatch}>
        <h1 className="mb-8 text-center">Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-4 mt-8">
          <LoginButton />
          <button onClick={() => setLoginContent('register')} className="link ml-auto btn-text" type="button">
            to register
          </button>
        </div>
      </form>
    </div>
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
      Login
    </button>
  )
}

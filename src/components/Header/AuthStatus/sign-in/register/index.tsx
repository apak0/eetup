import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { register } from '@/lib/services'

export default function Register({ setLoginContent, setAuthOpen }: { setLoginContent: (val: string) => void; setAuthOpen: any }) {
  const router = useRouter()

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
      </div>
      <div className="grid gap-4 mt-8">
        <LoginButton />
        <button onClick={() => setLoginContent('login')} className="btn-link ml-auto" type="button">
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

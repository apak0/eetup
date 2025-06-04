import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Login({ setLoginContent, setAuthOpen }: { setLoginContent: (val: string) => void; setAuthOpen: any }) {
  const router = useRouter()
  const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'))

  const handleRememberMe = (checked: boolean) => {
    setRememberMe(checked)
    if (checked) {
      localStorage.setItem('rememberedEmail', email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }
  }

  const authenticate = async (state: any, formData: FormData) => {
    const object: any = {}
    formData.forEach((value, key) => {
      object[key] = value
    })

    signIn('credentials', { redirect: false, username: object.email, password: object.password })
      .then((res) => {
        if (res?.ok) {
          router.push(res?.url || '/')
          toast.success('Login successful!')
        } else if (res?.error) {
          toast.error(res?.error, { duration: 5000 })
        }
        setAuthOpen(false)
      })
      .catch(() => {
        toast.error('Invalid email or password', { duration: 5000 })
      })
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
            onChange={(e) => {
              setEmail(e.target.value)
              if (rememberMe) {
                localStorage.setItem('rememberedEmail', e.target.value)
              }
            }}
          />{' '}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              required
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-4 hover:text-gray-5 bg-transparent"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={rememberMe}
              onChange={handleRememberMe}
              className="group size-6 rounded-md bg-orange-3/100 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-bg-orange-3/100 data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
            >
              <CheckIcon className="hidden size-4 fill-black group-data-checked:block" />
            </Checkbox>

            <label htmlFor="rememberMe" className="mb-0">
              Remember Me
            </label>
          </div>
        </div>
        <div className="grid gap-4 mt-8">
          <LoginButton />
          <button onClick={() => setLoginContent('register')} className="btn-link ml-auto btn-text" type="button">
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

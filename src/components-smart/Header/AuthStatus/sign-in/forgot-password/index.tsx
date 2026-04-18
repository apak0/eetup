import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgotPassword({ setLoginContent }: { setLoginContent: (val: string) => void }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message || 'If the email exists, a reset link has been sent.')
        setDisabled(true)
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } catch {
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="mb-8 text-center">Forgot Password</h1>
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
            className="w-full"
          />
        </div>
        <button className="w-full mt-6 btn-default" type="submit" disabled={loading || disabled}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        {disabled && <p className="mt-4 text-center">If the email exists, a reset link has been sent.</p>}
        <button className="w-full mt-2 btn-link" type="button" onClick={() => setLoginContent('login')} disabled={loading}>
          Back to login
        </button>
      </form>
    </div>
  )
}

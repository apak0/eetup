import { useState } from 'react'

export default function ResetPassword({ setLoginContent, token }: { setLoginContent: (val: string) => void; token: string }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    setMessage(data.message || data.error)
    setLoading(false)
    if (res.ok) setTimeout(() => setLoginContent('login'), 2000)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="mb-8 text-center">Reset Password</h1>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-2 rounded disabled:opacity-50" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}

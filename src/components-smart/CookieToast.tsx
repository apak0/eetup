'use client'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

function showToast(type: 'success' | 'error', message: string, duration: number = 5000) {
  if (type === 'success') {
    toast.success(message, { duration })
  } else if (type === 'error') {
    toast.error(message, { duration })
  }
}

export default function CookieToast({ toastCookie }: { toastCookie: any }) {
  useEffect(() => {
    const cookies = document.cookie.split(';').map((c) => c.trim())
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=')
      if (!value) continue
      try {
        const decoded = decodeURIComponent(value)
        const parsed = JSON.parse(decoded)
        if (parsed && typeof parsed === 'object') {
          if (parsed.success) {
            showToast('success', parsed.message ?? 'Success')
            document.cookie = `${name}=; path=/; max-age=0`
          } else if (parsed.error) {
            showToast('error', parsed.error)
            document.cookie = `${name}=; path=/; max-age=0`
          }
        }
      } catch {}
    }
  }, [toastCookie])
  return null
}

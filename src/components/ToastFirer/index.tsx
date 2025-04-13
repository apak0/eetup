'use client'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

export function ToastFirer() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const error = searchParams.get('error')

  useEffect(() => {
    if (success)
      toast.success(
        <div>
          Success
          <p>{decodeURIComponent(success)}</p>
        </div>,
      )
    if (error)
      toast.error(
        <div>
          Error
          <p>{decodeURIComponent(error)}</p>
        </div>,
      )
  }, [success, error])

  return null
}

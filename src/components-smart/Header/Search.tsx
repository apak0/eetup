'use client'
import { useEffect, useState } from 'react'
import { Button, Input } from '@headlessui/react'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export const Search = () => {
  const router = useRouter()
  const defaultAddress = useSearchParams().get('address')
  const [address, setAddress] = useState<any>(defaultAddress || '')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setAddress(defaultAddress)
  }, [defaultAddress])

  if (!defaultAddress) {
    return null
  }

  return (
    <div className="flex items-center justify-center">
      {!editing && (
        <Button className="btn-text group hover:bg-(--bg-secondary) px-6 h-10 " onClick={() => setEditing(true)}>
          <div className="truncate max-w-96">{address}</div>
          <SearchIcon className="ml-2 hidden group-hover:block font-bold" size={20} />
        </Button>
      )}
      {editing && (
        <div className="flex items-center">
          <Input
            className="h-10 w-96 px-6"
            type="text"
            name="address"
            placeholder="Address"
            defaultValue={address}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/restaurants?address=${address}`)
                setEditing(false)
              }
              if (e.key === 'Escape') {
                setAddress(defaultAddress)
                setEditing(false)
              }
            }}
            onBlur={() => {
              setAddress(defaultAddress)
              setEditing(false)
            }}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          />
          <Button
            onMouseDown={() => {
              router.push(`/restaurants?address=${address}`)
              setEditing(false)
            }}
            className="rounded-l-none whitespace-nowrap bg-primary text-white rounded-r-2xl hover:bg-primary/90 transition -ml-2 h-10"
          >
            <SearchIcon className="mr-2" size={20} />
            Search
          </Button>
        </div>
      )}
    </div>
  )
}

'use client'
import { ChangeEvent, useId, useState } from 'react'
import { Input } from '@headlessui/react'
import classNames from 'classnames'

interface FloatingInputProps {
  label: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}

export const FloatingInput = ({ label, name, value, onChange, type = 'text', required = false }: FloatingInputProps) => {
  const id = useId()
  const [isFocused, setIsFocused] = useState(false)

  const shouldFloat = isFocused || value?.length > 0

  return (
    <div className="relative w-full mt-4">
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        className={classNames(
          'peer w-full border-(--border) rounded-md px-4 pt-5 pb-2 text-sm outline-none focus:border-(--border)transition-colors',
        )}
      />
      <label
        htmlFor={id}
        className={classNames(
          'absolute left-4 text-sm transition-all pointer-events-none',
          shouldFloat ? 'top-1 text-gray-500 text-xs bg-white px-1 -translate-y-1/2' : 'top-1/2 -translate-y-1/2 text-gray-400',
        )}
      >
        {label}
      </label>

      {shouldFloat && <div className="absolute left-3 top-0 h-2 w-[calc(100%)] bg-white z-[-1]" />}
    </div>
  )
}

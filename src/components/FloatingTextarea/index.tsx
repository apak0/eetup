'use client'
import { useId, useState } from 'react'
import { Textarea } from '@headlessui/react'
import classNames from 'classnames'

interface FloatingTextareaProps {
  rows?: number
  name: string
  id?: string
  placeholder: string
  required?: boolean
  autoComplete?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
  className?: string
}

const FloatingTextarea: React.FC<FloatingTextareaProps> = ({
  rows = 3,
  name,
  id,
  placeholder,
  required = false,
  autoComplete = 'off',
  onChange,
  value,
  className,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const textareaId = id || useId()
  const [isFocused, setIsFocused] = useState(false)
  const shouldFloat = isFocused || value.trim().length > 0

  return (
    <div className="relative w-full">
      <Textarea
        id={textareaId}
        name={name}
        rows={rows}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classNames('peer w-full rounded-md pt-2 text-sm outline-none border-(--border-color) transition-all resize-none', className)}
      />
      <label
        htmlFor={textareaId}
        className={classNames(
          'absolute left-4 text-sm transition-all pointer-events-none',
          shouldFloat ? 'top-0 text-gray-5 dark:text-gray-3 text-xs bg-(--bg) px-1 -translate-y-1/2' : 'top-5 -translate-y-1/2 text-gray-4',
        )}
      >
        {placeholder}
      </label>
      {shouldFloat && <div className="absolute left-3 top-0 h-2 w-[calc(100%)] bg-(--bg) z-[-1]" />}
    </div>
  )
}

export default FloatingTextarea

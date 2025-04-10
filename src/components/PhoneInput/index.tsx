'use client'
import React, { useEffect } from 'react'
import ReactPhoneInput2 from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'
import './style.css'

export const PhoneInput = ({
  name,
  placeholder,
  onChange,
  value,
  suffix,
  autoFocus,
  onPressEnter,
  isValid,
}: {
  name?: any
  placeholder?: any
  onChange?: any
  value?: string
  suffix?: React.ReactNode
  autoFocus?: boolean
  isValid?: any
  onPressEnter?: () => void
}) => {
  const modifiedOnChange = (val: string, arg1: any, arg2: any, formattedVal: string) => {
    if (onChange) {
      onChange(formattedVal)
    }
  }
  useEffect(() => {
    if (autoFocus) {
      const input: any = document.querySelector('.react-tel-input input')
      input?.focus()
    }
  }, [autoFocus])

  return (
    <div className="flex items-center gap-2 h-9">
      <ReactPhoneInput2
        inputProps={{ name, placeholder, autoComplete: 'tel' }}
        preferredCountries={['nl', 'be']}
        isValid={isValid}
        country="nl"
        value={value}
        onChange={modifiedOnChange}
        enableSearch
        onEnterKeyPress={onPressEnter}
        containerStyle={{ height: '100%', width: '100%' }}
        inputStyle={{ height: '100%' }}
        placeholder="Phone Number"
      />
      {suffix}
    </div>
  )
}

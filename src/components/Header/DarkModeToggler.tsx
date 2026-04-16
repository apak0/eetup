'use client'
import { useEffect, useState } from 'react'

import { DarkModeTogglerContainer } from './styled'

export const DarkModeToggler = ({ preferredTheme }: { preferredTheme: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(preferredTheme)

  // Set theme on mount to avoid hydration mismatch
  useEffect(() => {
    let initialTheme: 'dark' | 'light' = preferredTheme
    if (!preferredTheme && typeof window !== 'undefined' && window.matchMedia) {
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [preferredTheme])

  const onThemeChange = (val: 'dark' | 'light') => {
    setTheme(val)
    document.documentElement.classList.toggle('dark', val === 'dark')

    if (val === 'dark') {
      document.cookie = 'theme=dark; path=/'
    } else {
      document.cookie = 'theme=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    }
  }

  return (
    <DarkModeTogglerContainer>
      <input type="checkbox" id="toggle_checkbox" onChange={(e) => onThemeChange(e.target.checked ? 'dark' : 'light')} checked={theme === 'dark'} />

      <label htmlFor="toggle_checkbox" className="mb-0">
        <div id="star">
          <div className="star" id="star-1">
            ★
          </div>
          <div className="star" id="star-2">
            ★
          </div>
        </div>
        <div id="moon"></div>
      </label>
    </DarkModeTogglerContainer>
  )
}

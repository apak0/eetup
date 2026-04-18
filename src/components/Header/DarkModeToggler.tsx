'use client'

import { useEffect, useState } from 'react'

import styles from './DarkModeToggler.module.css'
import classNames from 'classnames'

export const DarkModeToggler = () => {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const cookieMatch = document.cookie.match(/theme=(dark|light)/)
      if (cookieMatch) return cookieMatch[1] as 'dark' | 'light'
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    }
    return 'light'
  }

  const [theme, setTheme] = useState<'dark' | 'light'>()

  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.cookie = `theme=${theme}; path=/`
  }, [theme])

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id="toggle_checkbox"
        className={styles.toggle_checkbox}
        onChange={(e) => {
          setTheme(e.target.checked ? 'dark' : 'light')
        }}
        checked={theme === 'dark'}
      />

      <label htmlFor="toggle_checkbox" className={classNames(styles.containerLabel, 'mb-0')}>
        <div className={styles.starContainer}>
          <div className={classNames(styles.star, styles.star1)}>★</div>
          <div className={classNames(styles.star, styles.star2)}>★</div>
        </div>
        <div className={styles.moon}></div>
      </label>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

interface TooltipProps {
  title: string
  children: React.ReactNode
  delay?: number
  defaultPosition?: 'top' | 'bottom'
}

export default function Tooltip({ title, children, delay = 300, defaultPosition = 'bottom' }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>(defaultPosition)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const delayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showTooltip = () => {
    delayTimeout.current = setTimeout(() => setVisible(true), delay)
  }

  const hideTooltip = () => {
    if (delayTimeout.current) clearTimeout(delayTimeout.current)
    setVisible(false)
  }

  useEffect(() => {
    if (visible && tooltipRef.current && triggerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const triggerRect = triggerRef.current.getBoundingClientRect()

      const spaceAbove = triggerRect.top
      const spaceBelow = window.innerHeight - triggerRect.bottom

      if (defaultPosition === 'top') {
        if (spaceAbove < tooltipRect.height + 8 && spaceBelow > spaceAbove) {
          setPosition('bottom')
        } else {
          setPosition('top')
        }
      } else {
        if (spaceBelow < tooltipRect.height + 8 && spaceAbove > spaceBelow) {
          setPosition('top')
        } else {
          setPosition('bottom')
        }
      }
    }
  }, [visible, defaultPosition])

  console.log('ahoy22', position, visible)

  return (
    <div ref={triggerRef} className="relative" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}

      {visible && (
        <div
          ref={tooltipRef}
          className={classNames(
            'absolute z-50 max-w-96 w-max inline-block px-3 py-2 text-sm text-white bg-black rounded shadow left-1/2 transform -translate-x-1/2 transition-opacity duration-200',
            {
              'bottom-full -translate-y-1': position === 'top',
              'top-full translate-y-1': position === 'bottom',
            },
          )}
        >
          {title}
          <div
            className={classNames('absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45 ', {
              'top-0 -translate-y-1/2': position === 'bottom',
              'bottom-0 translate-y-1/2': position === 'top',
            })}
          />
        </div>
      )}
    </div>
  )
}

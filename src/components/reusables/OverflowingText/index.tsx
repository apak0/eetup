import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import Tooltip from '../Tooltip'

// If the text is overflowing, it will show the tooltip, otherwise won't
export const OverflowingText = ({ children, className, tooltip }: { children: any; className?: string; tooltip?: any }) => {
  const [withTooltip, setWithTooltip] = useState(false)
  const elementRef = useRef<any>(null)

  useEffect(() => {
    const element = elementRef.current
    if (
      element &&
      (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight + 1) /** +1 underline height for links */
    ) {
      setWithTooltip(true)
    }
  }, [children])

  return withTooltip ? (
    <Tooltip title={tooltip || children}>
      <div className={classNames('relative break-words', className)}>{children}</div>
    </Tooltip>
  ) : (
    <div className={classNames('relative break-words', className)}>
      {children}
      <div ref={elementRef} className="absolute inset-0 opacity-0 break-words select-none -z-10">
        {children}
      </div>
    </div>
  )
}

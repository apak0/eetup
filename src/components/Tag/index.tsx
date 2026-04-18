export const Tag = ({
  color = 'bg-gray-3',
  textColor = 'text-white',
  className,
  children,
  ...props
}: {
  color?: string
  textColor?: string
  className?: string
  [key: string]: any
}) => {
  return (
    <span
      className={`border border-solid rounded-lg px-2 text-sm whitespace-nowrap items-center justify-center dark:text(--text) dark:border(--text) inline-flex ${color} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

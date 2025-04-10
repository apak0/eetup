export const getCSSVariable = (variable: string) => {
  if (typeof window === 'undefined') return undefined
  const root = window.document.documentElement
  const styles = getComputedStyle(root)
  const cssVariable = styles.getPropertyValue(variable)
  return cssVariable ? cssVariable.trim() : undefined
}

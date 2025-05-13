export type ProductPreference = {
  label: string
  value: { label: string; price?: string }[]
  isOptional: boolean
  optionLabelInput: string
  optionPriceInput: string
  type: 'single selection' | 'multiple selection'
}

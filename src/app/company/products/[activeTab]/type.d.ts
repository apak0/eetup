export type ProductPreference = {
  label: string
  value: { label: string; price?: string }[]
  isOptional: boolean
  optionLabelInput: string
  optionPriceInput: string
  type: 'single_selection' | 'multiple_selection'
}

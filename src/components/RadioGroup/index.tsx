import { JSX, useState } from 'react'
import { Field, Label, Radio, RadioGroup as HeadlessRadioGroup } from '@headlessui/react'

export const RadioGroup = ({
  options,
  render,
  onChange,
}: {
  options: { label: string; [k: string]: any }[]
  render: (opt: { label: string; [k: string]: any }) => JSX.Element
  onChange?: (opt: { label: string; [k: string]: any }) => void
}) => {
  const [selected, setSelected] = useState<string>('')

  const handleOnChange = (value: string) => {
    const selectedOption = options.find((option) => option.label === value)
    if (selectedOption) {
      setSelected(selectedOption.label)
      if (onChange) {
        onChange(selectedOption)
      }
    }
  }

  return (
    <HeadlessRadioGroup value={selected} onChange={handleOnChange} aria-label="Server size" className="flex flex-col gap-2">
      {options.map((option) => (
        <Field key={option.label}>
          <Label className="flex items-center gap-2 p-2 cursor-pointer mb-0">
            <Radio
              value={option.label}
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
            </Radio>
            {render(option)}
          </Label>
        </Field>
      ))}
    </HeadlessRadioGroup>
  )
}

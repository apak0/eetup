'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDown } from 'lucide-react'

type SelectItem = {
  value: string | number
  label: string
}

export default function Select({
  mode,
  options,
  label,
  value,
  onChange,
}: {
  mode?: 'multiple'
  options: { value: any; label: any }[]
  label: string
  value?: any
  onChange?: (value: any) => void
}) {
  const [selected, setSelected] = useState<SelectItem | SelectItem[]>(value || (mode === 'multiple' ? [] : null))

  const handleChange = (value: any) => {
    setSelected(value)
    if (onChange) {
      if (mode === 'multiple') {
        onChange(value?.map((item: SelectItem) => item.value))
      } else {
        onChange(value.value)
      }
    }
  }

  return (
    <Listbox as="div" value={selected} onChange={handleChange} multiple={mode === 'multiple'}>
      <Label className="block text-sm/6 font-medium">{label}</Label>
      <div className="relative mt-1">
        <ListboxButton className="group bg-(--bg) text-(--text) grid w-full cursor-default grid-cols-1 rounded-md py-1 px-2 text-left outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-3 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="truncate block items-center gap-1">
              {mode === 'multiple' ? (
                (selected as SelectItem[]).map((item) => (
                  <div key={item.value} className="inline-block bg-(--bg-secondary) px-2 py-1 mr-1 rounded">
                    {item.label}
                  </div>
                ))
              ) : (
                <div>{(selected as SelectItem).label}</div>
              )}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className=" col-start-1 row-start-1 size-5 self-center justify-self-end sm:size-4 transition-transform duration-200 group-data-[open]:rotate-180"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-(--bg) z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((item) => (
            <ListboxOption
              key={item.value}
              value={item}
              className="group relative cursor-default py-2 pr-9 pl-3 select-none data-focus:bg-orange-3 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{item.label}</span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-orange-3 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

'use client'

import { JSX, useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import classNames from 'classnames'
import { CheckIcon, ChevronDown, X } from 'lucide-react'

type SelectItem = {
  value: string | number
  label: string
  [k: string]: any
}

export default function Select({
  placeholder,
  className,
  mode,
  options,
  label,
  value,
  onChange,
}: {
  placeholder?: string
  className?: string
  mode?: 'multiple'
  options: SelectItem[]
  label: JSX.Element | string
  value?: any
  onChange?: (value: any) => void
}) {
  const defaultValue = mode === 'multiple' ? options.filter((item) => value?.includes(item.value)) : options.find((item) => item.value === value)

  const [selected, setSelected] = useState<SelectItem | SelectItem[]>(defaultValue!)

  const handleChange = (val: any) => {
    setSelected(val)
    if (onChange) {
      if (mode === 'multiple') {
        onChange(val?.map((item: SelectItem) => item.value))
      } else {
        onChange(val.value)
      }
    }
  }

  return (
    <Listbox as="div" value={selected} onChange={handleChange} multiple={mode === 'multiple'} className={classNames('', className)}>
      <Label className="block text-sm/6 font-medium mb-1">{label}</Label>
      <div className="relative">
        <ListboxButton
          className={classNames(
            'input font-normal group text-(--text) w-full grid grid-cols-1 rounded-md py-1 px-2 text-left bg-transparent hover:bg-transparent',
            {
              'px-4': mode !== 'multiple',
            },
          )}
        >
          <span className={classNames('col-start-1 row-start-1 flex-1 flex items-center gap-3 pr-4', { 'pr-8': mode === 'multiple' })}>
            {(mode === 'multiple' ? (selected as SelectItem[])?.length : !!selected) ? (
              <span className="truncate block items-center gap-1">
                {mode === 'multiple' ? (
                  (selected as SelectItem[]).map((item) => (
                    <div key={item.value} className="inline-block text-white bg-orange-3 px-2 py-0.5 mr-1 rounded dark:bg-orange-3">
                      {item.label}
                    </div>
                  ))
                ) : (
                  <div>{(selected as SelectItem).label}</div>
                )}
              </span>
            ) : (
              <div className={classNames('placeholder', { 'pl-2': mode === 'multiple' })}>
                {placeholder || mode === 'multiple' ? 'Select multiple options' : 'Select an option'}
              </div>
            )}
          </span>
          {(mode === 'multiple' ? (selected as SelectItem[])?.length > 0 : selected) && (
            <div
              className="btn-text col-start-1 row-start-1 justify-self-end self-center mr-4 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation()
                handleChange(mode === 'multiple' ? [] : null)
              }}
            >
              <X className="size-5 sm:size-4" />
            </div>
          )}
          <ChevronDown
            aria-hidden="true"
            className="col-start-1 row-start-1 self-center justify-self-end size-5 sm:size-4 transition-transform duration-200 group-data-[open]:rotate-180"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-(--bg) dark:border z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((item) => (
            <ListboxOption
              key={item.value}
              value={item}
              className={classNames(
                'group relative cursor-default py-2 pl-3 select-none data-focus:bg-orange-3 data-focus:text-white data-focus:outline-hidden',
                { 'pr-9': mode === 'multiple', 'pr-3': mode !== 'multiple' },
              )}
            >
              <div className="flex items-center">
                <span className="block truncate font-normal group-data-selected:font-semibold">{item.label}</span>
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

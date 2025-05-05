import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

interface LoadingProps {
  show: boolean
  fullscreen?: boolean
  text?: string
}

export default function Loading({ show, fullscreen = false, text = 'Loading...' }: LoadingProps) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`flex items-center justify-center ${fullscreen ? 'fixed inset-0 bg-black/50 z-50' : 'relative bg-white/50 rounded p-4'}`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 border-4 border-(--text) border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">{text}</span>
        </div>
      </div>
    </Transition>
  )
}

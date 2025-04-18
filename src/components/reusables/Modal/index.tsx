import { JSX, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import classNames from 'classnames'

export default function Modal({
  className,
  title,
  okClick,
  okText = 'OK',
  open,
  cancelText = 'Cancel',
  content,
  footer,
  setAuthOpen,
}: {
  className?: string
  title: string
  content: JSX.Element
  okClick: () => void
  open: boolean
  okText?: string
  cancelText?: string
  footer?: JSX.Element | false
  setAuthOpen: (val: boolean) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    ;(setAuthOpen ?? setIsOpen)(open ?? isOpen)
  }, [isOpen, setAuthOpen, open])

  return (
    <Dialog open={open ?? isOpen} onClose={setAuthOpen ?? setIsOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={classNames(
              'relative transform overflow-hidden rounded-lg bg-(--bg) text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95',
              className,
            )}
          >
            {title && <DialogTitle className="font-semibold p-8 pb-0">{title}</DialogTitle>}
            <div className="mt-2">{content}</div>
            {footer ?? (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    okClick()
                    ;(setAuthOpen ?? setIsOpen)(false)
                  }}
                >
                  {okText}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => {
                    ;(setAuthOpen ?? setIsOpen)(false)
                  }}
                >
                  {cancelText}
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

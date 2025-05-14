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
  setOpen,
}: {
  className?: string
  title?: JSX.Element | string
  content?: JSX.Element
  okClick: () => void
  open: boolean
  okText?: string
  cancelText?: string
  footer?: JSX.Element | string | false
  setOpen: (val: boolean) => void
}) {
  const [openInner, setOpenInner] = useState(false)

  useEffect(() => {
    ;(setOpen ?? setOpenInner)(open ?? openInner)
  }, [openInner, setOpen, open])

  // TODO: Modal height should not exceed the screen height and should be scrollable if it does
  return (
    <Dialog open={open ?? openInner} onClose={setOpen ?? setOpenInner} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex min-h-full h-full justify-center xl:p-4 text-center items-center ">
          <DialogPanel
            transition
            className={classNames(
              'relative overflow-hidden transform rounded-lg bg-(--bg) text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full mx-2 lg:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95',
              className,
            )}
          >
            <div className="flex flex-col max-h-[calc(100vh-50px)]">
              {title && <DialogTitle className="font-semibold p-6 pb-0">{title}</DialogTitle>}
              <div className="overflow-y-auto">{content}</div>
              {footer ?? (
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      okClick()
                      ;(setOpen ?? setOpenInner)(false)
                    }}
                  >
                    {okText}
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      ;(setOpen ?? setOpenInner)(false)
                    }}
                  >
                    {cancelText}
                  </button>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

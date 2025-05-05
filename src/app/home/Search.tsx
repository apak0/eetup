import { Button } from '@headlessui/react'
import { redirect } from 'next/navigation'

export const Search = () => {
  const formAction = async (formData: FormData) => {
    'use server'
    const address = formData.get('address')?.toString() || ''

    redirect(`/restaurants?address=${address}`)
  }

  return (
    <form action={formAction} className="w-4/5 px-6">
      <div className="card w-full relative shadow dark:border border-solid border-(--border-color) sm:rounded-4xl p-6 top-[10%] ">
        <div className="w-full flex flex-col items-center text-center">
          <div className=" rounded-lg w-full m flex items-center">
            <input
              type="text"
              name="address"
              placeholder="Enter your address..."
              className="w-full min-h-16 py-3 px-4 outline-none rounded-lg border border-gray-300 text-xl"
            />
            <Button type="submit" className="rounded-l-none bg-orange-4 whitespace-nowrap min-h-16 rounded-r-2xl -ml-2">
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

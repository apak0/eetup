import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center max-w-app px-2 lg:px-10 flex-1 mx-auto mt-6">
      <div className="border-bottom w-full" />
      <div className="flex justify-between w-full items-start py-4 mb-4 gap-4">
        <div className="whitespace-pre-wrap ">
          <p>&copy; {new Date().getFullYear()} Eetup. All rights reserved.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-1/2 lg:w-1/3 justify-between">
          <ul className="flex flex-col gap-3">
            <li className="text-sm text-gray-500 hover:text-gray-700">
              <Link href="/auth/company/start">Start As Company</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-3">
            <li className="text-sm text-gray-500 hover:text-gray-700">
              <Link href="/hub/about-us">About Us</Link>
            </li>
            <li className="text-sm text-gray-500 hover:text-gray-700">
              <Link href="/hub/faq">FAQ</Link>
            </li>
            <li className="text-sm text-gray-500 hover:text-gray-700">
              <Link href="/hub/blog">Blog</Link>
            </li>
          </ul>

          <ul className="flex flex-col gap-3">
            <li className="text-sm text-gray-500 hover:text-gray-700">
              <Link href="/hub/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="text-sm text-gray-500 hover:text-gray-700">
              <Link href="/hub/terms-of-service">Terms of Service</Link>
            </li>
            <li className="text-sm text-gray-500 hover:text-gray-700">
              <Link href="/hub/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

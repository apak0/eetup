import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-svh flex items-center justify-center flex-col gap-4">
      <div>
        <h2>Not Found</h2>
        <p>Could not find the page you are looking for</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}

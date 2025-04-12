// app/about-us/page.tsx

import Image from 'next/image'

export default function AboutUsPage() {
  return (
    <main className="max-w-4xl min-h-screen mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">About Us</h1>
      <hr />
      <div className="my-6 rounded-lg overflow-hidden shadow-md">
        <Image
          src="https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?t=st=1744142350~exp=1744145950~hmac=8be14e51725baa4e0f29e5c6827368d5dd93a8afa75b56d42e2e3397f6199c99&w=900"
          alt="Restaurant interior"
          width={1380}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Who We Are</h2>
        <p className="text-gray-600">
          We are a passionate team of food lovers and tech experts who came together to revolutionize the restaurant
          e-commerce experience. Our mission is to connect local restaurants with hungry customers through a seamless
          and modern digital platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Our Vision</h2>
        <p className="text-gray-600">
          To become the leading restaurant e-commerce solution in the region by providing exceptional tools, reliable
          support, and a robust customer base to our partner restaurants.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">What Makes Us Different?</h2>
        <p className="text-gray-600">
          Unlike other platforms, we believe in empowering local businesses with more control, transparent pricing, and
          hands-on support every step of the way. Our tools are designed with restaurant owners in mind.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Contact Us</h2>
        <p className="text-gray-600">
          Have questions or feedback? Reach out to us at <span className="underline">{process.env.E_MAIL}</span> and
          we’ll get back to you as soon as possible.
        </p>
      </section>
    </main>
  )
}

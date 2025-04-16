// app/faq/page.tsx

import Link from 'next/link'

export default function FAQPage() {
  return (
    <main className="max-w-4xl min-h-screen  mx-auto px-4 py-12">
      <h1 className="text-4xl mb-6 text-center border-bottom pb-5">Frequently Asked Questions (FAQ)</h1>

      <section className="my-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">1. How do I register my restaurant?</h2>
        <p className="text-gray-600">
          You can register your restaurant by clicking the “Register As Restaurant” link in the footer or visiting{' '}
          <span className="underline">
            {' '}
            <Link href="/register-as-restaurant"> /register-as-restaurant</Link>
          </span>
          . Fill out the required information and our team will contact you shortly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">2. Is there a fee to be listed on the platform?</h2>
        <p className="text-gray-600">
          We offer flexible commission-based models depending on your location and order volume. Contact our business team for a detailed plan.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">3. How are orders delivered to customers?</h2>
        <p className="text-gray-600">
          We offer integrated delivery through our partner logistics companies or you can manage your own delivery. You can choose the option that
          works best for you during registration.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Can I edit my restaurant’s menu after registration?</h2>
        <p className="text-gray-600">
          Yes, after registration you’ll have access to a restaurant dashboard where you can update your menu, prices, and availability at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Who should I contact for technical support?</h2>
        <p className="text-gray-600">
          For technical support, contact us at <span className="underline">{process.env.E_MAIL}</span>. Our team is available 7 days a week to assist
          you.
        </p>
      </section>
    </main>
  )
}

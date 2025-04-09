import Link from 'next/link'

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">Blog</h1>
      <hr className="mb-8" />

      <section className="my-6">
        <Link href="/blog/boost-your-online-orders">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2 no-underline">
              5 Tips to Boost Your Restaurant&apos;s Online Orders
            </h2>
            <p className="text-gray-600">
              Discover how to enhance your digital presence, improve your menu listings, and provide excellent delivery
              services to increase your online orders.
            </p>
          </div>
        </Link>
      </section>

      <section className="my-6">
        <Link href="/blog/empowers-local-restaurants">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2 no-underline">
              How Neemee Empowers Local Restaurants
            </h2>
            <p className="text-gray-600">
              Learn how Neemee helps small and medium-sized restaurants thrive in the digital economy by offering smart
              tools, reliable logistics, and strong customer support.
            </p>
          </div>
        </Link>
      </section>

      <section className="my-6">
        <Link href="/blog/success-story">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2 no-underline">
              Success Story: From Local Diner to Digital Star
            </h2>
            <p className="text-gray-600">
              Read the inspiring story of a small family restaurant that doubled its orders within 3 months of joining
              our platform.
            </p>
          </div>
        </Link>
      </section>
    </main>
  )
}

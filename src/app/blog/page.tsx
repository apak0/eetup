export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
        Blog
      </h1>
      <hr className="border-t border-gray-300 opacity-50 w-full mb-10 mx-auto max-w-md" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          5 Tips to Boost Your Restaurant's Online Orders
        </h2>
        <p className="text-gray-600">
          Discover how to enhance your digital presence, improve your menu listings, and provide excellent delivery services to increase your online orders.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          How Neemee Empowers Local Restaurants
        </h2>
        <p className="text-gray-600">
          Learn how Neemee helps small and medium-sized restaurants thrive in the digital economy by offering smart tools, reliable logistics, and strong customer support.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          Success Story: From Local Diner to Digital Star
        </h2>
        <p className="text-gray-600">
          Read the inspiring story of a small family restaurant that doubled its orders within 3 months of joining our platform.
        </p>
      </section>

      {/* Footer will stick at the bottom */}
      <footer className="mt-auto">
        {/* Footer content goes here */}
      </footer>
    </main>
  );
}

export default function RegisterRestaurant() {
    return (
      <main className="min-h-screen  p-8 text-gray-800">
        <section className="max-w-xl mx-auto">
          <h1 className="text-4xl text-center font-bold mb-6 text-blue-700">Register Your Restaurant</h1>
          <p className="mb-4">Join our platform and reach thousands of new customers every day.</p>
          <form className="space-y-4">
            <input className="w-full p-3 border rounded-lg" placeholder="Restaurant Name" />
            <input className="w-full p-3 border rounded-lg" placeholder="Email Address" />
            <input className="w-full p-3 border rounded-lg" placeholder="Phone Number" />
            <textarea className="w-full p-3 border rounded-lg" rows={3} placeholder="Restaurant Description"></textarea>
            <button className="bg-purple-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">Submit</button>
          </form>
        </section>
      </main>
    );
  }
export default function Contact() {
    return (
      <main className="min-h-screen  p-8 text-gray-800">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl text-center font-bold mb-6 text-blue-700">Contact Us</h1>
          <p className="mb-4">Have questions or feedback? We’d love to hear from you.</p>
          <form className="space-y-4">
            <input className="w-full p-3 border rounded-lg" placeholder="Your Name" />
            <input className="w-full p-3 border rounded-lg" placeholder="Your Email" />
            <textarea className="w-full p-3 border rounded-lg" rows={4} placeholder="Your Message"></textarea>
            <button className="bg-purple-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">Send Message</button>
          </form>
        </section>
      </main>
    );
  }
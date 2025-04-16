// app/privacy-policy/page.tsx

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl min-h-screen mx-auto px-4 py-12">
      <h1 className="text-4xl mb-6 text-center border-bottom pb-5">Privacy Policy</h1>

      <p className="my-6 text-gray-600">
        This Privacy Policy describes how our platform collects, uses, and protects your personal and business
        information when you use our restaurant e-commerce service.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">1. Information We Collect</h2>
        <p className="text-gray-600">
          We collect information you provide during registration such as business name, address, contact information,
          menu details, and payment information. We also collect technical information including your IP address and
          device data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">2. How We Use Your Information</h2>
        <p className="text-gray-600">
          We use the collected information to facilitate order processing, display your restaurant on our platform,
          provide customer support, and improve our services. We may also use your data for marketing and analytics
          purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">3. Sharing Your Information</h2>
        <p className="text-gray-600">
          We do not sell your information. We only share it with third-party service providers for payment processing,
          logistics, and platform operations. All partners are obligated to keep your data secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">4. Data Security</h2>
        <p className="text-gray-600">
          We implement strong security measures to protect your information. However, no method of transmission over the
          Internet or method of electronic storage is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">5. Your Rights</h2>
        <p className="text-gray-600">
          You have the right to access, update, or delete your personal data. For any such requests, please contact us
          at <span className="underline">privacy@yourapp.com</span>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">6. Cookies and Tracking</h2>
        <p className="text-gray-600">
          We use cookies to personalize your experience and analyze site traffic. You can modify your browser settings
          to decline cookies, but some features may not function properly.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">7. Updates to This Policy</h2>
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. The latest version will always be available on this page.
        </p>
      </section>

      <p className="text-sm text-gray-400">
        If you have any questions about our privacy practices, please contact us at{' '}
        <span className="underline">{process.env.E_MAIL}</span>.
      </p>
    </main>
  )
}

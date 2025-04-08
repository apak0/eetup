// app/terms-of-service/page.tsx

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Terms of Service
      </h1>
    <hr/>
      <p className="my-6 text-gray-600">
        These Terms of Service ("Agreement") govern your access to and use of the platform as a registered restaurant ("You", "Restaurant") on our food delivery and ordering service ("Platform"). By registering and using the Platform, you agree to comply with and be bound by these Terms.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">1. Registration and Eligibility</h2>
        <p className="text-gray-600">
          Restaurants must provide accurate and up-to-date business information during registration. We reserve the right to approve or deny any registration request at our sole discretion.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">2. Menu Management</h2>
        <p className="text-gray-600">
          You are responsible for keeping your menu, prices, and availability current. Any changes must be made promptly to avoid customer dissatisfaction or operational issues.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">3. Order Fulfillment</h2>
        <p className="text-gray-600">
          Restaurants are expected to fulfill orders in a timely and professional manner. Cancellations, delays, or incorrect items may result in customer complaints and platform penalties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">4. Commission and Payments</h2>
        <p className="text-gray-600">
          The Platform may deduct a commission fee from each order. Payment cycles, fees, and invoicing will be communicated through your dashboard and are subject to change.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">5. Compliance and Hygiene</h2>
        <p className="text-gray-600">
          Restaurants must comply with all applicable food safety, hygiene, and licensing regulations. We reserve the right to suspend or remove any restaurant that fails to meet these standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">6. Intellectual Property</h2>
        <p className="text-gray-600">
          You retain the rights to your branding and menu items. However, by registering, you grant us a license to use your restaurant's name, logo, and images for marketing and platform display purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">7. Termination</h2>
        <p className="text-gray-600">
          Either party may terminate the relationship at any time with notice. Upon termination, the restaurant’s profile and menu will be removed from the Platform.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">8. Limitation of Liability</h2>
        <p className="text-gray-600">
          We are not responsible for loss of profits, revenue, or data arising out of your use of the Platform. Use of the Platform is at your own risk.
        </p>
      </section>

      <p className="text-sm text-gray-400">
        By continuing to use our services, you agree to abide by these Terms. For questions or disputes, please contact us at <span className="underline">support@neemmee.com</span>.
      </p>
    </main>
  )
}

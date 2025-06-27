import { useTranslation } from 'react-i18next';
import { spacing } from '../styles/designSystem';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className={`${spacing.container}`}>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl opacity-95 leading-relaxed">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`${spacing.container} py-16`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-8 text-gray-700 mb-8">
                At Mero Library, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our website and services.
              </p>

              <div className="space-y-8">
                {/* Section 1 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">a) Personal Information (if you fill contact forms):</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Message content or queries</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">b) Non-Personal Information:</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                        <li>Browser type, device type</li>
                        <li>IP address (for analytics)</li>
                        <li>Country/location (general, not exact)</li>
                        <li>Pages visited and time spent (for improving experience)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-700 mb-3">We use your information to:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Respond to your inquiries</li>
                    <li>Improve our platform and user experience</li>
                    <li>Share literary updates if you subscribe</li>
                    <li>Monitor site traffic and reading preferences (anonymously)</li>
                  </ul>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Data Sharing</h2>
                  <p className="text-gray-700 mb-3">
                    We do not sell, trade, or rent users' personal information to others. Data may be shared only:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>With service providers (like analytics tools) who follow strict privacy standards</li>
                    <li>If required by law or legal process</li>
                  </ul>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Cookies and Tracking</h2>
                  <p className="text-gray-700 mb-3">We use cookies to:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Understand user behavior</li>
                    <li>Remember your preferences (e.g., language)</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    You can control cookies in your browser settings.
                  </p>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Third-Party Links</h2>
                  <p className="text-gray-700">
                    Our site may include links to external sites (e.g., author references). We are not responsible for their privacy practices. Please review their policies separately.
                  </p>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Data Security</h2>
                  <p className="text-gray-700 mb-3">We take reasonable steps to secure your personal data, using:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>HTTPS encryption</li>
                    <li>Trusted hosting services</li>
                    <li>Access restrictions on sensitive data</li>
                  </ul>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Children's Privacy</h2>
                  <p className="text-gray-700">
                    Our services are not designed for users under the age of 13. We do not knowingly collect personal data from children.
                  </p>
                </section>

                {/* Section 8 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Changes to This Policy</h2>
                  <p className="text-gray-700">
                    We may update this Privacy Policy as our platform evolves. We will post the latest version with a revised date at the top.
                  </p>
                </section>

                {/* Section 9 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions or concerns about this Privacy Policy, please contact us directly through our Contact Form or email us at:{' '}
                    <a 
                      href="mailto:info@merolibrary.com" 
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      info@merolibrary.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 
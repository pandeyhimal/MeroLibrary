import { useTranslation } from 'react-i18next';
import { spacing } from '../styles/designSystem';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className={`${spacing.container}`}>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Terms of Service
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
                Welcome to Mero Library. By accessing and using our website and services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
              </p>

              <div className="space-y-8">
                {/* Section 1 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 mb-3">
                    By accessing or using Mero Library's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Description of Service</h2>
                  <p className="text-gray-700 mb-3">
                    Mero Library is a digital platform that provides access to Nepali literature, including books, author information, and literary content. Our services include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Digital access to Nepali books and literature</li>
                    <li>Author information and biographies</li>
                    <li>Blog posts and literary articles</li>
                    <li>Contact and communication services</li>
                    <li>Newsletter and updates subscription</li>
                  </ul>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Accounts and Registration</h2>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      While most of our content is publicly accessible, certain features may require registration or account creation. When creating an account, you agree to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>Provide accurate and complete information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Notify us immediately of any unauthorized use</li>
                      <li>Accept responsibility for all activities under your account</li>
                    </ul>
                  </div>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Acceptable Use Policy</h2>
                  <p className="text-gray-700 mb-3">You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the service or servers</li>
                    <li>Transmit viruses, malware, or other harmful code</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Violate any applicable laws or regulations</li>
                  </ul>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property Rights</h2>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      The content on Mero Library, including but not limited to text, graphics, images, logos, and software, is owned by Mero Library or its content providers and is protected by copyright and other intellectual property laws.
                    </p>
                    <p className="text-gray-700">
                      You may not reproduce, distribute, modify, or create derivative works of our content without explicit permission. However, you may access and view the content for personal, non-commercial use.
                    </p>
                  </div>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">6. User-Generated Content</h2>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      If you submit content to our platform (such as comments, reviews, or messages), you grant us a non-exclusive, royalty-free license to use, display, and distribute that content.
                    </p>
                    <p className="text-gray-700">
                      You are responsible for ensuring that any content you submit does not violate the rights of others or these terms of service.
                    </p>
                  </div>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Privacy and Data Protection</h2>
                  <p className="text-gray-700">
                    Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.
                  </p>
                </section>

                {/* Section 8 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Disclaimers and Limitations</h2>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Mero Library provides its services "as is" and "as available" without any warranties, express or implied. We do not guarantee that:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>The service will be uninterrupted or error-free</li>
                      <li>Defects will be corrected</li>
                      <li>The service is free of viruses or other harmful components</li>
                      <li>The content is accurate, complete, or up-to-date</li>
                    </ul>
                    <p className="text-gray-700">
                      In no event shall Mero Library be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
                    </p>
                  </div>
                </section>

                {/* Section 9 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Third-Party Links and Services</h2>
                  <p className="text-gray-700">
                    Our website may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party services is at your own risk.
                  </p>
                </section>

                {/* Section 10 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Termination</h2>
                  <p className="text-gray-700">
                    We may terminate or suspend your access to our services at any time, with or without cause, with or without notice. Upon termination, your right to use the service will cease immediately.
                  </p>
                </section>

                {/* Section 11 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Governing Law</h2>
                  <p className="text-gray-700">
                    These Terms of Service shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Nepal.
                  </p>
                </section>

                {/* Section 12 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Changes to Terms</h2>
                  <p className="text-gray-700">
                    We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the updated terms on our website. Your continued use of our services after such changes constitutes acceptance of the new terms.
                  </p>
                </section>

                {/* Section 13 */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Contact Information</h2>
                  <p className="text-gray-700">
                    If you have any questions about these Terms of Service, please contact us at:{' '}
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

export default TermsOfService; 
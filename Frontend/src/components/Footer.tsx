import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MeroLearningLogo from "../assets/Mero Library.png";
import { useContactForm } from "../context/ContactFormContext";
import {
  spacing,
  typography,
  components,
  animations,
} from "../styles/designSystem";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { showContactForm, setShowContactForm } = useContactForm();
  const { t } = useTranslation();
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [contactFormErrors, setContactFormErrors] = useState<FormErrors>({});
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
  };

  const validateContactForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!contactFormData.name.trim()) {
      errors.name = t('common.name') + ' ' + t('common.required').toLowerCase();
    }
    if (!contactFormData.email.trim()) {
      errors.email = t('common.email') + ' ' + t('common.required').toLowerCase();
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactFormData.email)) {
      errors.email = t('common.invalidEmail');
    }
    if (!contactFormData.phone.trim()) {
      errors.phone = t('common.phone') + ' ' + t('common.required').toLowerCase();
    } else if (!/^[0-9]{10}$/.test(contactFormData.phone)) {
      errors.phone = t('common.invalidPhone');
    }
    if (!contactFormData.subject.trim()) {
      errors.subject = t('common.subject') + ' ' + t('common.required').toLowerCase();
    }
    if (!contactFormData.message.trim()) {
      errors.message = t('common.message') + ' ' + t('common.required').toLowerCase();
    }

    setContactFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContactForm()) {
      return;
    }

    setIsContactSubmitting(true);
    try {
      // TODO: Implement contact form submission to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(t('donations.contactForm.successMessage'));
      setShowContactForm(false);
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      alert(t('donations.contactForm.errorMessage'));
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <>
      <footer className=" ">
        {/* Top Shadow Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent shadow-lg"></div>
          
        {/* Main Footer Content */}
        <div className={`${spacing.container} py-16`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Link to="/">
                  <img
                    src={MeroLearningLogo}
                    alt="MeroLearning"
                    className="h-30 w-auto"
                  />
                </Link>
                {/* <h3 className={`${typography.h3} text-white`}>Mero Library</h3> */}
              </div>
              <p className=" text-black text-xl text-bold leading-relaxed">
                Nepal's premier digital library platform, bringing the rich
                heritage of Nepali literature to readers worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-800 hover:text-gray-400 transition-colors`}
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-800 hover:text-gray-400 transition-colors`}
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-800 hover:text-gray-400 transition-colors`}
                >
                  <FaInstagram className="text-2xl" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-800 hover:text-gray-400 transition-colors`}
                >
                  <FaYoutube className="text-2xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`${typography.h4} text-black mb-6`}>Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="/books"
                    className={`font-semibold text-black hover:text-blue-600`}
                  >
                    Browse Books
                  </a>
                </li>
                <li>
                  <a
                    href="/authors"
                    className={`font-semibold text-black hover:text-blue-600`}
                  >
                    Authors
                  </a>
                </li>
                <li>
                  <a
                    href="/blogs"
                    className={`font-semibold text-black hover:text-blue-600`}
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`font-semibold text-black hover:text-blue-600`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className={`font-semibold text-black hover:text-blue-600`}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className={`${typography.h4} text-black mb-6`}>Stay Updated</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest updates on new books
                and events.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`${components.input} pl-12 bg-gray-800 border-gray-700 text-white`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`${components.button.primary} w-full ${animations.hover}`}
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className={`${typography.h4} text-black mb-6`}>Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-800">
                    Bhaktapur, Nepal
                    <br />
                    P.O. Box 12345
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <FaPhone className="text-blue-500 flex-shrink-0" />
                  <a
                    href="tel: +977 9866137449"
                    className={` text-gray-800`}
                  >
                    +977 9866137449
                  </a>
                </li>
                <li className="flex items-center space-x-4">
                  <FaEnvelope className="text-blue-500 flex-shrink-0" />
                  <a
                    href="mailto:info@merolibrary.com"
                    className={` text-gray-800`}
                  >
                    info@merolibrary.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className={`${spacing.container} py-6`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-600 text-sm flex items-center">
                <a
                  href="mailto:himalpandey2002@gmail.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  Coded By Himal Pandey
                </a>
                
              </div>
              <div className="text-gray-600 text-sm">
                © {currentYear} Mero Library. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link
                  to="/privacy-policy"
                  className={`font-semibold text-gray-600 hover:text-blue-600 transition-colors`}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className={`font-semibold text-gray-600 hover:text-blue-600 transition-colors`}
                >
                  Terms of Service
                </Link>
                <a
                  href="/faq"
                  className={`font-semibold text-gray-600`}
                >
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{t('donations.contactForm.title')}</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">{t('donations.contactForm.name')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleContactInputChange}
                    className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('donations.contactForm.name')}
                  />
                </div>
                {contactFormErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{contactFormErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.contactForm.email')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('donations.contactForm.email')}
                  />
                </div>
                {contactFormErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{contactFormErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.contactForm.phone')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={contactFormData.phone}
                    onChange={handleContactInputChange}
                    className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('donations.contactForm.phone')}
                  />
                </div>
                {contactFormErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{contactFormErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.contactForm.subject')}</label>
                <input
                  type="text"
                  name="subject"
                  value={contactFormData.subject}
                  onChange={handleContactInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('donations.contactForm.subject')}
                />
                {contactFormErrors.subject && (
                  <p className="text-red-500 text-sm mt-1">{contactFormErrors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.contactForm.message')}</label>
                <textarea
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('donations.contactForm.message')}
                />
                {contactFormErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{contactFormErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isContactSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isContactSubmitting ? t('donations.contactForm.sending') : t('donations.contactForm.sendMessage')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

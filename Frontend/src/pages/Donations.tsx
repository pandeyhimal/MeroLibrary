import React, { useState } from 'react';
import { FaHeart, FaHandHoldingHeart, FaTimes, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '../context/ContactFormContext';

interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'khalti' | 'esewa';
  amount: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  paymentMethod?: string;
  amount?: string;
}

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
  paymentMethod?: string;
  amount?: string;
  subject?: string;
  message?: string;
}

function Donation() {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { showContactForm, setShowContactForm } = useContactForm();
  const [formData, setFormData] = useState<DonationFormData>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'khalti',
    amount: 0
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [contactFormErrors, setContactFormErrors] = useState<FormErrors>({});
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = t('common.name') + ' ' + t('common.required').toLowerCase();
    }
    if (!formData.email.trim()) {
      errors.email = t('common.email') + ' ' + t('common.required').toLowerCase();
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('common.invalidEmail');
    }
    if (!formData.phone.trim()) {
      errors.phone = t('common.phone') + ' ' + t('common.required').toLowerCase();
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = t('common.invalidPhone');
    }
    if (formData.amount <= 0) {
      errors.amount = t('donations.donationForm.amount') + ' ' + t('common.required').toLowerCase();
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Implement actual payment gateway integration
      if (formData.paymentMethod === 'khalti') {
        // Khalti payment integration
        console.log('Processing Khalti payment...');
      } else {
        // eSewa payment integration
        console.log('Processing eSewa payment...');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(t('donations.donationForm.successMessage'));
      setFormData({
        name: '',
        email: '',
        phone: '',
        paymentMethod: 'khalti',
        amount: 0
      });
    } catch (error) {
      alert(t('donations.donationForm.errorMessage'));
    } finally {
      setIsProcessing(false);
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('donations.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t('donations.heroSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Donation Form Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <FaHeart className="text-red-500 text-4xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold">{t('donations.donationForm.title')}</h2>
              <p className="text-gray-600 mt-2">
                {t('donations.whyDonateDesc')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">{t('donations.donationForm.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('donations.donationForm.name')}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.donationForm.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('donations.donationForm.email')}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.donationForm.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('donations.donationForm.phone')}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.donationForm.amount')}</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('donations.donationForm.amount')}
                  min="1"
                />
                {formErrors.amount && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('donations.donationForm.paymentMethod')}</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="khalti">{t('donations.donationForm.khalti')}</option>
                  <option value="esewa">{t('donations.donationForm.esewa')}</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isProcessing ? t('donations.donationForm.processing') : t('donations.donationForm.donateNow')}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              <p>{t('donations.whyDonateDesc')}</p>
              <p className="mt-2">{t('donations.contactForm.title')}</p>
            </div>
          </div>
        </div>
      </div>

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

      {/* Footer with Contact Link */}
      <div className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray-600">
              {t('donations.whyDonate')}{' '}
              <button
                onClick={() => setShowContactForm(true)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {t('donations.contactForm.title')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donation; 
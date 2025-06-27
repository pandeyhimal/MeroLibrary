import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ne' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      aria-label={t('common.language')}
    >
      {i18n.language === 'en' ? t('common.nepali') : t('common.english')}
    </button>
  );
};

export default LanguageToggle; 
import { createContext, useContext, useState, type ReactNode } from 'react';

interface ContactFormContextType {
  showContactForm: boolean;
  setShowContactForm: (show: boolean) => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <ContactFormContext.Provider value={{ showContactForm, setShowContactForm }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
}; 
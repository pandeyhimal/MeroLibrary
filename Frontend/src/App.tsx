import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Authors from "./pages/Writers";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Donations from './pages/Donations';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { ContactFormProvider } from './context/ContactFormContext';
import { CartProvider } from './context/CartContext';

// ScrollToTop component to handle scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <ContactFormProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ContactFormProvider>
    </CartProvider>
  );
}

export default App;

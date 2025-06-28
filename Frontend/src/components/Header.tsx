import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBook, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import MeroLearningLogo from '../assets/Mero Library.png'
import LanguageToggle from './LanguageToggle';

// Search result types
interface SearchResult {
  id: number;
  title: string;
  type: 'book' | 'author';
  image?: string;
}

function Header() {
  const { t } = useTranslation();
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchType, setSearchType] = useState<'all' | 'book' | 'author'>('all');
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Mock search function (replace with actual API call)
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      // Mock search results (replace with actual API results)
      const mockResults: SearchResult[] = [
        { id: 1, title: "पल्पसा काफे", type: "book" as const, image: "/images/books/palpusa-kaffe.jpg" },
        { id: 2, title: "मुनामदन", type: "book" as const, image: "/images/books/muna-madan.jpg" },
        { id: 3, title: "लक्ष्मीप्रसाद देवकोटा", type: "author" as const },
        { id: 4, title: "माधव प्रसाद घिमिरे", type: "author" as const },
      ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) &&
        (searchType === 'all' || result.type === searchType)
      );
      setSearchResults(mockResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                src={MeroLearningLogo} 
                alt="MeroLearning" 
                className="h-15 w-auto"
              />
            </Link>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
            <div className="relative">
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder={t('home.searchPlaceholder')}
                  className="bg-transparent w-full focus:outline-none text-gray-700"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.length > 2 && setShowResults(true)}
                />
                <div className="flex items-center space-x-2 ml-2">
                  <select
                    className="bg-transparent text-gray-600 text-sm focus:outline-none"
                    value={searchType}
                    onChange={(e) => {
                      setSearchType(e.target.value as 'all' | 'book' | 'author');
                      handleSearch(searchQuery);
                    }}
                  >
                    <option value="all">{t('common.all')}</option>
                    <option value="book">{t('common.book')}</option>
                    <option value="author">{t('common.author')}</option>
                  </select>
                </div>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      to={result.type === 'book' ? `/books/${result.id}` : `/writers/${result.id}`}
                      className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setShowResults(false)}
                    >
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-12 h-16 object-cover rounded mr-3"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-gray-100 rounded mr-3 flex items-center justify-center">
                          {result.type === 'book' ? <FaBook className="text-gray-400" /> : <FaUser className="text-gray-400" />}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-800">{result.title}</div>
                        <div className="text-sm text-gray-500">
                          {result.type === 'book' ? 'पुस्तक' : 'लेखक'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Section */}
          <nav className="flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              <li>
                <Link 
                  to="/books" 
                  className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 group"
                >
                  {t('navigation.books')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/authors" 
                  className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 group"
                >
                  {t('navigation.authors')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/blogs" 
                  className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 group"
                >
                  {t('navigation.blogs')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 group flex items-center"
                >
                  <div className="relative">
                    <FaShoppingCart className="text-xl" />
                    {state.totalItems > 0 && (
                      <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold z-10 border-2 border-white shadow-md">
                        {state.totalItems > 99 ? '99+' : state.totalItems}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to='/donations'
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t('navigation.donations')}
                </Link>
              </li>
              <li>
                <LanguageToggle />
              </li>
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
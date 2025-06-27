import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200">
        Go Home
      </Link>
    </div>
  );
} 
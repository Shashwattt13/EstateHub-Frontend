import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors inline-block font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
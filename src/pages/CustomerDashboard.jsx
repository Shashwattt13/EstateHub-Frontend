import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { properties, savedProperties } = useProperty();

  const savedProps = properties.filter((p) => savedProperties.includes(p.id));
  const recentlyViewed = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your property search from here</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Saved Properties */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#1B5E20]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Saved Properties</p>
                <p className="text-3xl font-bold text-[#1B5E20]">{savedProps.length}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <Link to="/saved" className="text-sm text-[#1B5E20] font-semibold mt-3 inline-block hover:underline">
              View All →
            </Link>
          </div>

          {/* Recently Viewed */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#2E7D32]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Recently Viewed</p>
                <p className="text-3xl font-bold text-[#2E7D32]">{recentlyViewed.length}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Searches */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#388E3C]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Active Searches</p>
                <p className="text-3xl font-bold text-[#388E3C]">2</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#388E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Properties Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Saved Properties</h2>
            <Link to="/saved" className="text-[#1B5E20] font-semibold hover:underline">
              View All
            </Link>
          </div>
          {savedProps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProps.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Properties</h3>
              <p className="text-gray-600 mb-6">Start exploring properties and save your favorites!</p>
              <Link to="/properties" className="px-6 py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors inline-block font-semibold">
                Browse Properties
              </Link>
            </div>
          )}
        </div>

        {/* Recommended Properties */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
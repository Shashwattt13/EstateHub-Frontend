import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const { properties } = useProperty();

  // Filter properties listed by this owner
  const myProperties = properties.filter((p) => p.listedBy.role === 'owner').slice(0, 3);
  const activeProperties = myProperties.filter((p) => p.status === 'active');

  const totalViews = myProperties.reduce((sum, p) => sum + p.stats.views, 0);
  const totalInquiries = myProperties.reduce((sum, p) => sum + p.stats.inquiries, 0);
  const totalSaves = myProperties.reduce((sum, p) => sum + p.stats.saves, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">
            Owner Dashboard
          </h1>
          <p className="text-gray-600">Manage your properties and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Properties */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#1B5E20]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Properties</p>
                <p className="text-3xl font-bold text-[#1B5E20]">{myProperties.length}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{activeProperties.length} active listings</p>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#2E7D32]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Views</p>
                <p className="text-3xl font-bold text-[#2E7D32]">{totalViews}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">This month</p>
          </div>

          {/* Total Inquiries */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#388E3C]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Inquiries</p>
                <p className="text-3xl font-bold text-[#388E3C]">{totalInquiries}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#388E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
          </div>

          {/* Total Saves */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4CAF50]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Saved</p>
                <p className="text-3xl font-bold text-[#4CAF50]">{totalSaves}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">By users</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/list-property" className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">List New Property</h3>
                <p className="text-sm text-white/80">Add a new listing</p>
              </div>
            </div>
          </Link>

          <button className="bg-white border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl shadow-md p-6 hover:bg-[#E8F5E9] transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">View Analytics</h3>
                <p className="text-sm text-gray-600">Track performance</p>
              </div>
            </div>
          </button>

          <button className="bg-white border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl shadow-md p-6 hover:bg-[#E8F5E9] transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Manage Visits</h3>
                <p className="text-sm text-gray-600">Schedule appointments</p>
              </div>
            </div>
          </button>
        </div>

        {/* My Properties */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors font-medium">
                Active ({activeProperties.length})
              </button>
              <button className="px-4 py-2 bg-[#F5F1EB] text-gray-700 rounded-lg hover:bg-[#EBE6DF] transition-colors font-medium">
                Draft (0)
              </button>
              <button className="px-4 py-2 bg-[#F5F1EB] text-gray-700 rounded-lg hover:bg-[#EBE6DF] transition-colors font-medium">
                Sold (0)
              </button>
            </div>
          </div>

          {myProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProperties.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100">
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Listed</h3>
              <p className="text-gray-600 mb-6">Start listing your properties to reach potential buyers!</p>
              <Link to="/list-property" className="px-6 py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors inline-block font-semibold">
                List Your First Property
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="space-y-4">
              {[
                { action: 'New inquiry received', property: '3 BHK Luxury Apartment', time: '2 hours ago', icon: 'message' },
                { action: 'Property viewed', property: '2 BHK in Noida', time: '5 hours ago', icon: 'eye' },
                { action: 'Property saved by user', property: '3 BHK Luxury Apartment', time: '1 day ago', icon: 'heart' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-[#F5F1EB] rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.icon === 'message' && (
                      <svg className="w-5 h-5 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    )}
                    {activity.icon === 'eye' && (
                      <svg className="w-5 h-5 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                    {activity.icon === 'heart' && (
                      <svg className="w-5 h-5 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.property}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
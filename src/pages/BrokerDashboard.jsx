import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';

const BrokerDashboard = () => {
  const { user } = useAuth();
  const { properties } = useProperty();

  // Filter properties listed by brokers
  const myProperties = properties.filter((p) => p.listedBy.role === 'broker').slice(0, 3);
  const activeProperties = myProperties.filter((p) => p.status === 'active');

  const totalViews = myProperties.reduce((sum, p) => sum + p.stats.views, 0);
  const totalInquiries = myProperties.reduce((sum, p) => sum + p.stats.inquiries, 0);
  const commission = 125000; // Mock data

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">
            Broker Dashboard
          </h1>
          <p className="text-gray-600">Manage your listings and track commissions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Listings */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#1B5E20]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Listings</p>
                <p className="text-3xl font-bold text-[#1B5E20]">{myProperties.length}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{activeProperties.length} active</p>
          </div>

          {/* Total Commission */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#2E7D32]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Commission Earned</p>
                <p className="text-3xl font-bold text-[#2E7D32]">₹{commission.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">This month</p>
          </div>

          {/* Client Inquiries */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#388E3C]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Client Inquiries</p>
                <p className="text-3xl font-bold text-[#388E3C]">{totalInquiries}</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#388E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">+18% from last week</p>
          </div>

          {/* Broker Rating */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4CAF50]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Your Rating</p>
                <p className="text-3xl font-bold text-[#4CAF50]">4.8</p>
              </div>
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-[#4CAF50]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Based on 24 reviews</p>
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
                <h3 className="font-bold text-lg">Add New Listing</h3>
                <p className="text-sm text-white/80">List a property</p>
              </div>
            </div>
          </Link>

          <button className="bg-white border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl shadow-md p-6 hover:bg-[#E8F5E9] transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Commission Report</h3>
                <p className="text-sm text-gray-600">View earnings</p>
              </div>
            </div>
          </button>

          <button className="bg-white border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl shadow-md p-6 hover:bg-[#E8F5E9] transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Client Management</h3>
                <p className="text-sm text-gray-600">Manage clients</p>
              </div>
            </div>
          </button>
        </div>

        {/* Assigned Listings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Assigned Listings</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors font-medium">
                All ({myProperties.length})
              </button>
              <button className="px-4 py-2 bg-[#F5F1EB] text-gray-700 rounded-lg hover:bg-[#EBE6DF] transition-colors font-medium">
                Hot Leads (3)
              </button>
            </div>
          </div>

          {myProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProperties.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
                      HOT
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Listings Yet</h3>
              <p className="text-gray-600 mb-6">Start adding properties to build your portfolio!</p>
              <Link to="/list-property" className="px-6 py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors inline-block font-semibold">
                Add First Listing
              </Link>
            </div>
          )}
        </div>

        {/* Commission Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Commission Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-600 font-medium mb-3">This Month</h3>
              <p className="text-3xl font-bold text-[#1B5E20] mb-2">₹ 45,000</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                +25% from last month
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-600 font-medium mb-3">Last Month</h3>
              <p className="text-3xl font-bold text-[#2E7D32] mb-2">₹ 36,000</p>
              <p className="text-sm text-gray-600">3 deals closed</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-600 font-medium mb-3">Total Earned</h3>
              <p className="text-3xl font-bold text-[#388E3C] mb-2">₹ 1,25,000</p>
              <p className="text-sm text-gray-600">Last 6 months</p>
            </div>
          </div>
        </div>

        {/* Recent Deals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Deals</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F1EB]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deal Value</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Commission</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">3 BHK in Gurugram</p>
                      <p className="text-sm text-gray-500">DLF Phase 3</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">Amit Sharma</td>
                    <td className="px-6 py-4 text-gray-900">₹ 85,00,000</td>
                    <td className="px-6 py-4 text-[#1B5E20] font-semibold">₹ 42,500</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Closed
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">2 BHK in Noida</p>
                      <p className="text-sm text-gray-500">Sector 62</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">Priya Singh</td>
                    <td className="px-6 py-4 text-gray-900">₹ 25,000/mo</td>
                    <td className="px-6 py-4 text-[#1B5E20] font-semibold">₹ 12,500</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        In Progress
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">Villa in Jaipur</p>
                      <p className="text-sm text-gray-500">Vaishali Nagar</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">Rahul Verma</td>
                    <td className="px-6 py-4 text-gray-900">₹ 1,25,00,000</td>
                    <td className="px-6 py-4 text-[#1B5E20] font-semibold">₹ 62,500</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        Negotiation
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
import { useState } from 'react';
import { mockCities } from '../../data/mockData';

const PropertyFilters = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-surface rounded-xl shadow-md p-6 mb-6">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-accent text-white rounded-lg mb-4"
      >
        <span className="font-semibold">Filters</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filters */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by City/Locality
          </label>
          <input
            type="text"
            placeholder="Enter city or locality..."
            value={filters.searchQuery || ''}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        {/* City Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <select
            value={filters.city || ''}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">All Cities</option>
            {mockCities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Deal Type Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deal Type</label>
          <div className="flex gap-3">
            <button
              onClick={() => handleFilterChange('dealType', 'all')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.dealType === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-[#F5F1EB] text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('dealType', 'sale')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.dealType === 'sale'
                  ? 'bg-accent text-white'
                  : 'bg-[#F5F1EB] text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => handleFilterChange('dealType', 'rent')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.dealType === 'rent'
                  ? 'bg-accent text-white'
                  : 'bg-[#F5F1EB] text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rent
            </button>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            value={filters.propertyType || 'all'}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* BHK Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">BHK</label>
          <div className="grid grid-cols-5 gap-2">
            {['all', '1', '2', '3', '4+'].map((bhk) => (
              <button
                key={bhk}
                onClick={() => handleFilterChange('bhk', bhk)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  filters.bhk === bhk
                    ? 'bg-accent text-white'
                    : 'bg-[#F5F1EB] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {bhk === 'all' ? 'All' : bhk}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₹)
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        {/* Listed By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Listed By</label>
          <div className="flex gap-3">
            <button
              onClick={() => handleFilterChange('listedBy', 'all')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.listedBy === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-[#F5F1EB] text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('listedBy', 'owner')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.listedBy === 'owner'
                  ? 'bg-accent text-white'
                  : 'bg-[#F5F1EB] text-gray-700 hover:bg-gray-200'
              }`}
            >
              Owner
            </button>
            <button
              onClick={() => handleFilterChange('listedBy', 'broker')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.listedBy === 'broker'
                  ? 'bg-accent text-white'
                  : 'bg-[#F5F1EB] text-gray-700 hover:bg-gray-200'
              }`}
            >
              Broker
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() =>
            onFilterChange({
              city: '',
              dealType: 'all',
              propertyType: 'all',
              bhk: 'all',
              minPrice: '',
              maxPrice: '',
              listedBy: 'all',
              searchQuery: '',
            })
          }
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;
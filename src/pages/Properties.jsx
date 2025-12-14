import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyGrid from '../components/property/PropertyGrid.jsx';
import PropertyFilters from '../components/property/PropertyFilters.jsx';

const Properties = () => {
  const { properties } = useProperty();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    dealType: searchParams.get('dealType') || 'all',
    propertyType: 'all',
    bhk: 'all',
    minPrice: '',
    maxPrice: '',
    listedBy: 'all',
    searchQuery: '',
  });

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...properties];

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.city.toLowerCase().includes(query) ||
          p.locality.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query)
      );
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(
        (p) => p.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Deal type filter
    if (filters.dealType !== 'all') {
      filtered = filtered.filter((p) => p.dealType === filters.dealType);
    }

    // Property type filter
    if (filters.propertyType !== 'all') {
      filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
    }

    // BHK filter
    if (filters.bhk !== 'all') {
      if (filters.bhk === '4+') {
        filtered = filtered.filter((p) => p.beds >= 4);
      } else {
        filtered = filtered.filter((p) => p.beds === parseInt(filters.bhk));
      }
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    // Listed by filter
    if (filters.listedBy !== 'all') {
      filtered = filtered.filter((p) => p.listedBy.role === filters.listedBy);
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  return (
    <div className="min-h-screen bg-beige-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-textc-primary mb-2">
            Explore Properties
          </h1>
          <p className="text-textc-secondary">
            {filteredProperties.length} properties found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <PropertyGrid properties={filteredProperties} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
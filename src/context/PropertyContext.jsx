import { createContext, useContext, useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('useProperty must be used within PropertyProvider');
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    dealType: 'all',
    propertyType: 'all',
    bhk: 'all',
  });

  const fetchProperties = async (filterParams = {}) => {
    setLoading(true);
    try {
      const { data } = await propertyAPI.getAll(filterParams);
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filterParams = {};
    if (filters.city) filterParams.city = filters.city;
    if (filters.dealType !== 'all') filterParams.dealType = filters.dealType;
    if (filters.propertyType !== 'all') filterParams.propertyType = filters.propertyType;
    if (filters.minPrice) filterParams.minPrice = filters.minPrice;
    if (filters.maxPrice) filterParams.maxPrice = filters.maxPrice;
    if (filters.bhk !== 'all') filterParams.beds = filters.bhk;
    if (filters.listedBy !== 'all') filterParams.listedBy = filters.listedBy;
    if (filters.searchQuery) filterParams.searchQuery = filters.searchQuery;

    fetchProperties(filterParams);
  }, [filters]);

  const toggleSave = async (propertyId) => {
    try {
      const { data } = await propertyAPI.toggleSave(propertyId);
      setSavedProperties(data.savedProperties || []);

      setProperties((prev) =>
        prev.map((p) =>
          p._id === propertyId
            ? {
                ...p,
                stats: {
                  ...p.stats,
                  saves: data.savedProperties.includes(propertyId)
                    ? p.stats.saves + 1
                    : p.stats.saves - 1,
                },
              }
            : p
        )
      );
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  const incrementViews = async (propertyId) => {
    // Handled by backend automatically
  };

  const addReview = async (propertyId, reviewData) => {
    try {
      console.log('Review added:', reviewData);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const value = {
    properties,
    savedProperties,
    filters,
    loading,
    setFilters,
    toggleSave,
    incrementViews,
    addReview,
    fetchProperties,
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};
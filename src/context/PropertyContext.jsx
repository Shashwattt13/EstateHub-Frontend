import { createContext, useContext, useState } from 'react';
import { mockProperties } from '../data/mockData';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(mockProperties);
  const [savedProperties, setSavedProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    dealType: 'all',
    propertyType: 'all',
    priceRange: [0, 10000000],
    bhk: 'all',
  });

  const toggleSave = (propertyId) => {
    setSavedProperties(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const incrementViews = (propertyId) => {
    setProperties(prev =>
      prev.map(p =>
        p.id === propertyId
          ? { ...p, stats: { ...p.stats, views: p.stats.views + 1 } }
          : p
      )
    );
  };

  const addReview = (propertyId, review) => {
    setProperties(prev =>
      prev.map(p =>
        p.id === propertyId
          ? { ...p, reviews: [...p.reviews, review] }
          : p
      )
    );
  };

  const value = {
    properties,
    savedProperties,
    filters,
    setFilters,
    toggleSave,
    incrementViews,
    addReview,
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};
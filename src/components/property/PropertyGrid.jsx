import PropertyCard from './PropertyCard';
import EmptyState from '../common/EmptyState';
import { Link } from 'react-router-dom';

const PropertyGrid = ({ properties, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-surface rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-56 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        message="We couldn't find any properties matching your criteria. Try adjusting your filters or search in a different location."
        action={
          <Link
            to="/properties"
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            View All Properties
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import PropertyGrid from '../components/property/PropertyGrid';
import EmptyState from '../components/common/EmptyState';
import { Link, useNavigate } from 'react-router-dom';

const Saved = () => {
  const { properties, savedProperties } = useProperty();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-textc-primary mb-4">Login Required</h2>
          <p className="text-textc-secondary mb-6">Please login to view your saved properties</p>
          <Link
            to="/auth"
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  const savedPropertiesList = properties.filter((p) => savedProperties.includes(p.id));

  return (
    <div className="min-h-screen bg-beige-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textc-primary mb-2">Saved Properties</h1>
          <p className="text-textc-secondary">
            {savedPropertiesList.length} {savedPropertiesList.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {/* Properties Grid */}
        {savedPropertiesList.length > 0 ? (
          <PropertyGrid properties={savedPropertiesList} />
        ) : (
          <EmptyState
            title="No Saved Properties"
            message="You haven't saved any properties yet. Start exploring and save your favorite properties to view them here."
            action={
              <Link
                to="/properties"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
              >
                Explore Properties
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Saved;
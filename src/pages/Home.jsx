import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyGrid from '../components/property/PropertyGrid';

const Home = () => {
  const navigate = useNavigate();

  // Get properties + loading from PropertyContext
  const { properties, loading } = useProperty();

  const [searchCity, setSearchCity] = useState('');
  const [searchDealType, setSearchDealType] = useState('sale');

  // Correct featured properties
  const featuredProperties =
    properties && properties.length > 0 ? properties.slice(0, 6) : [];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties?city=${searchCity}&dealType=${searchDealType}`);
  };

  const trendingCities = [
    { name: 'Gurugram', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400' },
    { name: 'Noida', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400' },
    { name: 'Chandigarh', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400' },
    { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400' },
    { name: 'Lucknow', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400' },
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400' },
  ];

  // 🔥 Show loading state WHILE backend data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Loading properties...
      </div>
    );
  }

  return (
    <div>

      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] bg-center bg-cover bg-no-repeat flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1635108201747-976f7d4ba453?q=80&w=2070&auto=format&fit=crop)"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md">
              Discover the perfect property across North India and major metros
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

              {/* City */}
              <div className="md:col-span-5">
                <label className="block text-sm font-bold text-white mb-2">Select City</label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-900 font-medium"
                >
                  <option value="">All Cities</option>
                  <option value="gurugram">Gurugram</option>
                  <option value="noida">Noida</option>
                  <option value="delhi">Delhi NCR</option>
                  <option value="chandigarh">Chandigarh</option>
                  <option value="jaipur">Jaipur</option>
                  <option value="lucknow">Lucknow</option>
                  <option value="mumbai">Mumbai</option>
                </select>
              </div>

              {/* Buy / Rent */}
              <div className="md:col-span-4">
                <label className="block text-sm font-bold text-white mb-2">I want to</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchDealType('sale')}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      searchDealType === 'sale'
                        ? 'bg-green-700 text-white shadow-md'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchDealType('rent')}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      searchDealType === 'rent'
                        ? 'bg-green-700 text-white shadow-md'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    Rent
                  </button>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-3 flex items-end">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-all font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </button>
              </div>

            </div>
          </form>

        </div>
      </section>

      {/* Trending Cities */}
      <section className="py-16 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-textc-primary mb-8 text-center">
            Explore Trending Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingCities.map((city) => (
              <Link
                key={city.name}
                to={`/properties?city=${city.name.toLowerCase()}`}
                className="group relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold text-lg">{city.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-textc-primary">Featured Properties</h2>
            <Link
              to="/properties"
              className="text-primary hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* 🔥 FIXED: Now shows real properties from backend */}
          <PropertyGrid properties={featuredProperties} />
        </div>
      </section>
    </div>
  );
};

export default Home;

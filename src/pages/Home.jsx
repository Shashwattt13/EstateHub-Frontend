import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyGrid from '../components/property/PropertyGrid';
import { mockCities } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const { properties } = useProperty();
  const [searchCity, setSearchCity] = useState('');
  const [searchDealType, setSearchDealType] = useState('sale');

  const featuredProperties = properties.slice(0, 6);

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

  return (
    <div>
{/* Hero Section – FULL BACKGROUND IMAGE */}
<section
  className="relative w-full h-[90vh] bg-center bg-cover bg-no-repeat flex items-center"
  style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1635108201747-976f7d4ba453?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
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
      <div className="bg-white/0 backdrop-blur-0 border-none shadow-none">



        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* City Dropdown */}
          <div className="md:col-span-5">
           <label className="block text-sm font-bold text-white mb-2">

              Select City
            </label>
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

          {/* Buy/Rent Toggle */}
          <div className="md:col-span-4">
            <label className="block text-sm font-bold text-white mb-2">

              I want to
            </label>
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
          <PropertyGrid properties={featuredProperties} />
        </div>
      </section>

      {/* Why EstateHub Section */}
      <section className="py-16 bg-beige-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-textc-primary mb-12 text-center">
            Why Choose EstateHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-textc-secondary">
                All properties are verified by our team for authenticity and accuracy
              </p>
            </div>

            <div className="bg-surface rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-textc-secondary">
                Connect directly with owners and verified brokers for seamless transactions
              </p>
            </div>

            <div className="bg-surface rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-textc-secondary">
                Find your perfect property in minutes with our advanced search filters
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const citiesRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // ✅ FIXED: role → dashboard URL (matches App.jsx)
  const getDashboardPath = () => {
    if (user?.role === 'owner') return '/dashboard/owner';
    if (user?.role === 'broker') return '/dashboard/broker';
    return '/dashboard/customer'; // default for buyer/customer
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (citiesRef.current && !citiesRef.current.contains(event.target)) {
        setIsCitiesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cityGroups = {
    'Delhi NCR': ['Delhi NCR', 'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad'],
    Punjab: ['Chandigarh', 'Mohali', 'Zirakpur', 'Ludhiana', 'Amritsar', 'Jalandhar'],
    'Other Cities': ['Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Jaipur', 'Lucknow'],
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#1B5E20]/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-xl tracking-tight">E</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#1B5E20] transition-colors">
              EstateHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/properties"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/properties')
                  ? 'bg-[#1B5E20] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Properties
            </Link>

            {/* Cities Dropdown */}
            <div className="relative" ref={citiesRef}>
              <button
                onClick={() => setIsCitiesOpen((prev) => !prev)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1"
              >
                Cities
                <svg
                  className={`w-4 h-4 transition-transform ${isCitiesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCitiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 max-h-80 overflow-y-auto">
                  {Object.entries(cityGroups).map(([region, cities]) => (
                    <div key={region} className="mb-3 last:mb-0">
                      <h3 className="text-xs font-semibold text-[#1B5E20] uppercase mb-1.5 px-2 tracking-wide">
                        {region}
                      </h3>
                      <div className="space-y-0.5">
                        {cities.map((city) => (
                          <Link
                            key={city}
                            to={`/properties?city=${city.toLowerCase()}`}
                            onClick={() => setIsCitiesOpen(false)}
                            className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            {city}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated && (user?.role === 'owner' || user?.role === 'broker') && (
              <Link
                to="/list-property"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/list-property')
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                List Property
              </Link>
            )}

            {isAuthenticated && (
              <Link
                to="/saved"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/saved')
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Saved
              </Link>
            )}
          </div>

          {/* Auth (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all"
                >
                  <img
                    src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border-2 border-[#1B5E20]"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-900 leading-tight">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {user?.role || 'customer'}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 py-2">
                    <div className="px-4 pb-2 border-b border-slate-200 mb-2">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user?.email || 'user@gmail.com'}
                      </p>
                    </div>

                    {/* OPEN DASHBOARD BUTTON */}
                    <button
                      onClick={() => {
                        navigate(getDashboardPath());
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-[#1B5E20] hover:bg-[#E7F3EA] flex items-center gap-2"
                    >
                      <span>🧭 Open Dashboard</span>
                    </button>

                    <Link
                      to="/saved"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      Saved Properties
                    </Link>

                    <hr className="my-2 border-slate-200" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2.5 bg-[#1B5E20] text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-[#2E7D32] hover:shadow-md transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-sm">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
            >
              Properties
            </Link>

            <Link
              to="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
            >
              Browse Cities
            </Link>

            {isAuthenticated && (user?.role === 'owner' || user?.role === 'broker') && (
              <Link
                to="/list-property"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
              >
                List Property
              </Link>
            )}

            {isAuthenticated && (
              <button
                onClick={() => {
                  navigate(getDashboardPath());
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-800 hover:bg-[#E7F3EA] font-medium"
              >
                🧭 Open Dashboard
              </button>
            )}

            {isAuthenticated ? (
              <div className="border-t border-slate-200 pt-3 mt-3">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 bg-[#1B5E20] text-white rounded-lg text-center hover:bg-[#2E7D32] mt-3 font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

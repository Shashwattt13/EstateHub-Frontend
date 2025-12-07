import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Auth from './pages/Auth';
import Saved from './pages/Saved';
import ListProperty from './pages/ListProperty';
import NotFound from './pages/NotFound';

import CustomerDashboard from './pages/CustomerDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import BrokerDashboard from './pages/BrokerDashboard';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/list-property" element={<ListProperty />} />

              {/* Dashboards */}
              <Route path="/dashboard/customer" element={<CustomerDashboard />} />
              <Route path="/dashboard/owner" element={<OwnerDashboard />} />
              <Route path="/dashboard/broker" element={<BrokerDashboard />} />

              {/* 404 - keep this last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;

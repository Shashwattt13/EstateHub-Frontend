import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { propertyAPI } from '../services/api';
import { mockCities, mockAmenities } from '../data/mockData';

const ListProperty = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [step, setStep] = useState(1);

  // toast: { type: 'success' | 'error', message: string } | null
  const [toast, setToast] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    dealType: 'sale',
    propertyType: 'Apartment',
    beds: 2,
    baths: 2,
    area: '',
    city: '',
    locality: '',
    address: '',
    pincode: '',
    furnishing: 'Unfurnished',
    amenities: [],
    highlights: '',
    description: '',
  });

  // images (File objects)
  const [imageFiles, setImageFiles] = useState([]); // min 1, max 3

  // ---------- ACCESS CONTROL ----------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-textc-primary mb-4">Login Required</h2>
          <p className="text-textc-secondary mb-6">Please login to list your property</p>
          <button
            onClick={() => navigate('/auth')}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  if (user?.role === 'customer') {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-textc-primary mb-4">Access Denied</h2>
          <p className="text-textc-secondary mb-6">Only owners and brokers can list properties</p>
          <button
            onClick={() => navigate('/properties')}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  // ---------- HELPERS ----------
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2500);
  };

  const getDashboardRoute = () => {
    if (user?.role === 'owner') return '/dashboard/owner';
    if (user?.role === 'broker') return '/dashboard/broker';
    return '/dashboard/customer';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // image input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setImageFiles([]);
      return;
    }

    if (files.length > 3) {
      showToast('error', 'You can upload a maximum of 3 images.');
      return;
    }

    setImageFiles(files);
  };

  // ✅ validate fields of a given step before moving forward / finishing
  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.title || !formData.price) return false;
      return true; // description optional
    }

    if (currentStep === 2) {
      if (!formData.beds || !formData.baths || !formData.area || !formData.furnishing) return false;
      return true;
    }

    if (currentStep === 3) {
      if (!formData.city || !formData.locality || !formData.address || !formData.pincode) return false;
      return true;
    }

    if (currentStep === 4) {
      // require at least 1 amenity
      if (formData.amenities.length === 0) return false;
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      showToast('error', 'Please fill all required fields for this step.');
      return;
    }
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // final validation on step 4
    if (!validateStep(4)) {
      showToast('error', 'Please select at least one amenity before listing your property.');
      return;
    }

    // image validation
    if (imageFiles.length === 0) {
      showToast('error', 'Please upload at least one property image.');
      return;
    }

    if (imageFiles.length > 3) {
      showToast('error', 'You can upload a maximum of 3 images.');
      return;
    }

    // Build FormData for multipart/form-data
    const formDataToSend = new FormData();

    // text fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('dealType', formData.dealType);
    formDataToSend.append('propertyType', formData.propertyType);
    formDataToSend.append('beds', formData.beds);
    formDataToSend.append('baths', formData.baths);
    formDataToSend.append('area', formData.area);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('locality', formData.locality);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('pincode', formData.pincode);
    formDataToSend.append('furnishing', formData.furnishing);
    formDataToSend.append('description', formData.description || '');

    // highlights textarea -> backend will split by newline
    formDataToSend.append('highlights', formData.highlights || '');

    // amenities array (append each)
    formData.amenities.forEach((amenity) => {
      formDataToSend.append('amenities', amenity);
    });

    // images (files)
    imageFiles.forEach((file) => {
      formDataToSend.append('images', file);
    });

    setSubmitting(true);

    try {
      const { data } = await propertyAPI.create(formDataToSend);

      if (!data?.success) {
        throw new Error(data?.message || 'Failed to list property');
      }

      showToast('success', 'Property listed successfully!');

      setTimeout(() => {
        navigate(getDashboardRoute());
      }, 1500);
    } catch (err) {
      console.error('Error listing property:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong while listing your property.';
      showToast('error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-beige-light py-8 relative">
      {/* Toast bottom-right */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white z-50 ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top back button (to previous page) */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-textc-secondary hover:text-textc-primary flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textc-primary mb-2">List Your Property</h1>
          <p className="text-textc-secondary">Fill in the details to list your property</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s <= step ? 'bg-accent text-white' : 'bg-gray-200 text-textc-secondary'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${s < step ? 'bg-accent' : 'bg-gray-200'}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-textc-secondary">Basic Info</span>
            <span className="text-sm text-textc-secondary">Property Details</span>
            <span className="text-sm text-textc-secondary">Location</span>
            <span className="text-sm text-textc-secondary">Amenities & Photos</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-surface rounded-xl shadow-md p-6">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-textc-primary mb-4">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., 3 BHK Luxury Apartment in Gurugram"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deal Type</label>
                  <select
                    name="dealType"
                    value={formData.dealType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) {formData.dealType === 'rent' && '/month'}
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: Property Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-textc-primary mb-4">Property Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    name="baths"
                    value={formData.baths}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sqft)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g., 1850"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully-Furnished">Fully-Furnished</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Highlights (one per line)
                </label>
                <textarea
                  name="highlights"
                  value={formData.highlights}
                  onChange={handleChange}
                  placeholder={'Spacious balcony\nModular kitchen\nNear metro station'}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-textc-primary mb-4">Location Details</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                >
                  <option value="">Select City</option>
                  {mockCities.map((city) => (
                    <option key={city.value} value={city.label}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Locality</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="e.g., DLF Phase 3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g., 122002"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 4: Amenities + Images */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-textc-primary mb-4">Amenities & Photos</h2>

              {/* Amenities */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Select Amenities <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        value={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-accent"
                      />
                      <span className="text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-textc-primary mb-2">
                  Property Photos (min 1, max 3) <span className="text-red-500">*</span>
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-700
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-[#1B5E20] file:text-white
                             hover:file:bg-[#2E7D32]"
                />
                {imageFiles.length > 0 && (
                  <p className="text-sm text-textc-secondary mt-2">
                    Selected {imageFiles.length} image(s).
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, WEBP. Max 3 images.
                </p>
              </div>

              <div className="bg-beige-dark border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You can always edit details or update photos later from your
                  dashboard.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-beige-dark">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-beige-light transition-colors font-medium"
                disabled={submitting}
              >
                Back
              </button>
            ) : (
              <span />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] shadow-sm transition-colors font-medium"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="ml-auto px-6 py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] shadow-sm transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? 'Listing...' : 'Done'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListProperty;

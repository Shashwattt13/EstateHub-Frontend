import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { propertyAPI } from '../services/api';
import PropertyGallery from '../components/property/PropertyGallery';
import ReviewsList from '../components/property/ReviewsList';
import AddReviewModal from '../components/property/AddReviewModal';
import { formatPrice, calculateAverageRating } from '../utils/formatters';

const PropertyDetails = () => {
  const { id } = useParams(); // MongoDB _id in URL
  const navigate = useNavigate();

  const { addReview, toggleSave, savedProperties } = useProperty();
  const { isAuthenticated, user } = useAuth();

  const [property, setProperty] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);

  // quick enquiry form state
  const [enquiry, setEnquiry] = useState({
    name: '',
    phone: '',
    message: '',
  });

  // chat modal state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // ✅ Fetch property from backend by ID
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await propertyAPI.getOne(id); // GET /api/properties/:id
        if (!data?.success || !data.property) {
          navigate('/properties');
          return;
        }
        setProperty(data.property);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } catch (error) {
        console.error('Error loading property:', error);
        navigate('/properties');
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleAddReview = (reviewData) => {
    const newReview = {
      userId: user?._id || 'guest',
      userName: user?.name || 'Guest User',
      userAvatar: user?.avatar || 'https://i.pravatar.cc/150?img=1',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString(),
    };
    // demo only – your addReview in context is stub
    addReview(id, newReview);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    toggleSave(id); // backend uses /properties/:id/save
  };

  const handleChatOpen = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (chatMessages.length === 0 && property?.listedBy?.name) {
      setChatMessages([
        {
          from: 'owner',
          text: `Hi ${user?.name || 'there'}, thanks for your interest in "${property.title}". How can I help you?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }

    setIsChatOpen(true);
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { from: 'me', text, time }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          from: 'owner',
          text: 'Thanks for your message. This is a demo chat, Replies will come when they are active.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    console.log('Quick enquiry submitted:', {
      propertyId: id,
      ...enquiry,
    });

    alert('Your enquiry has been sent to the owner/broker (demo).');

    setEnquiry({
      name: '',
      phone: '',
      message: '',
    });
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  // ✅ Use backend IDs + safe fallbacks
  const isSaved = savedProperties.includes(id); // savedProperties contains propertyId
  const reviews = property.reviews || [];
  const avgRating = calculateAverageRating(reviews);

  return (
    <div className="min-h-screen bg-beige-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-textc-secondary hover:text-textc-primary mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images || []} />

            {/* Title and Address */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-textc-primary mb-2">{property.title}</h1>
                  <div className="flex items-center text-textc-secondary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{property.address}</span>
                  </div>
                </div>
                {property.listedBy?.verified && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-textc-primary">
                  {formatPrice(property.price)}
                </span>
                {property.dealType === 'rent' && (
                  <span className="text-xl text-textc-secondary">/month</span>
                )}
              </div>
              {property.dealType === 'sale' && (
                <p className="text-sm text-gray-500">
                  EMI starts at ₹ {Math.round(property.price / 240).toLocaleString('en-IN')}/month
                </p>
              )}
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface rounded-xl p-6 shadow-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{property.beds}</div>
                <div className="text-textc-secondary text-sm">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{property.baths}</div>
                <div className="text-textc-secondary text-sm">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{property.area}</div>
                <div className="text-textc-secondary text-sm">Sqft</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1 capitalize">
                  {property.furnishing?.split('-')[0]}
                </div>
                <div className="text-textc-secondary text-sm">Furnishing</div>
              </div>
            </div>

            {/* About Property */}
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-textc-primary mb-4">About Property</h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {property.description ||
                    `This beautiful ${property.beds} BHK ${property.propertyType?.toLowerCase()} is available for ${
                      property.dealType
                    } in ${property.locality}, ${property.city}. Spanning ${property.area} sqft, this property offers modern amenities and excellent connectivity.`}
                </p>
                {property.highlights && property.highlights.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-textc-primary mb-3">Property Highlights</h3>
                    <ul className="space-y-2">
                      {property.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-textc-primary mb-4">Amenities</h2>
              {property.amenities && property.amenities.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-beige-light rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-textc-secondary">No amenities listed.</p>
              )}
            </div>

            {/* Location */}
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-textc-primary mb-4">Location</h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <p className="text-gray-500">Map will be integrated here</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {property.locality}, {property.city} - {property.pincode}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-surface rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-textc-primary">Ratings & Reviews</h2>
                  {reviews.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(avgRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                            fill={star <= Math.round(avgRating) ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="text-textc-secondary">
                        {avgRating} ({reviews.length} reviews)
                      </span>
                    </div>
                  )}
                </div>
                {isAuthenticated && (
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors font-medium"
                  >
                    Write Review
                  </button>
                )}
              </div>
              <ReviewsList reviews={reviews} />
            </div>
          </div>

          {/* Sticky Contact Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Contact Card */}
              <div className="bg-surface rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={property.listedBy?.avatar}
                    alt={property.listedBy?.name || 'Owner'}
                    className="w-16 h-16 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-textc-primary">
                      {property.listedBy?.name || 'Owner / Broker'}
                    </h3>
                    <p className="text-sm text-textc-secondary capitalize">
                      {property.listedBy?.role || 'owner'}
                    </p>
                    {property.listedBy?.role === 'broker' && property.listedBy?.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm text-textc-secondary">{property.listedBy.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {showContactDetails && property.listedBy?.phone ? (
                    <div className="p-4 bg-beige-dark rounded-lg">
                      <p className="text-sm text-textc-secondary mb-2">Contact Number:</p>
                      <a
                        href={`tel:${property.listedBy.phone}`}
                        className="text-lg font-semibold text-primary hover:text-blue-700"
                      >
                        {property.listedBy.phone}
                      </a>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          navigate('/auth');
                          return;
                        }
                        setShowContactDetails(true);
                      }}
                      className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors font-semibold"
                    >
                      Get Contact Details
                    </button>
                  )}

                  <button
                    onClick={handleChatOpen}
                    className="w-full px-6 py-3 border-2 border-accent text-primary rounded-lg hover:bg-beige-dark transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    Chat Now
                  </button>

                  <button
                    onClick={handleSave}
                    className={`w-full px-6 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 ${
                      isSaved
                        ? 'bg-red-50 text-red-600 border-2 border-red-600 hover:bg-red-100'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-beige-light'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={isSaved ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {isSaved ? 'Saved' : 'Save Property'}
                  </button>
                </div>

                {/* Quick Enquiry Form */}
                <div className="mt-6 pt-6 border-t border-beige-dark">
                  <h4 className="font-semibold text-textc-primary mb-3">Quick Enquiry</h4>
                  <form className="space-y-3" onSubmit={handleEnquirySubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={enquiry.name}
                      onChange={handleEnquiryChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={enquiry.phone}
                      onChange={handleEnquiryChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows={3}
                      value={enquiry.message}
                      onChange={handleEnquiryChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm resize-none"
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      Send Enquiry
                    </button>
                  </form>
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-surface rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-textc-primary mb-4">Property Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textc-secondary flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Views
                    </span>
                    <span className="font-semibold text-textc-primary">{property.stats?.views ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-textc-secondary flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Saves
                    </span>
                    <span className="font-semibold text-textc-primary">{property.stats?.saves ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-textc-secondary flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      Inquiries
                    </span>
                    <span className="font-semibold text-textc-primary">
                      {property.stats?.inquiries ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleAddReview}
      />

      {/* CHAT MODAL */}
      {isChatOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            onClick={() => setIsChatOpen(false)}
          />

          {/* chat box */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col h-[70vh] relative">
              {/* header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    src={property.listedBy?.avatar}
                    alt={property.listedBy?.name || 'Owner'}
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover bg-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {property.listedBy?.name || 'Owner / Broker'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {property.listedBy?.role || 'owner'} • {property.city}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate max-w-xs">
                      Regarding: {property.title}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* messages area */}
              <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
                {chatMessages.length === 0 && (
                  <p className="text-center text-sm text-gray-400 mt-10">
                    Start the conversation by sending a message.
                  </p>
                )}

                <div className="space-y-2">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.from === 'me' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs rounded-2xl px-3 py-2 text-sm ${
                          msg.from === 'me'
                            ? 'bg-[#1B5E20] text-white rounded-br-sm'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-[10px] opacity-70 mt-1 text-right">
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* input area */}
              <form onSubmit={handleChatSend} className="border-t border-gray-200 px-4 py-3 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B5E20] text-white text-sm font-semibold rounded-lg hover:bg-[#2E7D32] disabled:opacity-60"
                    disabled={!chatInput.trim()}
                  >
                    Send
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  messages are not saved permanently.
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyDetails;

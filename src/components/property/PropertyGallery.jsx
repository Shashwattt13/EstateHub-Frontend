import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || 'http://localhost:5000';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
};

const PropertyGallery = ({ images }) => {
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasImages = validImages.length > 0;

  const nextImage = () => {
    if (!hasImages) return;
    setSelectedImage((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    if (!hasImages) return;
    setSelectedImage((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  // If no images, show placeholder
  if (!hasImages) {
    return (
      <div className="h-96 md:h-[500px] rounded-xl bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-4-10H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2z"
            />
          </svg>
          <p>No images available for this property.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden group">
          <img
            src={getImageUrl(validImages[selectedImage])}
            alt={`Property ${selectedImage + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />

          {/* Navigation Arrows */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/90 rounded-full flex items-center justify-center shadow-lg hover:bg-surface transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/90 rounded-full flex items-center justify-center shadow-lg hover:bg-surface transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
            {selectedImage + 1} / {validImages.length}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full hover:bg-black/80 transition-colors"
          >
            View Fullscreen
          </button>
        </div>

        {/* Thumbnails */}
        {validImages.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {validImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-4 ring-blue-600' : 'ring-2 ring-gray-200'
                }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-surface/20 hover:bg-surface/30 rounded-full flex items-center justify-center text-white z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative h-full flex items-center justify-center">
            <img
              src={getImageUrl(validImages[selectedImage])}
              alt={`Property ${selectedImage + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {validImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 w-12 h-12 bg-surface/20 hover:bg-surface/30 rounded-full flex items-center justify-center text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 w-12 h-12 bg-surface/20 hover:bg-surface/30 rounded-full flex items-center justify-center text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-surface/20 text-white rounded-full">
              {selectedImage + 1} / {validImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;

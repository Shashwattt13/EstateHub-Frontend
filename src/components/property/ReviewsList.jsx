import { useState } from 'react';
import { formatDate } from '../../utils/formatters';

const ReviewsList = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            fill={star <= rating ? 'currentColor' : 'none'}
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
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No reviews yet. Be the first to review this property!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {displayedReviews.map((review, index) => (
        <div key={index} className="bg-beige-light rounded-lg p-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />

            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-textc-primary">{review.userName}</h4>
                  <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 text-primary font-medium hover:bg-beige-dark rounded-lg transition-colors"
        >
          {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  );
};

export default ReviewsList;
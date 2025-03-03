// app/properties/[id]/components/Reviews.js
"use client"; // Required for interactivity (e.g., useState)
import { useState } from 'react';
import styles from './styles/Reviews.module.css';
import { FaStar } from 'react-icons/fa';

export default function Reviews({ reviews: initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ text: '', author: '', rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.text && newReview.author && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ text: '', author: '', rating: 0 }); // Reset form
    } else {
      alert('Please fill out all fields and select a rating.');
    }
  };

  // Handle rating selection
  const handleRating = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.reviewsTitle}>Reviews</h2>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label htmlFor="author">Your Name:</label>
          <input
            type="text"
            id="author"
            value={newReview.author}
            onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="text">Your Review:</label>
          <textarea
            id="text"
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Rating:</label>
          <div className={styles.rating}>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className={styles.star}
                  color={ratingValue <= (hoverRating || newReview.rating) ? '#ffc107' : '#e4e5e9'}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRating(ratingValue)}
                />
              );
            })}
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.reviewHeader}>
              <p className={styles.reviewAuthor}>{review.author}</p>
              <div className={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                  />
                ))}
              </div>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        ))
      ) : (
        <p className={styles.noReviews}>No reviews yet.</p>
      )}
    </div>
  );
}
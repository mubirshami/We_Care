import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './viewreviews.module.css';
import AdminPanel from './adminpanel';
import { useNavigate } from 'react-router-dom';

const ViewReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin');
    if (!token) {
      navigate('/signin');
    }
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/review/getall');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleRespond = async (reviewId, response) => {
    try {
      await axios.put(`http://localhost:3000/review/respond/${reviewId}`, { adminresponse: response });
      fetchReviews(); // Refresh the reviews after responding
    } catch (error) {
      console.error('Error responding to review:', error);
    }
  };

  const handleUpdateResponse = async (reviewId, updatedResponse) => {
    try {
      await axios.put(`http://localhost:3000/review/update-response/${reviewId}`, { adminresponse: updatedResponse });
      fetchReviews(); // Refresh the reviews after updating the response
      setSelectedReviewId(null); // Reset selected review ID
    } catch (error) {
      console.error('Error updating response:', error);
    }
  };

  const showUpdateButton = (reviewId) => {
    setSelectedReviewId(reviewId);
  };

  const cancelUpdate = () => {
    setSelectedReviewId(null);
  };

  return (
    <div className={styles.container}>
      <AdminPanel />
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review._id} className={styles.reviewItem}>
              <div className={styles.userInfo}>
                <span className={styles.username}>{review.userid && review.userid.name}</span>
                <span className={styles.rating}>{review.rating}/5</span>
              </div>
              <p className={styles.description}>{review.description}</p>
              {review.adminresponse ? (
                <div className={styles.response}>
                  Admin Response:
                  {selectedReviewId === review._id ? (
                    <div>
                      <textarea
                        className={styles.responseInput}
                        value={review.adminresponse}
                        onChange={(e) => {
                          const updatedResponse = e.target.value;
                          setReviews((prevReviews) =>
                            prevReviews.map((prevReview) =>
                              prevReview._id === review._id ? { ...prevReview, adminresponse: updatedResponse } : prevReview
                            )
                          );
                        }}
                      />
                      <button
                        className={styles.updateButton}
                        onClick={() => handleUpdateResponse(review._id, review.adminresponse)}
                      >
                        Update
                      </button>
                      <button className={styles.cancelButton} onClick={cancelUpdate}>    
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{review.adminresponse}</span>
                      <button className={styles.updateButton} onClick={() => showUpdateButton(review._id)}>
                        Update
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className={styles.respondButton}
                  onClick={() => {
                    const response = prompt('Enter your response:');
                    if (response) {
                      handleRespond(review._id, response);
                    }
                  }}
                >
                  Respond
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ViewReviews;

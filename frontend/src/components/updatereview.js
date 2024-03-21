import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./updatereviews.module.css";
import { useNavigate } from "react-router-dom";

function UpdateReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [jwttoken, setJWTtoken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updatedReview, setUpdatedReview] = useState("");
  const [updatedRating, setUpdatedRating] = useState(1);
  const [selectedReviewId, setSelectedReviewId] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
    setJWTtoken(token);
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    fetchReviews(config);
    checkReviewStatus(config);
  }, []);

  const fetchReviews = async (config) => {
    try {
      const response = await axios.get("http://localhost:3000/review/get", config);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const checkReviewStatus = async (config) => {
    try {
      const response = await axios.get("http://localhost:3000/review/check", config);
      setHasReviewed(response.data.hasReviewed);
      if (!response.data.hasReviewed) {
        navigate("/addreview");
      }
    } catch (error) {
      console.error("Error checking review status:", error);
    }
  };

  const openModal = (id, description, rating) => {
    setSelectedReviewId(id);
    setUpdatedReview(description);
    setUpdatedRating(rating);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleUpdate = async () => {
    let updatedData = {
      description: updatedReview,
      rating: updatedRating,
      adminresponse: "", // Set adminresponse to empty when updating the review
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/review/update/${selectedReviewId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + jwttoken,
          },
        }
      );

      const updatedReviews = reviews.map((review) => {
        if (review._id === selectedReviewId) {
          return response.data;
        } else {
          return review;
        }
      });

      setReviews(updatedReviews);
      closeModal();
      alert("Review updated successfully!");
    } catch (error) {
      console.log(error.response);
      alert("Failed to update review.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Reviews</h1>
      {hasReviewed ? (
        <ul className={styles.review_list}>
          {reviews.map((review) => (
            <li key={review._id} className={styles.review_item}>
              <div className={styles.review_content}>{review.description}</div>
              <div className={styles.review_rating}>Rating: {review.rating}</div>
              {review.adminresponse.trim() !== "" && (
                <div className={styles.admin_response}>
                  Admin Response: {review.adminresponse}
                </div>
              )}
              <div className={styles.review_actions}>
                <button
                  className={styles.update_button}
                  onClick={() => openModal(review._id, review.description, review.rating)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>You haven't written any reviews yet.</p>
          <button onClick={() => navigate("/addreview")}>Write a Review</button>
        </div>
      )}
      {showModal && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <h2>Update Review</h2>
            <label>
              Description:
              <input
                type="text"
                value={updatedReview}
                onChange={(e) => setUpdatedReview(e.target.value)}
              />
            </label>
            <label>
              Rating:
              <select value={updatedRating} onChange={(e) => setUpdatedRating(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateReviews;

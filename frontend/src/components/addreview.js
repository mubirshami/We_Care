import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./addreview.module.css";

const AddReview = () => {
    const navigate=useNavigate();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [jwttoken,setJWTtoken]=useState("");

  useEffect(()=>{
    const token=localStorage.getItem('TOKEN');
    setJWTtoken(token)
    if(!token){
        navigate('/signin')
    }
},[]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    let config = {
        headers: {
          'Authorization': 'Bearer ' + jwttoken
        }
      }
      console.log(config);
    
    try {
      await axios.post('http://localhost:3000/review/add', {
        description:description,
        rating:rating
      },config);
      alert('Review submitted successfully!');
      navigate('/home');
    } catch (error) {
      console.log(error);
      alert('Failed to submit review.');
    }
  };

  return (
    <div className={styles.reviewForm}>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(description) => setDescription(description.target.value)}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(rating) => setRating(parseInt(rating.target.value))}
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./addvideo.module.css";
import AdminPanel from "./adminpanel";
import { useNavigate } from "react-router-dom";

function AddVideo() {
  const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token=localStorage.getItem('admin');
          if(!token){
              navigate('/signin')
          }
    axios
      .get("http://localhost:3000/videos/getcategory")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "url") {
      setUrl(value);
    } else if (name === "categoryId") {
      setCategoryId(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!url.trim()) {
      errors.url = "This field is required";
    }

    if (!categoryId.trim()) {
      errors.categoryId = "This field is required";
    }

    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:3000/videos/videourl", { url, categoryid: categoryId })
        .then((response) => {
          console.log(response);
          alert("Video posted successfully");
        })
        .catch((error) => console.log(error));
    }

    setErrors(errors);
  };

  return (
    <div className={styles.formContainer}>
      <AdminPanel></AdminPanel>
      <h1>Post a Video</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Video URL:</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleInputChange}
            className={styles.input}
          />
          {errors.url && <span className={styles.error}>{errors.url}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Select Category:</label>
          <select
            name="categoryId"
            value={categoryId}
            onChange={handleInputChange}
            className={styles.input}
          >
            <option value="">--Select a Category--</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className={styles.error}>{errors.categoryId}</span>}
        </div>
        <button type="submit" className={styles.button}>Post</button>
      </form>
    </div>
  );
}

export default AddVideo;

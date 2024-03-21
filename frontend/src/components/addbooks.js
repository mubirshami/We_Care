import axios from "axios";
import { useState } from "react";
import styles from "./addbooks.module.css";
import AdminPanel from "./adminpanel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddBooks() {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const token=localStorage.getItem('admin');
          if(!token){
              navigate('/signin')
          }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/books/bookdata", {
        name,
        url,
      });
      console.log(response.data);
      alert("Book added successfully!");
      setName("");
      setUrl("");
    } catch (error) {
      console.log(error);
      alert("Error adding book.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <AdminPanel></AdminPanel>
      <h1 className={styles.formTitle}>Add a Book</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Book Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="url" className={styles.formLabel}>Book URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <button type="submit" className={styles.formButton}>Submit</button>
      </form>
    </div>
  );
}

export default AddBooks;

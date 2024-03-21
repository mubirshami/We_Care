import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./adminpanel.module.css"

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isBooksOpen, setBooksOpen] = useState(false);
  const [isVideosOpen, setVideosOpen] = useState(false);

  const handleBooksClick = () => {
    setBooksOpen(!isBooksOpen);
  };

  const handleVideosClick = () => {
    setVideosOpen(!isVideosOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log('Logged out');
    navigate('/signin');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Panel</h2>
      <nav className={styles.menu}>
        <ul>
          <li className={`${styles.menuItem} ${styles.booksItem}`} onClick={handleBooksClick}>
            <span>Books</span>
            {isBooksOpen && (
              <ul className={styles.dropdown}>
                <li>
                  <Link to="/addbooks">Add Book</Link>
                </li>
                <li>
                  <Link to="/deletebooks">Update Book</Link>
                </li>
              </ul>
            )}
          </li>
          <li className={`${styles.menuItem} ${styles.videosItem}`} onClick={handleVideosClick}>
            <span>Videos</span>
            {isVideosOpen && (
              <ul className={styles.dropdown}>
                <li>
                  <Link to="/addvideos">Add Video</Link>
                </li>
                <li>
                  <Link to="/deletevideos">Delete Video</Link>
                </li>
              </ul>
            )}
          </li>
          <li className={`${styles.menuItem} ${styles.reviewsItem}`}>
            <Link to="/viewreviews">Reviews</Link>
          </li>
          <li className={`${styles.menuItem} ${styles.usersItem}`}>
            <Link to="/viewusers">Users</Link>
          </li>
          <li className={`${styles.menuItem} ${styles.logout}`} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
      <div className={styles.content}></div>
    </div>
  );
};

export default AdminPanel;

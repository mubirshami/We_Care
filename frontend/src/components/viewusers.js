import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './viewusers.module.css';
import AdminPanel from './adminpanel';
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('admin');
    if (!token) {
      navigate('/signin');
    }
    axios
      .get('http://localhost:3000/user/get')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteUser = id => {
    axios
      .delete(`http://localhost:3000/user/${id}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        alert('User Deleted Successfully');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className={styles.container}>
      <AdminPanel />
      <h2 className={styles.title}>Users</h2>
      {users.length > 0 ? (
        <ul className={styles.userList}>
          {users.map(user => (
            <li key={user._id} className={styles.userItem}>
              <div className={styles.userInfo}>
                <span className={styles.username}>{user.name}</span>
                <span className={styles.email}>{user.email}</span>
                <span className={styles.verified}>
                  {user.isverified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default ViewUsers;

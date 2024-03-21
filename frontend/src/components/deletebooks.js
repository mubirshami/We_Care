import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './deleteBooks.module.css';
import AdminPanel from './adminpanel';
import { useNavigate } from 'react-router-dom';

const DeleteBooks = () => {
  const navigate=useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
      const token=localStorage.getItem('admin');
            if(!token){
                navigate('/signin')
            }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books/getbooks');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/delete/${id}`);
      fetchBooks();
      alert('Book Deleted Successfully')
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setName(book.name);
    setUrl(book.url);
  };

  const handleUpdate = async () => {
    try {
      if (!selectedBook) {
        return;
      }

      const updatedBook = { name, url };

      await axios.put(`http://localhost:3000/books/update/${selectedBook._id}`, updatedBook);
      fetchBooks();
      setSelectedBook(null);
      setName('');
      setUrl('');
      alert('Book Updated Successfully')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <AdminPanel></AdminPanel>
      <h2>Book List</h2>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book._id} className={styles.bookItem}>
            <p>{book.name}</p>
            <p>{book.url}</p>
            <div>
              <button className={styles.actionButton} onClick={() => handleEdit(book)}>
                Edit
              </button>
              <button className={styles.actionButton} onClick={() => handleDelete(book._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedBook && (
        <div className={styles.editForm}>
          <h2>Edit Book</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Book name" />
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Book URL" />
          <div>
            <button className={styles.actionButton} onClick={handleUpdate}>
              Update
            </button>
            <button
              className={styles.actionButton}
              onClick={() => {
                setSelectedBook(null);
                setName('');
                setUrl('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBooks;

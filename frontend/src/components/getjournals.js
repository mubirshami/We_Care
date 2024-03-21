import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./getjournals.module.css";
import { useNavigate } from "react-router-dom";

function JournalsPage() {
  const navigate=useNavigate();
  const [journals, setJournals] = useState([]);
  const [jwttoken,setJWTtoken]=useState("");

  useEffect(() => {
    const token=localStorage.getItem('TOKEN');
    if(!token){
      navigate('/signin')
  }
    setJWTtoken(token)
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    async function fetchJournals() {
      const response = await axios.get("http://localhost:3000/journal/get",config);
      setJournals(response.data);
    }

    fetchJournals();
  }, []);

  async function handleDelete(id) {
    await axios.delete(`http://localhost:3000/journal/delete/${id}`)
    .then((response) => {
        console.log(response.status);
        if(response.status==200){
          alert("Journal Deleted!!");
          // navigation.navigate('Home');  
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    setJournals(journals.filter((journal) => journal._id !== id));
  }

  return (
    <div className={styles.container}>
      <h1>My Journals</h1>
      <ul className={styles.journal_list}>
        {journals.map((journal) => (
          <li key={journal._id} className={styles.journal_item}>
            <div className={styles.journal_content}>{journal.content}</div>
            {/* <div dangerouslySetInnerHTML={{ __html: journal.content }}></div> */}
            <div className={styles.journal_actions}>
              <button
                className={styles.delete_button}
                onClick={() => handleDelete(journal._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JournalsPage;

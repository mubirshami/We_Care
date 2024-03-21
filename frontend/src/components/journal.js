import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import styles from './JournalEditor.module.css';


export default function Journal() {
    const navigate=useNavigate();
  const [content, setContent] = useState(" ");
  const [jwttoken,setJWTtoken]=useState("");
  const [sentiment,setSentiment]=useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(()=>{
    const token=localStorage.getItem('TOKEN');
    setJWTtoken(token)
    if(!token){
        navigate('/signin')
    }
    setStartTime(Date.now()); // Record the start time when the component mounts
    return () => {
      setEndTime(Date.now()); // Record the end time when the component unmounts
     }
},[]);


  const handleEditorChange = (e) => {
    setContent(e.target.getContent());

  }

  const removeHTMLTags = (str) => {
    return str.replace(/<[^>]+>/g, "");
};

  const Submit=async()=>{


    if(content!=" "){    
      let config = {
        headers: {
          'Authorization': 'Bearer ' + jwttoken
        }
      }
      console.log(config);

      const contentWithoutTags = removeHTMLTags(content);

      // const axiosinstant = axios.create({withCredentials:true});
      axios.post('http://localhost:5000/sentiment-analysis',
      {
        journalcontent:contentWithoutTags
      })
      .then((response) => {
        setSentiment(response.data.sentiment);
        axios.post('http://localhost:3000/journal/post',
      {
        content:contentWithoutTags,
        sentiment:response.data.sentiment
      },config)
      .then((response) => {
        console.log(response.status);
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        axios.post('http://localhost:3000/journaltime/post',
      {
        journalTime:timeSpent
      },config)
      .then((response) => {
        console.log(response.status);
      })
        if(response.status==200){  
          alert(`The sentiment of your journal is: ${response.data.sentiment}.`);
          setContent("");
          setStartTime(Date.now());
          navigate('/home');
          // navigation.navigate('Home');  
        }
      })
      .catch((error) => {
        console.log(error.response);
      }); 
      })
      }
      else{
        alert("Fields Cannot Be Empty!!!");
      }
    }
    
    return (
      // <div className={styles.maincontainer}>
      <div className={styles.container}>
        <h3>Journal Your Thoughts</h3>
          <Editor
            apiKey="t6lfxkxt6zeamrt1g9w1xejfxkt41rj53m69cyilievmnx7i"
            init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount'
            ],
            toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help'
            }}
            onChange={handleEditorChange}
        />
        <button type='Submit' onClick={Submit} className={styles.button} >Submit</button>
        {/* {sentiment !== null && (
        <div className={styles.sentiment}>The sentiment of your journal is: {sentiment}</div>
      )} */}
      </div>
     
    );
  }


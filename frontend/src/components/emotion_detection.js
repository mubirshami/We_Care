import React, { useState } from 'react';
import axios from 'axios';

function Emotion_Detection() {
  const [emotion, setEmotion] = useState('');

  const handleEmotionDetection = () => {
    axios.get('http://localhost:5000/emotion-detection')
      .then(response => {
        setEmotion(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={handleEmotionDetection}>Detect Emotion</button>
      <p>Emotion detected: {emotion}</p>
    </div>
  );
}

export default Emotion_Detection;

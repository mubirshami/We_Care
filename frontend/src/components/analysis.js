import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './analysis.module.css';


// function Analysis() {
//   const navigate = useNavigate();
//   const [chartUrl, setChartUrl] = useState('');
//   const [jwttoken, setJWTtoken] = useState('');
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('TOKEN');
//     setJWTtoken(token);
//     if (!token) {
//       navigate('/signin');
//     }

//     async function fetchChart() {
//       try {
//         let config = {
//           headers: {
//             'Authorization': 'Bearer ' + token
//           }
//         };

//         const res = await axios.get('http://localhost:3000/user/getid', config);
//         const user = res.data.user_id;
//         setUserId(user);

//         const response = await fetch(`http://localhost:5000/total_time_spent?user_id=${user}`);
//         const blob = await response.blob();
//         setChartUrl(URL.createObjectURL(blob));
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchChart();
//   }, [navigate]);

//   return <img src={chartUrl} alt="Chart" />;
// }

// export default Analysis;


function Analysis() {
  const navigate = useNavigate();
  const [chartUrl, setChartUrl] = useState('');
  const [jwttoken, setJWTtoken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    setJWTtoken(token);
    if (!token) {
      navigate('/signin');
    }

    async function fetchChart() {
      try {
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        const res = await axios.get('http://localhost:3000/user/getid', config);
        const user = res.data.user_id;
        setUserId(user);

        const response = await fetch(`http://localhost:5000/total_time_spent?user_id=${user}`);
        const blob = await response.blob();
        setChartUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error(error);
      }
    }

    fetchChart();
  }, [navigate]);

  return (
    <div>
      <h1 className={styles.heading}>Time Spent and Sentiment Analysis</h1>
      {chartUrl && <img className={styles.imageContainer} src={chartUrl} alt="Time Spent and Sentiment" />}
    </div>
  );
  
}

export default Analysis;

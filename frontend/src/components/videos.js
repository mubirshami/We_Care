import axios from "axios";
import { useEffect, useState } from "react";
import styles from"./videos.module.css"
import { useNavigate } from "react-router-dom";

function Videos() {
  const navigate = useNavigate();
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [musicVideos, setMusicVideos] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [jwtToken, setJwtToken] = useState("");

  const getVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/videos/getall');
      console.log(response.data);
      setExerciseVideos(response.data.filter(vid => vid.categoryid.name === "Exercise"));
      setMusicVideos(response.data.filter(vid => vid.categoryid.name === "Music"));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("useEffect called");
    const token = localStorage.getItem('TOKEN');
    setJwtToken(token);
    if (!token) {
      navigate('/signin');
    }
    getVideos();
  }, [navigate]);

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    };
    const handleUnload = (event) => {
      console.log("beforeunload event triggered");
      event.preventDefault();
      event.returnValue = '';
      if (startTime) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        axios.post('http://localhost:3000/meditationtime/post', { meditationTime: timeSpent }, config)
          .then(response => {
            console.log(response.status);
          })
          .catch(error => {
            console.log(error.response.data);
          });
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [startTime, jwtToken]);

  const handlePlayVideo = () => {
    setStartTime(Date.now());
  };

  return(
    <div className={styles.container}>
      <div className={styles.videoTitle}>
        <h1>Exercise Videos</h1>
        <div className={styles.iframeVideos}>
          <ul className={styles.iframe}>
            {exerciseVideos.map((vid, index) => (
              <li className={styles.innervideos} key={index}>
                <iframe
                  width={560}
                  height={315}
                  src={vid.url}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                  onLoad={handlePlayVideo}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.musicVideos}>
        <h1>Music Videos</h1>
        <ul className={styles.iframe}>
          {musicVideos.map((vid, index) => (
            <li className={styles.innervideos} key={index}>
              <iframe
                width={560}
                height={315}
                src={vid.url}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
                onLoad={handlePlayVideo}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Videos;

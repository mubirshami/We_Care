import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./deletevideos.module.css";
import AdminPanel from "./adminpanel";
import { useNavigate } from "react-router-dom";

function DeleteVideos() {
  const navigate=useNavigate();
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [musicVideos, setMusicVideos] = useState([]);

  useEffect(() => {
      const token=localStorage.getItem('admin');
            if(!token){
                navigate('/signin')
            }
    const getVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/videos/getall");
        console.log(response.data);
        setExerciseVideos(response.data.filter((vid) => vid.categoryid.name === "Exercise"));
        setMusicVideos(response.data.filter((vid) => vid.categoryid.name === "Music"));
      } catch (error) {
        console.error(error);
      }
    };

    getVideos();
  }, []);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3000/videos/delete/${videoId}`);
      alert("Video deleted successfully!");
      // Refresh the video list after deletion
      const updatedExerciseVideos = exerciseVideos.filter((vid) => vid._id !== videoId);
      const updatedMusicVideos = musicVideos.filter((vid) => vid._id !== videoId);
      setExerciseVideos(updatedExerciseVideos);
      setMusicVideos(updatedMusicVideos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <AdminPanel></AdminPanel>
      <div className={styles.videoTitle}>
        <h1>Exercise Videos</h1>
        <ul className={styles.iframe}>
          {exerciseVideos.map((vid) => (
            <li className={styles.innervideos} key={vid._id}>
              <div className={styles.videoWrapper}>
                <iframe
                  width={560}
                  height={315}
                  src={vid.url}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                />
                <button className={styles.deleteButton} onClick={() => handleDelete(vid._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.musicVideos}>
        <h1>Music Videos</h1>
        <ul className={styles.iframe}>
          {musicVideos.map((vid) => (
            <li className={styles.innervideos} key={vid._id}>
              <div className={styles.videoWrapper}>
                <iframe
                  width={560}
                  height={315}
                  src={vid.url}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                />
                <button className={styles.deleteButton} onClick={() => handleDelete(vid._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DeleteVideos;

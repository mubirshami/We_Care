import { useEffect, useState } from "react";
import { useNavigate,Link, useLocation } from "react-router-dom";
import '../App.css'
import axios from 'axios';

function Navbar(){
    const navigate=useNavigate();
    const [name,setname]=useState("");
    const location=useLocation();
    const [emotionTime, setEmotionTime] = useState('');
    const [jwttoken,setJWTtoken]=useState("");


    const signout=()=>{
        localStorage.clear();
        navigate('/signin');
    }

    useEffect(()=>{
        const Name=localStorage.getItem('Name');
        const token=localStorage.getItem('TOKEN');
        const admin= localStorage.getItem('admin');
    setJWTtoken(token)
    if(!token){
        console.log("Not got token");
        if(!admin){
            console.log("Not an admin")
            if(!(window.location.pathname==="/forgotpassword" || window.location.pathname.includes('/passwordreset/'))){
                navigate('/signin')
            }
            
        }
        // navigate('/signin')
    }
        setname(Name);
    },[]);

    const handleEmotionDetection = () => {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + jwttoken
            }
          }
        axios.get('http://localhost:5000/emotion-detection')
          .then(response => {
            setEmotionTime(response.data.emotionTime);
            axios.post('http://localhost:3000/emotiontime/post',
      {
        emotionTime:response.data.emotionTime
      },config)
      .then((response) => {
        console.log(response.status);
          // navigation.navigate('Home');  
      })
            })
            .catch(error => {
                console.log(error);
          });
      }

    return(
        <>
 <nav className={`navbar navbar-expand-lg navbar-light navigation ${(location.pathname==='/signup' || location.pathname==='/signin'  || location.pathname==='/addbooks' || location.pathname==='/addvideos' || location.pathname==='/forgotpassword' ||  location.pathname==='/deletevideos' || location.pathname==='/deletebooks' ||  location.pathname==='/viewreviews' || location.pathname==='/viewusers' || location.pathname.includes('/passwordreset/') || location.pathname==='/admin-panel' ) && 'd-none'} `} >
                <div className="container-fluid">
                    <Link style={{fontFamily: "'Baloo Bhai 2', cursive",fontSize:'1.9rem' , fontWeight:'bolder'}} className="navbar-brand mx-5"  to="/">We Care</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-dark"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className=" mx-2 nav-item">
                                <Link className={`nav-link  ${location.pathname === '/home' ? "active" : " "}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className=" mx-2 nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Meditation
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/videocategorized">Videos</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/books">Books</a></li>
                                </ul>
                            </li>
                            <li className=" mx-2 nav-item">
                                <Link className={`nav-link  ${location.pathname === '/emotiondetection' ? "active" : " "}`} aria-current="page" onClick={handleEmotionDetection}>Emotion Detection</Link>
                            </li>
                            
                            <li className=" mx-2 nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Journals
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/journal">Write Journal</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/getjournals">View Journals</a></li>
                                </ul>
                            </li>
                            <li className=" mx-2 nav-item">
                                <Link className={`nav-link  ${location.pathname === '/chatbot' ? "active" : " "}`} aria-current="page" to="/chatbot">Chatbot</Link>
                            </li>
                            <li className=" mx-2 nav-item">
                                <Link className={`nav-link  ${location.pathname === '/analysis' ? "active" : " "}`} aria-current="page" to="/analysis">Analysis</Link>
                            </li>
                            <li className=" mx-2 nav-item">
                                <Link className={`nav-link  ${location.pathname === '/updatereviews' || location.pathname==='/addreview' ? "active" : " "}`} aria-current="page" to="/updatereviews">Review</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                        <p className="btn mx-2" id='signin' >Welcome {name}</p>
                        <button className="btn mx-2" id='register' type="submit" onClick={signout}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;
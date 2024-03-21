import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import picture from "../main_image.png";

function Home(){
    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('TOKEN');
        if(!token){
            navigate('/signin')
        }
    });

    return(
        <>
        <div class= "innertext">
        <div className="container d-flex" id="Home-container">
        <div className="box d-flex flex-column w-500" id="left">
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>Your Mental Health Is Important</h1>
            <p style={{ width: '75%' }}>"Not until we are lost do we begin to understand ourselves." ― Henry David Thoreau</p>
            {/* <div className="buttons d-flex">
                <button className="home-btn" id='left-btn'>See Features</button>
                <button className="home-btn" id='right-btn'>Pricing</button>
            </div> */}
        </div>
        
         <div className="box " id="right">
            <img src={picture} alt="" />
        </div> 
        </div>
    </div>

    <div className="container">
        <div className="row">
            <div style={{ borderLeft: '1px solid #e3e3e3' }} className="col-sm-12 col-md-3 home-box p-5 mb-4 transform">
                <i style={{ color: '#007bff' }} className="icons fa fa-smile-o" aria-hidden="true"></i>
                <h5>Happiness</h5>
                <p>"Happiness can be found even in the darkest of times, if one only remembers to turn on the light." — Albus Dumbledore</p>
            </div>
            <div className="col-sm-12 col-md-3 home-box p-5 mb-4 transform">
                <i style={{ color: 'orange' }} className="icons fa fa-home" aria-hidden="true"></i>
                <h5>Feel At Home</h5>
                <p>"Nothing can dim the light that shines from within." – Maya Angelou</p>
            </div>
            <div className="col-sm-12 col-md-3 home-box p-5 mb-4 transform">
                <i style={{ color: 'red' }} className="icons fa fa-heart" aria-hidden="true"></i>
                <h5>Love</h5>
                <p>"You, yourself, as much as anybody in the entire universe, deserve your love and affection." — Buddha</p>
            </div>
            <div className="col-sm-12 col-md-3 home-box p-5 mb-4 transform">
                <i style={{ color: 'blue' }} className="icons fa fa-user" aria-hidden="true"></i>

                <h5>Self Belief</h5>
                <p>"My dark days made me strong. Or maybe I already was strong, and they made me prove it. — Emery Lord</p>
            </div>
        </div>
    </div>
</>
    )
}
export default Home;
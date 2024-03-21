import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signupstyle.css";


function Signup() {

	const navigate = useNavigate();
	const [name, setname] = useState('');
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [error, setError] = useState('');

	const handlesignup = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:3000/user/signup',
			{
				name: name,
				email: email,
				password: password
			})
			.then(res => {
				if (res.status === 200) {
					alert("Email Verification Sent, Please Verify Email");
					navigate('/signin');
				}
			}).catch((error) => {
				if (error.response.status === 409) {
					setError("Email Already Exists");
				}
				if(error.response.status===400){
					setError(error.response.data.message);
				}
			})
	}
	return (
		<div className="container" id="signup_container" >
			<div className="signup_form_container">
				<div id="left">
					{/* <h1>Welcome Back</h1> */}
					<Link to="/signin">
						<button type="button" className="white_btn">
							Sign In
						</button>
					</Link>
				</div>
				<div id="right">
					<form className="form_container" >
						<h1>Create Account</h1>
						<input
							required
							type="name"
							placeholder="Name"
							onChange={(e) => {
								setname(e.target.value)
							}}
							value={name}
							className="input"
						></input>
						<input
							required
							type="email"
							placeholder="Email"
							onChange={(e) => {
								setemail(e.target.value)
							}}
							value={email}
							className="input"
						></input>
						<input
							required
							type="password"
							placeholder="Password"
							onChange={(e) => {
								setpassword(e.target.value)
							}}
							value={password}
							className="input"
						></input>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn" onClick={(e) => {
							handlesignup(e);
						}}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};


export default Signup;




// return(
// 	<div>
// 		<h1>
// 			SIGNUP
// 		</h1>
// 		Name<input
// 		onChange={(e)=>{
// 			setname(e.target.value)
// 		}}
// 		value={name}
// 		type="name"></input><br></br>
// 		Email<input
// 		onChange={(e)=>{
// 			setemail(e.target.value)
// 		}}
// 		value={email}
// 		type="email"></input><br></br>
// 		Password<input
// 		onChange={(e)=>{
// 			setpassword(e.target.value)
// 		}}
// 		value={password}
// 		type="password"></input><br></br>
// 		<button
// 		onClick={handlesignup}
// 		>REGISTER</button>

// 	</div>
// )
// }
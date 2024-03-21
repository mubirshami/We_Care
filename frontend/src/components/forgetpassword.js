import { useState } from "react";
import axios from "axios";
import styles from "./forgetpassword.module.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// try {
            await axios.post('http://localhost:3000/password/',
            {
                email:email
            }).then(res=>{
                if(res.status===200){
                    setMsg("Reset Email Sent");
                    setError("");
                }
            })
			// setMsg("Reset Email Sent");
			// setError("");
            .catch ((error)=> {
			if (error.response.status===404){
                setError("Email Not Found");
                setMsg("");         
                }
		}
	)};

	return (
		<div className={styles.container}>
			<form className={styles.form_container}>
				<h1>Forgot Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					className={styles.input}
				/>
				{error && <div className={styles.error_msg}>{error}</div>}
				{msg && <div className={styles.success_msg}>{msg}</div>}
				<button type="submit" className={styles.green_btn} onClick={(e)=>{handleSubmit(e)}}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./signin.module.css";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminpassword, setAdminPassword] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleAdmin = async (e) => {
    e.preventDefault();
    if (adminpassword === "admin") {
      localStorage.setItem("admin", "admin");
      navigate("/viewusers");
    } else {
      alert("Invalid Password");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/user/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Sign In Successfull");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("Name", res.data.name);
          console.log(res.data.name);
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError("User Not Found");
        } else if (error.response.status === 401) {
          setError(error.response.data.message);
        } else if (error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.Signin_left}>
          <form className={styles.form_container}>
            <h1>Login to Your Account</h1>
            <input
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={styles.input}
            />
            <input
              required
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={styles.input}
            />
            <Link to="/forgotpassword" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
            </Link>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              className={`${styles.green_btn} ${styles.signin_button}`}
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <input
              required
              type="password"
              placeholder="Admin Password"
              onChange={(e) => setAdminPassword(e.target.value)}
              value={adminpassword}
              className={`${styles.adminpassword_input}`}
            />
            <button
              type="button"
              className={`${styles.signin_button} ${styles.green_btn}`}
              onClick={handleAdmin}
            >
              Admin Panel
            </button>
          </form>
        </div>
        <div className={styles.signin_right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>

          {/* <button
            type="button"
            className={styles.admin_btn}
            onClick={handleAdmin}
          >
            Admin Panel
          </button>
          <input
            required
            type="password"
            placeholder="Admin Password"
            onChange={(e) => setAdminPassword(e.target.value)}
            value={adminpassword}
            className={`${styles.adminpassword_input}`}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Signin;

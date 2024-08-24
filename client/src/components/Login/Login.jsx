import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      navigate("/dashboard");
    } catch (error) {
      // Handle specific error scenarios based on the response status and message
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("User Not Found");
        } else if (error.response.status === 401) {
          setErrorMessage("Invalid Credentials, Please Check Again");
        } else if (error.response.data && error.response.data.message) {
          // If the backend sends a specific message, show it
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response from the server. Please check your network.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeading}>QUIZZIE</h2>
      <div className={styles.authButtons}>
        <button className={styles.authButton} onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <button
          className={styles.authButton}
          onClick={() => navigate("/")}
          style={{ boxShadow: "0px 5px 5px #839ddf" }}
        >
          Login
        </button>
      </div>
      <form className={styles.authForm} onSubmit={handleLogin}>
        <div className={styles.formRow}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formRow}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Log In</button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;

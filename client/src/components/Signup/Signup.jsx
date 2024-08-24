// src/components/Signup/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";

const API_URL = "http://localhost:5000/api/auth"; // Update the base URL to your backend server

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) {
      newErrors.name = "Enter name";
    }
    if (!email) {
      newErrors.email = "Enter email";
    }
    if (!password) {
      newErrors.password = "Enter password";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, { name, email, password });
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeading}>QUIZZIE</h2>
      <div className={styles.authButtons}>
        <button className={styles.authButton} onClick={() => navigate("/signup")} style={{ boxShadow: "0px 5px 5px #839ddf" }}>Sign Up</button>
        <button className={styles.authButton} onClick={() => navigate("/")}>Login</button>
      </div>
      <form className={styles.authForm} onSubmit={handleSignup}>
        <div className={styles.formRow}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? styles.errorInput : ''}
            placeholder={errors.name}
          />
        </div>
        <div className={styles.formRow}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.errorInput : ''}
            placeholder={errors.email}
          />
        </div>
        <div className={styles.formRow}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? styles.errorInput : ''}
            placeholder={errors.password}
          />
        </div>
        <div className={styles.formRow}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? styles.errorInput : ''}
            placeholder={errors.confirmPassword }
          />
        </div>
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

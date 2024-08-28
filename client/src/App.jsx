import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import styles from "./App.module.css";
import Analytics from "./components/Analytics/Analytics";
import QuizPage from "./components/Quiz/QuizPage";

const App = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

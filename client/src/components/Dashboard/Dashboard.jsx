import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import CreateQuizDialog from '../Quiz/CreateQuizDialog';
import CreateQuestionsDialog from '../Quiz/CreateQuestionsDialog';
import { getQuizStats } from '../../services/quizService'; // New service for getting quiz stats

const Dashboard = () => {
  const navigate = useNavigate();

  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  const [showCreateQuestionsDialog, setShowCreateQuestionsDialog] = useState(false);
  const [quizStats, setQuizStats] = useState({ quizzes: 0, questions: 0, impressions: 0 });

  useEffect(() => {
    updateStats(); // Update stats when the dashboard is loaded
  }, []);

  const updateStats = () => {
    const stats = getQuizStats(); // Fetch updated quiz stats
    setQuizStats(stats);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const handleOpenCreateQuiz = () => {
    setShowCreateQuizDialog(true);
  };

  const handleCloseCreateQuiz = () => {
    setShowCreateQuizDialog(false);
  };

  const handleContinueToQuestions = () => {
    setShowCreateQuizDialog(false);
    setShowCreateQuestionsDialog(true);
  };

  const handleCloseCreateQuestions = () => {
    setShowCreateQuestionsDialog(false);
    updateStats(); // Update stats when the quiz creation process is completed
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.logo}>QUIZZIE</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link to="/dashboard" className={styles.navLink}>Dashboard</Link></li>
            <li className={styles.navItem}><Link to="/analytics" className={styles.navLink}>Analytics</Link></li>
            <li className={styles.navItem}>
              <button className={styles.navLink} onClick={handleOpenCreateQuiz} style={{border: "None", backgroundColor: "#FFFFFF", font: "Franklin Gothic Medium", color: "#474444", fontWeight: "bolder" }}>
                Create Quiz
              </button>
            </li>
          </ul>
        </nav>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.cardsContainer}>
          <div className={`${styles.card} ${styles.quizzesCard}`}>{quizStats.quizzes} Quizzes Created</div>
          <div className={`${styles.card} ${styles.questionsCard}`}>{quizStats.questions} Questions Created</div>
          <div className={`${styles.card} ${styles.impressionsCard}`}>{quizStats.impressions} Total Impressions</div>
        </div>
        <h3 className={styles.trendingHeading}>Trending Quizzes</h3>
        <div className={styles.trendingQuizzes}>
          {/* Map through trending quizzes and display */}
        </div>
      </div>
      
      {showCreateQuizDialog && (
        <CreateQuizDialog 
          onClose={handleCloseCreateQuiz} 
          onContinue={handleContinueToQuestions}  // Pass onContinue prop here
        />
      )}

      {showCreateQuestionsDialog && (
        <CreateQuestionsDialog onClose={handleCloseCreateQuestions} />
      )}
    </div>
  );
};

export default Dashboard;

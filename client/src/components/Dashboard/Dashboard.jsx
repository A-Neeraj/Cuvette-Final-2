import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import CreateQuizDialog from '../Quiz/CreateQuizDialog';
import CreateQuestionsDialog from '../Quiz/CreateQuestionsDialog';
import { getQuizStats, getTrendingQuizzes } from '../../services/quizService'; // Ensure getTrendingQuizzes is available
import eyeIcon from './eye-icon.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  const [showCreateQuestionsDialog, setShowCreateQuestionsDialog] = useState(false);
  const [quizStats, setQuizStats] = useState({ quizzes: 0, questions: 0, impressions: 0 });
  const [currentQuizName, setCurrentQuizName] = useState('');
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);

  const updateStats = async () => {
    const stats = await getQuizStats(); // Ensure this is an async function
    if (stats) {
      setQuizStats(stats);
    } else {
      console.error('Failed to update quiz stats');
    }
  };

  const fetchTrendingQuizzes = async () => {
    const quizzes = await getTrendingQuizzes(); // Fetch trending quizzes
    if (quizzes) {
      setTrendingQuizzes(quizzes.sort((a, b) => b.impressions - a.impressions)); // Sort by impressions
    } else {
      console.error('Failed to fetch trending quizzes');
    }
  };

  useEffect(() => {
    updateStats();
    fetchTrendingQuizzes(); // Fetch trending quizzes on component mount
  }, []);

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

  const handleContinueToQuestions = (quizName, quizType) => {
    setCurrentQuizName(quizName);
    setShowCreateQuizDialog(false);
    setShowCreateQuestionsDialog(true);
    console.log('Quiz Name:', quizName);
    console.log('Quiz Type:', quizType);
  };

  const handleCloseCreateQuestions = () => {
    setShowCreateQuestionsDialog(false);
    updateStats();
    fetchTrendingQuizzes(); // Refresh trending quizzes after closing CreateQuestionsDialog
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
          <div className={`${styles.card} ${styles.quizzesCard}`}><b style={{fontSize: "3rem"}}>{quizStats.quizzes}</b> Quizzes Created</div>
          <div className={`${styles.card} ${styles.questionsCard}`}><b style={{fontSize: "3rem"}}>{quizStats.questions}</b> Questions Created</div>
          <div className={`${styles.card} ${styles.impressionsCard}`}><b style={{fontSize: "3rem"}}>{quizStats.impressions}</b> Total Impressions</div>
        </div>
        <h3 className={styles.trendingHeading}>Trending Quizzes</h3>
        <div className={styles.trendingQuizzes}>
          {trendingQuizzes.map((quiz) => (
            <div key={quiz.id} className={styles.trendingCard}>
              <div className={styles.cardContent}>
                <div className={styles.quizHeader}>
                  <h4 className={styles.quizName}>{quiz.name}</h4>
                  <div className={styles.impressions}>
                    <span className={styles.impressionsCount}>{quiz.impressions}</span>
                    <img src={eyeIcon} alt="EyeIcon" />
                  </div>
                </div>
                <p className={styles.createdDate}>Created on: {quiz.createdOn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateQuizDialog && (
        <CreateQuizDialog 
          onClose={handleCloseCreateQuiz} 
          onContinue={handleContinueToQuestions} 
        />
      )}

      {showCreateQuestionsDialog && (
        <CreateQuestionsDialog 
          onClose={handleCloseCreateQuestions} 
          quizName={currentQuizName} 
        />
      )}
    </div>
  );
};

export default Dashboard;

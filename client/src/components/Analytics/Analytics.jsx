import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaShareAlt } from 'react-icons/fa';
import styles from './Analytics.module.css';
import CreateQuizDialog from '../Quiz/CreateQuizDialog';
import CreateQuestionsDialog from '../Quiz/CreateQuestionsDialog'; // Import CreateQuestionsDialog
import { getQuizList } from '../../services/quizService'; // New service for getting the quiz list

const Analytics = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  const [showCreateQuestionsDialog, setShowCreateQuestionsDialog] = useState(false); // New state for CreateQuestionsDialog

  useEffect(() => {
    updateQuizList(); // Update quiz list when the analytics page is loaded
  }, []);

  const updateQuizList = () => {
    const quizzes = getQuizList(); // Fetch updated quiz list
    setQuizData(quizzes);
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
    setShowCreateQuizDialog(false); // Close CreateQuizDialog
    setShowCreateQuestionsDialog(true); // Open CreateQuestionsDialog
    console.log('Continuing to the questions page...');
  };

  const handleCloseCreateQuestions = () => {
    setShowCreateQuestionsDialog(false); // Close CreateQuestionsDialog
    updateQuizList(); // Update quiz list after questions are created
  };

  const handleShareQuiz = (quizLink) => {
    navigator.clipboard.writeText(quizLink);
    alert('Quiz link copied to clipboard');
  };

  const [showDialog, setShowDialog] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedQuizId(id);
    setShowDialog(true);
  };

  const confirmDelete = () => {
    setQuizData(quizData.filter(quiz => quiz.id !== selectedQuizId));
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.logo}>QUIZZIE</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link to="/dashboard" className={styles.navLink}>Dashboard</Link></li>
            <li className={styles.navItem}><Link to="/analytics" className={styles.navLink}>Analytics</Link></li>
            <li className={styles.navItem}>
              <button 
                className={styles.navLink} 
                onClick={handleOpenCreateQuiz} 
                style={{border: "none", backgroundColor: "#FFFFFF", font: "Franklin Gothic Medium", color: "#474444", fontWeight: "bolder" }}
              >
                Create Quiz
              </button>
            </li>
          </ul>
        </nav>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.mainContent}>
        <h3 className={styles.heading}>Quiz Analysis</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Impressions</th>
              <th>Functions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((quiz, index) => (
              <tr key={quiz.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td>{index + 1}</td>
                <td>{quiz.name}</td>
                <td>{quiz.createdOn}</td>
                <td>{quiz.impressions}</td>
                <td>
                  <button className={`${styles.iconButton} ${styles.editButton}`}><FaEdit /></button>
                  <button className={`${styles.iconButton} ${styles.deleteButton}`} onClick={() => handleDeleteClick(quiz.id)}><FaTrash /></button>
                  <button className={`${styles.iconButton} ${styles.shareButton}`} onClick={() => handleShareQuiz(quiz.link)}><FaShareAlt /></button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        {showDialog && (
          <div className={styles.dialogOverlay}>
            <div className={styles.dialogBox}>
              <p>Are you sure you want to delete?</p>
              <div className={styles.dialogButtons}>
                <button className={styles.confirmButton} onClick={confirmDelete}>Confirm Delete</button>
                <button className={styles.cancelButton} onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showCreateQuizDialog && (
          <CreateQuizDialog 
            onClose={handleCloseCreateQuiz} 
            onContinue={handleContinueToQuestions} // Pass the onContinue function
          />
        )}

        {showCreateQuestionsDialog && (
          <CreateQuestionsDialog 
            onClose={handleCloseCreateQuestions} // Handle closing the CreateQuestionsDialog
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;

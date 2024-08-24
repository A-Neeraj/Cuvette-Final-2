import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaShareAlt } from 'react-icons/fa';
import styles from './Analytics.module.css';
import CreateQuizDialog from '../Quiz/CreateQuizDialog';
import CreateQuestionsDialog from '../Quiz/CreateQuestionsDialog';
import { getQuizList, deleteQuiz } from '../../services/quizService';

const Analytics = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  const [showCreateQuestionsDialog, setShowCreateQuestionsDialog] = useState(false);
  const [currentQuizName, setCurrentQuizName] = useState(''); // State to store the current quiz name

  useEffect(() => {
    updateQuizList();
  }, []);

  const updateQuizList = () => {
    const quizzes = getQuizList(); // Fetch the latest quizzes list
    setQuizData(quizzes); // Update the quizData state
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

  const handleContinueToQuestions = (quizName, quizType) => {
    setCurrentQuizName(quizName); // Store the quiz name
    setShowCreateQuizDialog(false);
    setShowCreateQuestionsDialog(true);
    console.log('Continuing to the questions page with:', quizName, quizType);
  };

  const handleCloseCreateQuestions = () => {
    setShowCreateQuestionsDialog(false);
    updateQuizList(); // Refresh the quiz list after creating questions
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
    deleteQuiz(selectedQuizId); // Delete quiz from localStorage
    updateQuizList(); // Update the quiz list after deletion
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
            onContinue={handleContinueToQuestions} // Pass the quizName and quizType
          />
        )}

        {showCreateQuestionsDialog && (
          <CreateQuestionsDialog 
            onClose={handleCloseCreateQuestions} // Handle closing the CreateQuestionsDialog
            quizName={currentQuizName} // Pass the current quiz name to CreateQuestionsDialog
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;

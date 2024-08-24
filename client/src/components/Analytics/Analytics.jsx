import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaShareAlt } from 'react-icons/fa';
import styles from './Analytics.module.css';
import CreateQuizDialog from '../Quiz/CreateQuizDialog';
import CreateQuestionsDialog from '../Quiz/CreateQuestionsDialog';

const Analytics = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  // Example data, replace this with actual data fetched from your backend
  const [quizData, setQuizData] = useState([
    { id: 1, name: "Quiz 1", createdOn: "2024-08-21", impressions: 150 },
    { id: 2, name: "Quiz 2", createdOn: "2024-08-22", impressions: 120 },
    { id: 3, name: "Quiz 3", createdOn: "2024-08-23", impressions: 200 },
  ]);

  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  const [showCreateQuestionsDialog, setShowCreateQuestionsDialog] = useState(false);

  // Create Quiz Dialog Box
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
  };

  const [showDialog, setShowDialog] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  //Delete Dialog Box
  const handleDeleteClick = (id) => {
    setSelectedQuizId(id);
    setShowDialog(true);
  };

  const confirmDelete = () => {
    // Delete the quiz
    setQuizData(quizData.filter(quiz => quiz.id !== selectedQuizId));
    setShowDialog(false); // Hide the dialog after deleting
  };

  const cancelDelete = () => {
    setShowDialog(false); // Hide the dialog without deleting
  };

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.logo}>QUIZZIE</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link to="/dashboard" className={styles.navLink}>Dashboard</Link></li>
            <li className={styles.navItem}><Link to="/analytics" className={styles.navLink}>Analytics</Link></li>
            <li className={styles.navItem}><button className={styles.navLink} onClick={handleOpenCreateQuiz} style={{border: "None", backgroundColor: "#FFFFFF", font: "Franklin Gothic Medium", color: "#474444", fontWeight: "bolder" }}>Create Quiz</button></li>
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
              <th></th> {/* Empty column for spacing */}
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
                  <button className={`${styles.iconButton} ${styles.shareButton}`}><FaShareAlt /></button>
                </td>
                <td></td> {/* Empty column for spacing */}
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
            onContinue={handleContinueToQuestions}  // Pass onContinue prop here
          />
        )}

        {showCreateQuestionsDialog && (
          <CreateQuestionsDialog onClose={handleCloseCreateQuestions} />
        )}
      </div>
    </div>
  );
};

export default Analytics;

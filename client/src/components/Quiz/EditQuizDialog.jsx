import React, { useState, useEffect } from 'react';
import styles from './EditQuizDialog.module.css';
import { updateQuiz } from '../../services/quizService'; // Import the updateQuiz function

const EditQuizDialog = ({ quiz, onClose, onUpdate }) => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');

  useEffect(() => {
    if (quiz) {
      setQuizName(quiz.name);
      setQuizType(quiz.type);
    }
  }, [quiz]);

  const handleQuizTypeClick = (type) => {
    setQuizType(type);
  };

  const handleUpdate = () => {
    if (quizName && quizType) {
      updateQuiz(quiz.id, quizName, quizType); // Update quiz details
      onUpdate(); // Notify parent to refresh quiz list
      onClose(); // Close the dialog
    } else {
      alert("Please enter a quiz name and select a quiz type.");
    }
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox}>
        <input
          type="text"
          placeholder="Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          className={styles.quizNameInput}
        />

        <div className={styles.quizTypeContainer}>
          <label className={styles.quizTypeLabel}>Quiz Type:</label>
          <div className={styles.quizTypeButtons}>
            <button
              className={`${styles.quizTypeButton} ${quizType === 'Q&A' ? styles.activeButton : ''}`}
              onClick={() => handleQuizTypeClick('Q&A')}
            >
              Q & A
            </button>
            <button
              className={`${styles.quizTypeButton} ${quizType === 'Poll' ? styles.activeButton : ''}`}
              onClick={() => handleQuizTypeClick('Poll')}
            >
              Poll Type
            </button>
          </div>
        </div>

        <div className={styles.dialogButtons}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.continueButton} onClick={handleUpdate}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default EditQuizDialog;

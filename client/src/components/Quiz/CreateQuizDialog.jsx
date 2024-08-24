import React, { useState } from 'react';
import styles from './CreateQuizDialog.module.css';

const CreateQuizDialog = ({ onClose, onContinue }) => {  // onContinue is added as a prop
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');

  const handleQuizTypeClick = (type) => {
    setQuizType(type);
  };

  const handleContinue = () => {
    if (quizName && quizType) {
      // Handle the logic to create the quiz here
      console.log("Quiz Name:", quizName);
      console.log("Quiz Type:", quizType);
      onContinue(); // Open the questions dialog
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
          <button className={styles.continueButton} onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizDialog;

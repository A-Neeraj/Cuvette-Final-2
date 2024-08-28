// CreateQuizDialog.jsx

import React, { useState } from 'react';
import styles from './CreateQuizDialog.module.css';

const CreateQuizDialog = ({ onClose, onContinue }) => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');

  const handleQuizTypeClick = (type) => {
    setQuizType(type);
  };

  const handleContinue = async () => {
    if (quizName && quizType) {
      try {
        const createdQuiz = await onContinue(quizName, quizType); // Ensure this is an async function
  
        if (createdQuiz && createdQuiz.link) {
          const quizLink = createdQuiz.link;
          await navigator.clipboard.writeText(quizLink); // Copy the link to clipboard
          alert('Quiz link copied to clipboard: ' + quizLink);
  
          // Reset input fields
          setQuizName('');
          setQuizType('');
        } else {
          // alert('Failed to create the quiz or link is undefined.');
        }
      } catch (error) {
        console.error('Error during quiz creation:', error);
        alert('An error occurred while creating the quiz.');
      }
    } else {
      alert('Please enter a quiz name and select a quiz type.');
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

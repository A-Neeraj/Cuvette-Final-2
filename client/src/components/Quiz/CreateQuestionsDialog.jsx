import React, { useState } from 'react';
import styles from './CreateQuestionsDialog.module.css';
import { createQuiz } from '../../services/quizService'; // Import the createQuiz function
import { FaTrash } from 'react-icons/fa';

const CreateQuestionsDialog = ({ onClose, quizName }) => { // Add quizName prop
  const [questions, setQuestions] = useState([{ text: '', options: [] }]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [optionType, setOptionType] = useState('Text');
  const [timer, setTimer] = useState('OFF');
  const [maxQuestions] = useState(5);
  const [showCongratsDialog, setShowCongratsDialog] = useState(false);
  const [quizLink, setQuizLink] = useState('');

  const handleAddQuestion = () => {
    if (questions.length < maxQuestions) {
      setQuestions([...questions, { text: '', options: [] }]);
      setSelectedQuestionIndex(questions.length);
    }
  };

  const handleDeleteOption = (optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddOption = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].options[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTextChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].text = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionClick = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].correctOption = index;
    setQuestions(updatedQuestions);
  };

  const handleTimerClick = (time) => {
    setTimer(time);
  };

  const handleCreateQuiz = () => {
    // Handle quiz creation logic
    console.log('Questions:', questions);
    console.log('Timer:', timer);
    
    // Create the quiz and simulate a successful creation
    const newQuiz = createQuiz(quizName, questions.length); // Use the quizName passed from CreateQuizDialog
    console.log('New Quiz Created:', newQuiz);
    
    // Simulate quiz creation logic here
    const newQuizLink = newQuiz.link; // Example link
    setQuizLink(newQuizLink);
    setShowCongratsDialog(true);
  };

  const handleShareQuiz = () => {
    navigator.clipboard.writeText(quizLink);
    alert('Quiz link copied to clipboard');
  };

  const handleCloseCongrats = () => {
    setShowCongratsDialog(false);
    onClose(); // Close the create questions dialog
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox}>
        {!showCongratsDialog ? (
          <>
            <div className={styles.header}>
              <span className={styles.maxQuestions}>Max 5 Questions</span>
            </div>

            <div className={styles.questionNav}>
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.questionButton} ${selectedQuestionIndex === index ? styles.activeButton : ''}`}
                  onClick={() => setSelectedQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
              {questions.length < maxQuestions && (
                <button className={styles.addQuestionButton} onClick={handleAddQuestion}>
                  +
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Poll Question"
              value={questions[selectedQuestionIndex].text}
              onChange={handleQuestionTextChange}
              className={styles.questionInput}
            />

            <div className={styles.optionTypeContainer}>
              <label className={styles.optionTypeLabel}>Option Type:</label>
              {['Text', 'Image URL', 'Text & Image URL'].map((type) => (
                <label key={type} className={styles.optionTypeRadio}>
                  <input
                    type="radio"
                    value={type}
                    checked={optionType === type}
                    onChange={() => setOptionType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>

            <div className={styles.optionsContainer}>
              <div className={styles.optionsLeft}>
                {questions[selectedQuestionIndex].options.map((option, index) => (
                  <div key={index} className={styles.optionRow}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className={`${styles.optionInput} ${questions[selectedQuestionIndex].correctOption === index ? styles.correctOption : ''}`}
                      onClick={() => handleCorrectOptionClick(index)}
                    />
                    <FaTrash className={styles.deleteIcon} onClick={() => handleDeleteOption(index)} />
                  </div>
                ))}
                <button className={styles.addOptionButton} onClick={handleAddOption}>
                  Add Option
                </button>
              </div>

              <div className={styles.optionsRight}>
                <h4>Timer</h4>
                <button
                  className={`${styles.timerButton} ${timer === 'OFF' ? styles.activeTimerButton : ''}`}
                  onClick={() => handleTimerClick('OFF')}
                >
                  OFF
                </button>
                <button
                  className={`${styles.timerButton} ${timer === '5sec' ? styles.activeTimerButton : ''}`}
                  onClick={() => handleTimerClick('5sec')}
                >
                  5 Sec
                </button>
                <button
                  className={`${styles.timerButton} ${timer === '10sec' ? styles.activeTimerButton : ''}`}
                  onClick={() => handleTimerClick('10sec')}
                >
                  10 Sec
                </button>
              </div>
            </div>

            <div className={styles.dialogButtons}>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.createQuizButton} onClick={handleCreateQuiz}>
                Create Quiz
              </button>
            </div>
          </>
        ) : (
          <div className={styles.congratsDialog}>
            <h2>Congrats! your Quiz is Published!</h2>
            <input
              type="text"
              value={quizLink}
              readOnly
              className={styles.quizLinkInput}
            />
            <button className={styles.copyLinkButton} onClick={handleShareQuiz}>
              Share
            </button>
            <button className={styles.closeCongratsButton} onClick={handleCloseCongrats}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestionsDialog;

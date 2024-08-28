import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById, updateQuizImpressions } from '../../services/quizService'; 
import styles from './QuizPage.module.css'; 
import trophyImage from './trophy.png';


const QuizPage = () => {
  const { quizId } = useParams(); 
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null); 
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(null); 
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchedQuiz = getQuizById(quizId);
    console.log('Fetched Quiz:', fetchedQuiz);
    if (fetchedQuiz) {
      setQuiz(fetchedQuiz);
  
      // Ensure this is called only once
      console.log('Updating impressions for quiz:', quizId);
      updateQuizImpressions(quizId);
  
      // Set up timer if enabled
      if (fetchedQuiz.timer === '5sec') {
        setTimer(5);
      } else if (fetchedQuiz.timer === '10sec') {
        setTimer(10);
      }
    } else {
      console.error('Quiz not found or invalid quizId:', quizId);
    }
  }, [quizId]);

  useEffect(() => {
    // Timer countdown logic
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setQuizCompleted(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval); 
  }, [timer]);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length - 1)) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
      calculateScore();
    }
  };

  const calculateScore = () => {
    const correctAnswers = quiz.questions.reduce((count, question, index) => {
      return answers[index] === question.options[question.correctOption] ? count + 1 : count;
    }, 0);
    setScore(correctAnswers);
  };

  const handleSubmit = () => {
    calculateScore();
    setQuizCompleted(true);
  };

  if (!quiz) return <div>Loading...</div>;

  // Check if questions and options are available
  const currentQuestion = quiz.questions[currentQuestionIndex];
  console.log('Current Question:', currentQuestion); 
  if (!currentQuestion) return <div>Loading Question...</div>;

  return (
    <div className={styles.quizContainer}>
      {!quizCompleted ? (
        <>
          <div className={styles.quizHeader}>
            <span className={styles.questionNumber}>{`${currentQuestionIndex + 1}/${quiz.questions.length}`}</span>
            {quiz.timer && (
              <span className={styles.timer}>
                {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
          <h2 className={styles.questionText}>{currentQuestion.text}</h2>
          <div className={styles.options}>
            {currentQuestion.options.map((option, index) => (
              <button 
                key={index} 
                className={`${styles.optionButton} ${selectedOption === option ? styles.selectedOption : ''}`} 
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {currentQuestionIndex < quiz.questions.length - 1 && (
            <button 
              className={styles.nextButton} 
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {currentQuestionIndex === quiz.questions.length - 1 && (
            <button 
              className={styles.submitButton} 
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </>
      ) : (
        <div className={styles.resultsContainer}>
          <h1 className={styles.resultsHeading}>Congrats! Quiz is completed</h1>
          <img src={trophyImage} alt="Trophy" className={styles.trophyImage} />
          <h2 className={styles.score}>
            Your Score is <span className={styles.scoreHighlight}>{score}/{quiz.questions.length}</span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

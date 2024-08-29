import { v4 as uuidv4 } from 'uuid';

let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
let totalQuestions = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);

export const createQuiz = (quizName, questions) => {
  const quizId = uuidv4();
  const newQuiz = {
    id: quizId,
    name: quizName,
    createdOn: new Date().toISOString().split('T')[0],
    impressions: 0,
    questions: questions, // Use the questions provided
    link: `http://localhost:5173/quiz/${quizId}`
  };

  quizzes.push(newQuiz);
  totalQuestions += questions.length; // Update the total question count
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
  return newQuiz;
};

export const getQuizStats = () => {
  return {
    quizzes: quizzes.length,
    questions: totalQuestions,
    impressions: quizzes.reduce((total, quiz) => total + quiz.impressions, 0)
  };
};

export const getQuizList = () => {
  return quizzes;
};

export const getQuizById = (quizId) => {
  return quizzes.find(q => q.id === quizId);
};

export const deleteQuiz = (quizId) => {
  quizzes = quizzes.filter(q => q.id !== quizId);
  totalQuestions = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0); // Update the total question count
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const updateQuizImpressions = (quizId) => {
  const quiz = quizzes.find(q => q.id === quizId);
  if (quiz) {
    quiz.impressions += 1;
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  } else {
    console.error('Quiz not found for ID:', quizId);
  }
};

export const updateQuiz = (id, name, questions) => {
  quizzes = quizzes.map(quiz =>
    quiz.id === id ? { ...quiz, name, questions } : quiz
  );
  totalQuestions = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0); // Update the total question count
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

// New function to fetch trending quizzes
export const getTrendingQuizzes = () => {
  // Sort quizzes by impressions in descending order
  return quizzes.sort((a, b) => b.impressions - a.impressions);
};

let quizzes = [];
let questions = 0;

export const createQuiz = (quizName, questionCount) => {
  const newQuiz = {
    id: quizzes.length + 1,
    name: quizName,
    createdOn: new Date().toISOString().split('T')[0],
    impressions: 0,
    questions: questionCount,
    link: `https://quizlink.com/quiz${quizzes.length + 1}`
  };

  quizzes.push(newQuiz);
  questions += questionCount;
  return newQuiz;
};

export const getQuizStats = () => {
  return {
    quizzes: quizzes.length,
    questions: questions,
    impressions: quizzes.reduce((total, quiz) => total + quiz.impressions, 0)
  };
};

export const getQuizList = () => {
  return quizzes;
};

export const updateQuizImpressions = (quizId) => {
  const quiz = quizzes.find(q => q.id === quizId);
  if (quiz) {
    quiz.impressions += 1;
  }
};

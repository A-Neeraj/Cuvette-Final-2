const express = require('express');
const { createQuiz, getQuizById, updateQuiz, deleteQuiz, getQuizAnalytics } = require('../controllers/quizController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create Quiz
router.post('/', protect, createQuiz);

// Get a specific quiz (increments impressions)
router.get('/:id', getQuizById);

// Update Quiz
router.put('/:id', protect, updateQuiz);

// Delete Quiz
router.delete('/:id', protect, deleteQuiz);

// Quiz Analytics
router.get('/analytics', protect, getQuizAnalytics);

module.exports = router;

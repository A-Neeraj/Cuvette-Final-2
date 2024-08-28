// server/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Route to create a quiz
router.post('/', quizController.createQuiz);

// Route to get a specific quiz by ID
router.get('/:id', quizController.getQuizById);

// Route to get all quizzes (optional)
router.get('/', quizController.getAllQuizzes);

module.exports = router;
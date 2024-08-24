const Quiz = require('../models/Quiz');

// Create a quiz
exports.createQuiz = async (req, res) => {
  const { name, type, questions } = req.body;
  try {
    const quiz = await Quiz.create({
      name,
      type,
      questions,
      createdBy: req.user._id,
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific quiz and increment impressions
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      quiz.impressions += 1;
      await quiz.save();
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz && quiz.createdBy.toString() === req.user._id.toString()) {
      // Apply update rules (can't change name or type, etc.)
      quiz.questions = req.body.questions;
      await quiz.save();
      res.json(quiz);
    } else {
      res.status(403).json({ message: 'Unauthorized or quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz && quiz.createdBy.toString() === req.user._id.toString()) {
      await quiz.remove();
      res.json({ message: 'Quiz removed' });
    } else {
      res.status(403).json({ message: 'Unauthorized or quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quiz analytics
exports.getQuizAnalytics = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user._id });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

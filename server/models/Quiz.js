const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String },
  imageUrl: { type: String },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
  timer: { type: Number, default: 0 },
});

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Q&A', 'Poll'], required: true },
  questions: [questionSchema],
  impressions: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);

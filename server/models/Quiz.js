// server/models/Quiz.js
const mongoose = require('mongoose');

// Option Schema for questions
const optionSchema = new mongoose.Schema({
  text: { type: String },
  imageUrl: { type: String },
  isCorrect: { type: Boolean, default: false },
});

// Question Schema
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
  timer: { type: Number, default: 0 },
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [questionSchema], // Use questionSchema for questions
  createdOn: { type: Date, default: Date.now },
  impressions: { type: Number, default: 0 },
});

module.exports = mongoose.model('Quiz', quizSchema);

const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    min: 1
  },
  studentName: {
    type: String,
    required: true,
    min: 1
  },
  tutorID: {
    type: String,
    required: true,
    min: 1
  },
  tutorName: {
    type: String,
    required: true,
    min: 1
  },
  rentHours: {
    type: Number
  },
  startDate: {
    type: Date,
    required: true,
    min: 1
  },
  endDate: {
    type: Date,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  currentStatus: {
    type: String,
    required: true,
    min: 1
  },
  contractCreationDate: {
    type: Date,
    min: 1
  }
});

module.exports = mongoose.model('Contract', contractSchema);

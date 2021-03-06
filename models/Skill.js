const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Skill', userSchema);

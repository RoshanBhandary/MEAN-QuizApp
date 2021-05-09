const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    max: 200,
  },
  options: [
    {
      sentence: String,

      isAnswer: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Quizzes", appSchema);

const mongoose = require("mongoose");

const optionalQuestionaireSchema = new mongoose.Schema({
  typeQuestion: {
    type: Number,
  },
  choice: {
    type: Array,
  },
  question: {
    type: String,
  },
}, { timestamps: true });

const optionalQuestionaireModel = mongoose.model("optionalQuestionaire", optionalQuestionaireSchema);
module.exports = optionalQuestionaireModel;
const mongoose = require("mongoose");

const firstLoginQuestionaireSchema = new mongoose.Schema({
  typeQuestion: {
    type: Number,
  },
  choice: {
    type: Array,
  },
  question: {
    type: String,
  },
},);

const firstLoginQuestionaireSchemaModel = mongoose.model("firstLoginquestionaire", firstLoginQuestionaireSchema);
module.exports = firstLoginQuestionaireSchemaModel;
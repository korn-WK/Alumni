const mongoose = require("mongoose");

const alumniAnswerSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true,
    unique: true,
    ref: "user",
  },
  values: [
    {
      _id: false,
      question: {
        type: mongoose.ObjectId,
        ref: "firstLoginquestionaire",
      },
      value: {
        type: mongoose.Mixed,
        default: "",
      },
    }
  ],
});

const alumniAnswerModel = mongoose.model("answerfirstlogins", alumniAnswerSchema);
module.exports = alumniAnswerModel;
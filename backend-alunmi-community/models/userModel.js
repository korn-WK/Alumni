const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
  },
  firstLogin: {
    type: Number,
    default: 0
  },
  optionalLogin: {
    type: Array,
    default: []
  },
},);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
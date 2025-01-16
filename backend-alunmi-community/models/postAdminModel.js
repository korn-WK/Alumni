const mongoose = require("mongoose");

const postAdminSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  detail: {
    type: String,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

const postAdminModel = mongoose.model("postAdmin", postAdminSchema);
module.exports = postAdminModel;
const mongoose = require("mongoose");

// Schema สำหรับคอมเม้นท์
const commentSchema = new mongoose.Schema({
  userid: { type: mongoose.ObjectId },
  usercomment: { type: String, required: true },
  userimagecomment: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: String, required: true },
});

// Schema สำหรับโพสต์ของ Alumni
const postAlumniSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
  },
  topic: {
    type: mongoose.ObjectId,
    ref: "topic",
    required: true,
  },
  image: [ {
    type: String,
    default: "NoImage",
  }
  ],
  detail: {
    type: String,
  },
  date: {
    type: String,
    require: true,
  },
  visitedpost: {
    type: Number,
    default: 0, 
  },
  comments: [commentSchema], 
}, { timestamps: true });

const postAlumniModel = mongoose.model("postAlumni", postAlumniSchema);
module.exports = postAlumniModel;
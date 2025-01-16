const mongoose = require("mongoose");

const topicAdminSchema = new mongoose.Schema({
  nameTopic: {
    type: String,
  },
  color: {
    type: String,
  },
}, { timestamps: true },
);

const topicAdminModel = mongoose.model("topic", topicAdminSchema);
module.exports = topicAdminModel;
const MenageTopic = require('../models/topicModel')

exports.list = async (req, res) => {
  try {
    const docs = await MenageTopic.find();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const doc = new MenageTopic(data);
    const item = await doc.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const doc = await MenageTopic.findByIdAndUpdate(id, update, { new: true });
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await MenageTopic.findByIdAndDelete(id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await MenageTopic.findById(id);
    res.send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const FirstLoginQuestion = require('../models/firstLoginQuestionaireModel')

exports.firstLoginlList = async (req, res) => {
   try {
    const docs = await FirstLoginQuestion.find();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
}
}

exports.firstLoginCreate = async (req, res) => {
    try {
      const data = req.body;
      const doc = new FirstLoginQuestion(data);
      const item = await doc.save();
      res.status(201).send(item);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
exports.firstLoginUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const doc = await FirstLoginQuestion.findByIdAndUpdate(id, update, { new: true });
      res.status(200).send(doc);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
exports.firstLoginRemove = async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await FirstLoginQuestion.findByIdAndDelete(id);
      res.status(200).send(doc);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

exports.firstLoginRead = async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await FirstLoginQuestion.findById(id);
      res.send(doc);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
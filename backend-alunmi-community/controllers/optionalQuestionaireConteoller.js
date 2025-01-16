const OptionalQuestion = require('../models/optionalQuestionaireModel')
const userModel = require('../models/userModel')

exports.optionalList = async (req, res) => {
  const { user } = req.body;

  try {
    const without = await userModel.findOne({ '_id': user }).select('optionalLogin');
    const docs = await OptionalQuestion.find({ _id: { $nin: without.optionalLogin } });

    if (docs.length === 0) {
      res.status(200).send(null); // ส่งคืนค่า null ถ้าไม่มีข้อมูล
    } else {
      res.status(200).send(docs);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.optionalListall = async (req, res) => {
   try {
    const docs = await OptionalQuestion.find();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
}
}

exports.optionalCreate = async (req, res) => {
    try {
      const data = req.body;
      const doc = new OptionalQuestion(data);
      const item = await doc.save();
      res.status(201).send(item);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
exports.optionalUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const doc = await OptionalQuestion.findByIdAndUpdate(id, update, { new: true });
      res.status(200).send(doc);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
exports.optionalRemove = async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await OptionalQuestion.findByIdAndDelete(id);
      res.status(200).send(doc);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

exports.optionalRead = async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await OptionalQuestion.findById(id);
      res.send(doc);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
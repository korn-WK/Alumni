const answerfirstloginsModel = require("../models/answerfirstlogins");

exports.firstloginAnwerList = async (req, res) => {
  try {
    const docs = await answerfirstloginsModel.aggregate([
      {
        $unwind: "$values"
      },

      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "Users"
        }
      },
      {
        $unwind: "$Users"
      },


      
      {
        $lookup: {
          from: "firstloginquestionaires",
          localField: "values.question",
          foreignField: "_id",
          as: "questionDetails"
        }
      },
      {
        $unwind: "$questionDetails"
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$Users.name" },
          values: {
            $push: {
              question: "$questionDetails.question",
              value: "$values.value"
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          user: 1,
          values: 1
        }
      }
    ]);
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Read
// exports.firstloginAnwerList = async (req, res) => {
//   try {
//     const docs = await answerfirstloginsModel.find().populate({
//       path: 'values.question',
//       model: 'firstLoginquestionaire',
//       select: 'question -_id' // เลือกเฉพาะฟิลด์ question เท่านั้น
//     });
//     res.status(200).send(docs);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };


// Create
exports.firstloginAnwerCreate =  async (req, res) => {
  try {
    const data = req.body;
    const doc = new answerfirstloginsModel(data);
    const item = await doc.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update
exports.firstloginAnwerUpdate =  async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const doc = await answerfirstloginsModel.findByIdAndUpdate(id, update, { new: true });
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete
exports.firstloginAnwerRemove =  async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await answerfirstloginsModel.findByIdAndDelete(id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// read one
exports.firstloginAnwerRead =  async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await answerfirstloginsModel.findById(id);
    res.send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
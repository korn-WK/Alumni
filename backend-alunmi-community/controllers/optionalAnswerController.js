const answeroptionalsModel = require("../models/answeroptionals");
const userModel = require('../models/userModel')



// Read
exports.optionalAnwerList = async (req, res) => {
  try {
    const docs = await answeroptionalsModel.aggregate([
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
          from: "optionalquestionaires",
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


// Create
exports.optionalAnwerCreate =  async (req, res) => {
  try {
    const data = req.body;
    const doc = new answeroptionalsModel(data);
    const item = await doc.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update
exports.optionalAnwerUpdate =  async (req, res) => {
  try {
    const {user,values} = req.body;

    const value = values[0] 
    const data = req.body;
    

const Olduser = await answeroptionalsModel.findOne({ 'user':user})

if(Olduser){

  const doc = await answeroptionalsModel.updateOne(
    { "user": user}, // เงื่อนไขเพื่อระบุเอกสาร
    { $push: { 
        "values": {
            "question": value.question,
            "value": value.value,
        }
    }}
  )
  await userModel.updateOne(
    { "_id": user}, // เงื่อนไขเพื่อระบุเอกสาร
    { $push: { 
        "optionalLogin": value.question
            
    }}
  )
  return  res.status(200).send(doc);

}else{

  if(data){
    const doc = new answeroptionalsModel(data);
    const item = await doc.save();

    await userModel.updateOne(
      { "_id": user}, // เงื่อนไขเพื่อระบุเอกสาร
      { $push: { 
          "optionalLogin": value.question
              
      }}
    )



    return res.status(200).send(item);
      
  }


}
    
return res.status(400).send('error');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete
exports.optionalAnwerRemove =  async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await answeroptionalsModel.findByIdAndDelete(id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// read one
exports.optionalAnwerRead =  async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await answeroptionalsModel.findById(id);
    res.send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
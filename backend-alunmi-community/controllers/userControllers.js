const base_URL = process.env.BASE_URL || 'http://localhost:5000';
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const fs = require('fs')
// Read all user
exports.userGetAll = async (req, res) => {
  try {
    const docs = await userModel.find({});
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


// Read a single user by ID
exports.userGetById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await userModel.findById(id);
    res.send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Create a new user with image upload
exports.userCreate = async (req, res) => {
  try {
    const data = req.body;

    // Check if a file was uploaded
    if (req.file) {
      // const host = req.protocol + '://' + req.get('host');
      data.image = `${base_URL}/uploads/${req.file.filename}`;
    }

    const doc = new userModel(data);
    const item = await doc.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


exports.userUpdate = async (req, res) => {
  try {

     
    const id = req.params.id;
    const update = req.body;
    
     if (req.file) {
      let oldfile = await userModel.findById(id).select('image -_id')
      const check = oldfile.image
      const separatedUrl = check.split('https://lh3.googleusercontent.com/')[1];
      if(separatedUrl){
        
          // const host = req.protocol + '://' + req.get('host');
        update.image = `${base_URL}/uploads/${req.file.filename}`;
        

      }else{
        
      const oldimage = oldfile.image.replace(/^.*\/uploads\//, "");
      await fs.unlink('./uploads/' + oldimage, (err) => {
       if (err) {
           console.log(err)
       } else {
            console.log('Remove success')
        }
    })


        // const host = req.protocol + '://' + req.get('host');
        update.image = `${base_URL}/uploads/${req.file.filename}`;
      }
 }
 
  const user = await userModel.findByIdAndUpdate(id, update, { new: true });

  const userInfo = {
    _id:user._id,
    name: user.name,
    email: user.email,
    role:user.role,
    image:user.image,
    firstLogin : user.firstLogin,
    optionalLogin : user.optionalLogin
  };

  console.log(userInfo)
     res.status(200).send(userInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


exports.userRemove = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await userModel.findByIdAndDelete(id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.userRemove = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await userModel.findByIdAndDelete(id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
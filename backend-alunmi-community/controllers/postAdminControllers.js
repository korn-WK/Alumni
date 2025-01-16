const base_URL = process.env.BASE_URL || 'http://localhost:5000';
const postAdminModel = require('../models/postAdminModel')
const fs = require('fs')

// Read all post admin
exports.postAdminGetAll = async (req, res) => {
  try {
    const docs = await postAdminModel.find({});
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Read a single post admin by ID
exports.postAdminGetById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await postAdminModel.findById(id);
    res.send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Create a new post admin with image upload
exports.postAdminCreate = async (req, res) => {
  try {
    const data = req.body;

    // Check if a file was uploaded
    if (req.file) {
      // const host = req.protocol + '://' + req.get('host');
      data.image = `${base_URL}/uploads/${req.file.filename}`;
    }

    const doc = new postAdminModel(data);
    const item = await doc.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


exports.postAdminUpdate = async (req, res) => {
  try {

     
    const id = req.params.id;
    const update = req.body;
    
     if (req.file) {
      let oldfile = await postAdminModel.findById(id).select('image -_id')
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
 
  const doc = await postAdminModel.findByIdAndUpdate(id, update, { new: true });
     res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


exports.postAdminRemove = async (req, res) => {
  try {
    const id = req.params.id;

    let oldfile = await postAdminModel.findById(id).select('image -_id')
    const oldimage = oldfile.image.replace(/^.*\/uploads\//, "");
    await fs.unlink('./uploads/' + oldimage, (err) => {
     if (err) {
         console.log(err)
     } else {
          console.log('Remove success')
      }
  })


    const doc = await postAdminModel.findByIdAndDelete(id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
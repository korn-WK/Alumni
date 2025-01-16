const userModel = require('../models/userModel')
const postAlumniModel = require('../models/postAlumniModel')
const bcrypt = require('bcryptjs')



exports.GetAdmin = async (req,res) => {
    try {
      let doc = await userModel.find({role:1}).select('_id email name ')
      res.status(200).send(doc);
    } catch (error) {
      console.log(error)
        res.status(500).send('Server Error')
    }
  }
  
  
  
  exports.AddAdmin = async (req, res) => {
    try {
        //code
        // 1.CheckUser
        const { email, name} = await req.body;
        console.log(req.body)



        var user = await userModel.findOne({ email })
        if (user) {
          var postalumni = await postAlumniModel.find({ user : user._id});
          console.log(postalumni)
          if(postalumni.length > 0){
            return res.status(200).send('havepost')
          }
          const update = {role:1,name:name}
          const doc = await userModel.findByIdAndUpdate(user._id, update, { new: true });
            return res.status(200).send(doc)
        }
        // 2.Encrypt
        users = new userModel({
          image: '',
          name : name,
          email :email,
          role: 1  
        })
        
        // 3.Save
        const doc =await users.save()
        const backdata = {email,'password':'Unknown',name,"_id":doc._id}
        res.status(200).send(backdata)
  
    } catch (error) {
        //code
        console.log(error)
        res.status(500).send('Server Error')
    }
  }




  exports.removeAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await userModel.findByIdAndDelete(id);
      res.status(200).send(doc);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
  exports.updateAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      let update = req.body;
      const { email } = await req.body;

      var user = await userModel.findOne({ email })
      var olduser = await userModel.findOne({ _id:id })

      if(user){
      if(user.email == olduser.email){
        const doc = await userModel.findByIdAndUpdate(id, update, { new: true });
        return res.status(200).send(doc);
      }
    }

        if (user) {

          var postalumni = await postAlumniModel.find({ user : user._id});
          console.log(postalumni)
          if(postalumni.length > 0){
            return res.status(200).send('havepost')
          }else{

            await userModel.findByIdAndDelete(user._id);
            const doc = await userModel.findByIdAndUpdate(id, update, { new: true });
            return res.status(200).send(doc);
          }
        }else{
        const doc = await userModel.findByIdAndUpdate(id, update, { new: true });
        return res.status(200).send(doc);
        }

      
      
    } catch (error) {
      res.status(500).send(error.message);
    }
}
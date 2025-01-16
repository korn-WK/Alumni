const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const CLIENT_ID = `${process.env.CLIENT_ID || '77058474582-k55ggfmlb2bd7cjo49uuj7nkqotd2veg.apps.googleusercontent.com'}`; 
const CLIENT_SECRET = `${process.env.CLIENT_SECRET || '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'}`;
const REDIRECT_URI = `${process.env.REDIRECT_URI || 'http://localhost:3000/login/'}`; 
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const alumnicode = `${process.env.ALUMNI_CODE || 'DevmodeAlumni'}`;
const admincode = `${process.env.ADMIN_CODE || 'DevmodeAdmin'}`;
const administratorcode = `${process.env.AMINISTRATOR_CODE || 'DevmodeAdministratorcode'}`;



exports.checker = async (req, res) => {
    try{
    let auth_token = await req.headers['authorization']
    if(auth_token){
        auth_token = auth_token.split(' ')[1]
        const decoded = jwt.verify(auth_token, `${alumnicode}`)
        let user = await Users.findOne({email:decoded.payload.user.email}).select('_id email name studentId role image firstLogin optionalLogin')
        res.status(200).send({"users":user})



    }}catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
    
}


exports.login = async (req, res) => {
    try {
        //code
        // 1. Check User
        const { email, password } = await req.body;
        var users = await Users.findOneAndUpdate({ email }, { new: true })
        if (users && users.password) {
            const isMatch = await bcrypt.compare(password, users.password)
            if (!isMatch) {
                return res.status(400).send('Password Invalid!!!')
            } else {
                    var payload = {user: {email: users.email,}}
                    const token = jwt.sign({payload}, `${alumnicode}`, { expiresIn: "1h" });
                    const Payload = {"token":token,"success":true,"role":users.role}
                      res.status(200).send(Payload);
            }
        } else {
            return res.status(400).send('User not found!!!')
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}


exports.AddAlumni = async (req, res) => {
    try {
        //code
        // 1.CheckUser
        const { email, password, name ,image,studentId,} = await req.body;
        console.log(req.body)
        var user = await Users.findOne({ email })
        if (user) {
            return res.status(400).send('User Already Exists!!!')
        }
        // 2.Encrypt
        const salt = await bcrypt.genSalt(10)
        users = new Users({
            image,
            name,
            email,
            role: 0
        })
        users.password = await bcrypt.hash(password, salt)
        // 3.Save
        await users.save()
        res.status(200).send('Add Alumni already Success!!')
  
    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
  }





  exports.googleToken = async (req, res) => {
    const { code } = req.body;
  
    try {
      const { tokens } = await client.getToken({ code });
      const AccessToken = tokens.access_token;
      const headers = {Authorization: `Bearer ${AccessToken}`};
      const response= await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', { headers })
      payload = {'email':response.data.email}
      let Olduser = await Users.findOne({ 'email':response.data.email })
        if (!Olduser) {
          users = new Users({
            image: response.data.picture,
            name : response.data.name,
            email :response.data.email,
            role: 0
        })
        Olduser = await users.save()
        }
      let access_token
      // สร้าง ข้อมูล ใส่ mongo
      if(Olduser.role == 0){
        
        access_token = jwt.sign({payload}, `${alumnicode}`, { expiresIn: "5h" });
      }
      else if(Olduser.role == 1){
        
        access_token = jwt.sign({payload}, `${admincode}`, { expiresIn: "5h" });
      }
      else if(Olduser.role == 2){
        
        access_token = jwt.sign({payload}, `${administratorcode}`, { expiresIn: "5h" });
      }
      
      //ทำ jwt ส่งไป
      
  
      res.status(200).send({'access_token':access_token});
    } catch (error) {
      console.error('Error exchanging authorization code for token:', error.message);
      res.status(500).send('Internal Server Error');
    }

  }
  

  exports.googleUserInfo = async (req, res) => {
    const  ticket  = req.headers['authorization'];
    const accessToken = ticket.split(' ')[1]
    //ตรวจ jwt 
    let decode;
  
    try {
      jwt.verify(accessToken, `${alumnicode}`, function(err, decoded) {
        if(err == null){decode = decoded;}
        else if (err) {
          jwt.verify(accessToken, `${admincode}`, function(err, decoded) {
            if(err == null){decode = decoded;}
            else if(err) {
              jwt.verify(accessToken, `${administratorcode}`, function(err, decoded) {
                if(err == null){decode = decoded;}
                else if(err){
                  throw new Error(err.message);
                }
              });
            }
          });    
        }
      });

      

      
      const user = await Users.findOne({ 'email':decode.payload.email })

      const userInfo = {
        _id:user._id,
        name: user.name,
        email: user.email,
        role:user.role,
        image:user.image,
        firstLogin : user.firstLogin,
        optionalLogin : user.optionalLogin
      };
  
      // Return user information
      res.status(200).send(userInfo);
    } catch (error) {
      console.error('Error retrieving user information:', error.message);
      res.status(500).send(error.message);
    }
  };
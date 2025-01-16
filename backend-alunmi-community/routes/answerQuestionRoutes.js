const { Router } = require("express");
const router = Router();
const { optionalAnwerRead,optionalAnwerCreate,optionalAnwerUpdate,optionalAnwerRemove,optionalAnwerList} = require('../controllers/optionalAnswerController')
const { firstloginAnwerList,firstloginAnwerCreate,firstloginAnwerUpdate,firstloginAnwerRemove,firstloginAnwerRead } = require('../controllers/firstLoginAnswerController')
const {auth,authadministrator} = require('../middleware/authenticationtoken')

// get All
router.get("/optional",authadministrator, optionalAnwerList)

// Create
router.post("/optional",auth, optionalAnwerCreate) 

// // update
 router.put("/optional/",auth, optionalAnwerUpdate)

// // remove
// router.delete("/optional/:id", optionalAnwerRemove)

// // get only one by id
// router.get('/optional/:id', optionalAnwerRead)




// get All
router.get("/firstlogin",authadministrator, firstloginAnwerList)

// Create
router.post("/firstlogin",auth, firstloginAnwerCreate) 

// // update
//router.put("/firstlogin/:id", firstloginAnwerUpdate)

// // remove
// router.delete("/firstlogin/:id", firstloginAnwerRemove)

// // get only one by id
// router.get('/firstlogin/:id', firstloginAnwerRead)














module.exports = router;
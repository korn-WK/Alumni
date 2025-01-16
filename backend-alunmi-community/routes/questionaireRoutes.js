const { Router } = require("express");
const router = Router();
const { optionalRead,optionalCreate,optionalUpdate,optionalRemove,optionalList,optionalListall} = require('../controllers/optionalQuestionaireConteoller')
const { firstLoginlList,firstLoginCreate,firstLoginUpdate,firstLoginRemove,firstLoginRead } = require('../controllers/fristLoginQuestionaireConteoller')
const {authadmin} = require('../middleware/authenticationtoken')
// get All



router.get("/optionalall" , optionalListall)

router.post("/optional" , optionalList)

// Create
router.post("/optionall",authadmin, optionalCreate) 

// update
router.put("/optional/:id",authadmin, optionalUpdate)

// remove
router.delete("/optional/:id",authadmin, optionalRemove)

// get only one by id
router.get('/optional/:id',authadmin, optionalRead)




// get All
router.get("/firstlogin", firstLoginlList)

// Create
router.post("/firstlogin",authadmin, firstLoginCreate) 

// update
router.put("/firstlogin/:id",authadmin, firstLoginUpdate)

// remove
router.delete("/firstlogin/:id",authadmin, firstLoginRemove)

// get only one by id
router.get('/firstlogin/:id',authadmin, firstLoginRead)



module.exports = router;
const { Router } = require("express");
const router = Router();
const { read,create,update,remove,list,getPostAlumniById} = require('../controllers/topicController')
const {authadmin} = require('../middleware/authenticationtoken')

// get All
router.get("/", list)

// Create
router.post("/",authadmin, create) 

// update
router.put("/:id",authadmin, update)

// remove
router.delete("/:id",authadmin, remove)

// get only one by id
router.get('/:id',authadmin, read)

module.exports = router;
const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const { userGetAll, userCreate, userUpdate, userRemove, userGetById} = require('../controllers/userControllers')
const {auth,authadmin} = require('../middleware/authenticationtoken')

// Set up multer storage
const storage = multer.diskStorage({
    destination: "./uploads", // Adjust the destination folder
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${Date.now()}${extname}`);
    },
});

// Create a multer instance
const upload = multer({ storage });

 // get All
 router.get("/",authadmin, userGetAll)

// get only one by id
// router.get('/:id', userGetById)

// Create
router.post("/", auth,upload.single("image"), userCreate)

// update
router.put("/:id", auth,upload.single("image"), userUpdate)

// remove
// router.delete("/:id", auth,userRemove)


module.exports = router;
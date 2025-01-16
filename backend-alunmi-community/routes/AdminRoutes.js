const { Router } = require("express");
const router = Router();
const {AddAdmin,GetAdmin,removeAdmin,updateAdmin} = require('../controllers/adminControllers')
const {authadministrator} = require('../middleware/authenticationtoken')
router.get("/",authadministrator, GetAdmin)

router.post("/",authadministrator, AddAdmin)

router.delete("/:id",authadministrator, removeAdmin)

router.put("/:id",authadministrator, updateAdmin)


module.exports = router;
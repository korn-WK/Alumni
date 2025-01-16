const { Router } = require("express");
const router = Router();
const { login ,checker ,AddAlumni,googleToken,googleUserInfo} = require('../controllers/authenticationControllers')

// router.get("/check", checker)

// router.post("/login", login)

// router.post("/addalumni", AddAlumni)

router.post("/user/google", googleToken)

router.get("/auth/user", googleUserInfo)


module.exports = router;
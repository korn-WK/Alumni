const express = require("express");
const { incrementVisit, getVisitCount } = require("../controllers/visitControllers");

const router = express.Router();

router.post("/increment", incrementVisit);
router.get("/count", getVisitCount);

module.exports = router;
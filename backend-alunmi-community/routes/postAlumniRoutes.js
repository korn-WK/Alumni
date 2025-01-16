const { Router } = require("express");
const router = Router();
const fs = require("fs");
const { upload } = require("../middleware/upload"); // Import multer configuration
const {
  postAlumniGettoDay,
  postAlumniGetAll,
  postAlumniGetById,
  incrementVisitPost,
  getVisitCountPost,
  postAlumniCreate,
  postAlumniUpdate,
  postAlumniRemove,
  postAlumniGetByIdTopic,
  postAlumniSelectDay,
  addComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/postAlumniControllers");
const { adminandalumni } = require("../middleware/authenticationtoken");

// ตรวจสอบว่าโฟลเดอร์ 'uploads' มีอยู่หรือไม่
const uploadPath = "./uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath); // สร้างโฟลเดอร์ถ้ายังไม่มี
}

// Middleware จัดการ Multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send({ error: err.message });
  } else if (err) {
    return res.status(400).send({ error: err.message });
  }
  next();
};

// Routes
router.get("/visitedpost/:id", getVisitCountPost); // Get visit count for a post
router.post("/visitedpost/:id", incrementVisitPost); // Increment visit count
router.post("/comments/:id", adminandalumni, addComment); // Add comment
router.get("/comments/:id", getComments); // Get comments for a post
router.put("/comments/:id/:commentId", editComment); // Edit a comment
router.delete("/comments/:id/:commentId", deleteComment); // Delete a comment

router.post("/admin/getselect", adminandalumni, postAlumniSelectDay); // Get posts by timeframe
router.get("/", postAlumniGetAll); // Get all posts
router.get("/admin/getpost", postAlumniGettoDay); // Get posts from today
router.get("/:id", adminandalumni, postAlumniGetById); // Get post by ID
router.get("/topic/:id", postAlumniGetByIdTopic); // Get posts by topic

router.post(
  "/",
  adminandalumni,
  upload,
  handleMulterError,
  postAlumniCreate
); 

router.put(
  "/:id",
  adminandalumni,
  upload,
  handleMulterError,
  postAlumniUpdate
); 

router.delete("/:id", adminandalumni, postAlumniRemove); // Delete a post

module.exports = router;

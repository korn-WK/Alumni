const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { postAdminGetAll, postAdminGetById, postAdminCreate, postAdminUpdate, postAdminRemove } = require('../controllers/postAdminControllers');
const { authadmin } = require('../middleware/authenticationtoken');

// ตรวจสอบว่าโฟลเดอร์ 'uploads' มีอยู่หรือไม่
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath); // ถ้าไม่มีให้สร้างโฟลเดอร์
}

// ตั้งค่าการจัดเก็บไฟล์ของ multer
const storage = multer.diskStorage({
  destination: uploadPath, // โฟลเดอร์ที่เก็บไฟล์
  filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      cb(null, `${Date.now()}${extname}`); // ตั้งชื่อไฟล์ใหม่เป็นเวลาและนามสกุลไฟล์เดิม
  },
});

// ฟังก์ชันตรวจสอบประเภทไฟล์ (อนุญาตแค่ภาพ)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // ถ้าไฟล์ถูกต้องให้อนุญาต
    } else {
        cb(new Error('Invalid file type'), false); // ถ้าไม่ถูกต้องให้แจ้งข้อผิดพลาด
    }
};

// สร้าง instance ของ multer พร้อมฟังก์ชันการกรองไฟล์
const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // จำกัดขนาดไฟล์ที่ 10 MB
});

// Routes
router.get("/", postAdminGetAll); // get all posts

// router.get('/:id', postAdminGetById); // ถ้าต้องการดึงข้อมูลโพสต์จาก id สามารถเปิดใช้งานได้

router.post("/", authadmin, upload.single("image"), async (req, res, next) => {
    try {
        await postAdminCreate(req, res); // เรียกใช้งาน controller
    } catch (error) {
        next(error); // ส่งข้อผิดพลาดไปยัง error handler
    }
});

router.put("/:id", authadmin, upload.single("image"), async (req, res, next) => {
    try {
        await postAdminUpdate(req, res); // เรียกใช้งาน controller
    } catch (error) {
        next(error); // ส่งข้อผิดพลาดไปยัง error handler
    }
});

router.delete("/:id", authadmin, async (req, res, next) => {
    try {
        await postAdminRemove(req, res); // เรียกใช้งาน controller
    } catch (error) {
        next(error); // ส่งข้อผิดพลาดไปยัง error handler
    }
});

module.exports = router;

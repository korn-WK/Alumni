const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // สร้าง hash จาก timestamp + original name
    const uniqueHash = crypto
      .createHash('sha256')
      .update(Date.now().toString() + file.originalname)
      .digest('hex')
      .slice(0, 16); // เอาแค่ 16 ตัวอักษรแรกเพื่อไม่ให้ชื่อยาวเกินไป

    cb(null, `MFU-Community-${uniqueHash}-${file.originalname}`);
  }
});

exports.upload = multer({ storage: storage }).array('image', 10);
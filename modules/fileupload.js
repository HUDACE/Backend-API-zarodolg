const router = require('express').Router();
const path = require('path');
const moment = require('moment');
var multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.UPLOADS_DIR)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = moment(Date.now()).format('YYYYMMDDHmmss')
      cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({storage: storage})

router.post('/upload', upload.single('file'), function (req, res, next) {
   
    res.status(200).send(req.file);
});

module.exports = router;
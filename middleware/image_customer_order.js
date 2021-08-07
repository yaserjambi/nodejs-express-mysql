const multer = require("multer");
const util = require("util");
const maxSize = 110 * 1024 * 1024;


const PATH = '/uploads/';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + PATH);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, "image" + Date.now() + "-" + file.originalname);
  },
});



let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).fields([{ name: 'file1', maxCount: 5 }, { name: 'file2', maxCount: 5 }, { name: 'title', maxCount: 10 },{ name: 'images', maxCount: 10 }])



let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

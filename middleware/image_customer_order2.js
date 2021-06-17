const multer = require("multer");
const util = require("util");
const maxSize = 110 * 1024 * 1024;

const PATH = '/uploads/2/';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + PATH);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null,"image"+Date.now()+"-"+file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})
//.single("file");
.array("file2",5);




let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

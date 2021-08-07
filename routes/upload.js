module.exports = app => {
  const note = require("../controllers/upload");
  var router = require("express").Router();
  const multer = require("multer");
  var upload = multer()
  //note.customer_uploadFiles



  const image_customer_uploadFile = require("../middleware/image_customer_order");



  router.post("/uploads", image_customer_uploadFile, note.uploadFiles);
  router.post("/uploads_many", image_customer_uploadFile, note.uploadFiles_many);

  router.post("/upload", image_customer_uploadFile, note.customer_uploadFiles);
  router.get("/images", note.customer_get_image)
  router.get("/images/:name", note.customer_download);

  
  app.use('/api/note', router);

};

module.exports = app => {
    const note = require("../controllers/upload");
  
    var router = require("express").Router();
  
    router.post("/upload",  note.customer_uploadFiles);
    router.get("/images",note.customer_get_image)
    router.get("/images/:name", note.customer_download);


    app.use('/api/note', router);
  
  };
  
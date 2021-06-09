module.exports = app => {
  const note = require("../controllers/note.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", note.create_note);

  // Retrieve all Tutorials
  router.get("/findAll", note.findAll_note);
  app.use('/api/note', router,function(req,res,next){
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
  });

};

module.exports = app => {
  const tutorials = require("../controllers/note.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", tutorials.create);

  // Retrieve all Tutorials
  router.get("/findAll", tutorials.findAll);

};

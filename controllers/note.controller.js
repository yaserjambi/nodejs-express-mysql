const db = require("../models");
const Note = db.tutorials;
const Op = db.Sequelize.Op;
module.exports = {

create : (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const note = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save Tutorial in the database
  Note.create(note)
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error create Note"
      });
    });
},

findAll : (req, res) => {

  Note.findAll().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Find Note"
      });
    });
},

}
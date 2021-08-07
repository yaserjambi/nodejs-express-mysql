const db = require("../models");
const multer = require("multer");

const Note = db.Note;
const item = db.item;

const Op = db.Sequelize.Op;
module.exports = {

  create_note: (req, res) => {
    // const data = {
    //   title: req.body.title,
    //   description: req.body.description

    // }

    const data = {
      description: "true"
    }
    for (let s of req.body.title) {
      Note.create(data)
        .then(data => {

          data.title = s.title
          data.save()



        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Error create Note"
          });
        });
    }
    res.json({ sucess: "success" });
    // Save Tutorial in the database

  },

  findAll_note: (req, res) => {

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

const IP_server = "localhost:8080"
const db = require("../models");
const image = db.image;
const image2 = db.image2;
const title_many = db.title_many
const image_customer_uploadFile = require("../middleware/image_customer_order");
const image_customer_uploadFile2 = require("../middleware/image_customer_order2");
const fs = require("fs");




module.exports = {
  customer_uploadFiles: async (req, res) => {


    const baseUrl = "http://" + IP_server + "/api/note/images/";



    try {
      if (req.files.file1) {

        for (let s of req.files.file1) {
          if (s == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
          await image.create({
            type: s.mimetype,
            name: s.originalname,
            imageUrl: baseUrl + s.filename,
          })
        }
      }


      if (req.files.file2) {

        for (let s of req.files.file2) {
          if (s == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }


          await image2.create({
            type: s.mimetype,
            name: s.originalname,
            imageUrl: baseUrl + s.filename,
          })



        }
      }
    } catch (err) {
      console.log(err);


      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }

      res.status(500).send({
        message: `Could not upload the file: . ${err}`,
      });
    }

  },

  customer_get_image: (req, res) => {
    const baseUrl = "http://" + IP_server + "/api/note/images/";

    const directoryPath = __basedir + "/uploads/";

    const id = req.params.id;
    let fileInfos = [];

    image2.findAll().then(data => {
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          res.status(500).send({
            message: "Unable to scan files!",
          });
        }
        files.forEach((file) => {
          fileInfos.push({
            name: file,
            imageUrl: baseUrl + file,
          });
        });
        res.send(fileInfos)
      });
    })
  },
  customer_download: (req, res) => {

    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  },



  uploadFiles: async (req, res) => {


    const baseUrl = "http://" + IP_server + "/api/note/images/";
    const combine = []
    const title = []
    const image = []


    try {


      console.log(req)
      if (req.files.file2) {

        for (let s of req.files.file2) {
          if (s == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
          image.push(s)
        }

        for (let s of req.body.title) {
          if (s == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
          title.push(s)
        }



        image.forEach((images, index) => {
          const titles = title[index];
          combine.push({ images, titles })
        });
        //  console.log(combine)

        for (let g of combine) {
          await image2.create({
            type: g.images.mimetype,
            name: g.images.originalname,
            imageUrl: baseUrl + g.images.filename,
            title: g.titles
          })


        }



      }
    } catch (err) {
      console.log(err);


      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }

      res.status(500).send({
        message: `Could not upload the file: . ${err}`,
      });
    }

  },


  uploadFiles_many: async (req, res) => {


    const baseUrl = "http://" + IP_server + "/api/note/images/";
    const combine = []
    const title = []
    const image = []

    console.log(req)

    try {

      if (req.body.file2) {
        for (let s of req.body.file2) {
          if (s == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
          image.push(s)
          

        }

        // for (let s of req.body.title) {
        //   if (s == undefined) {
        //     return res.status(400).send({ message: "Please upload a file!" });
        //   }
        //   title.push(s)
        // }



        // image.forEach((images, index) => {
        //   // const titles = title[index];

        // for (let s of images) {
        //   console.log(s)
        // }

        //   });

        // for (let g of combine) {
        //   await image2.create({
        //     type: g.images.mimetype,
        //     name: g.images.originalname,
        //     imageUrl: baseUrl + g.images.filename,
        //     title: g.titles
        //   })


        // }



      }



      // if (req.body.title) {
      //   for (let s of req.body.title) {
      //     if (s == undefined) {
      //       return res.status(400).send({ message: "Please upload a file!" });
      //     }
      //     title.push(s)
      //     console.log(s)
      //     await title_many.create({
      //       title: s
      //     }).then(ss => {
      //     })
      //   }
      // }









    } catch (err) {
      console.log(err);


      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }

      res.status(500).send({
        message: `Could not upload the file: . ${err}`,
      });
    }

  },






}

const IP_server = "localhost:8080"
const db = require("../models");
const image = db.image;
const image2 = db.image2;

const image_customer_uploadFile = require("../middleware/image_customer_order");
const image_customer_uploadFile2 = require("../middleware/image_customer_order2");




module.exports = {
customer_uploadFiles: async (req, res) => {


    const baseUrl = "http://" + IP_server + "/api/note/images/";



    try {
      await image_customer_uploadFile(req, res);
      console.log(req.files)

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

    image.findAll().then(data => {
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          res.status(500).send({
            message: "Unable to scan files!",
          });
        }
        let fileInfos = [];
        files.forEach((file) => {
          fileInfos.push({
            name: file.name,
            url: baseUrl + file.name,
          });

        });
        res.send(data)
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
}
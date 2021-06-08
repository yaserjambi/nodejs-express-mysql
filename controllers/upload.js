
const IP_server = "localhost:8080"
const db = require("../models");
const image = db.image;
const image_customer_uploadFile = require("../middleware/image_customer_order");

module.exports = {
customer_uploadFiles: async (req, res) => {
    const baseUrl = "http://" + IP_server + "/api/note/images/";

    try {
      await image_customer_uploadFile(req, res);

      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      image.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        imageUrl: baseUrl + req.file.filename,
      })
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      console.log(err);


      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }

      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
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
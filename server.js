const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const db = require("./models/index.js");

const app = express();
global.__basedir = __dirname;



app.use(cors("*"));

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

db.sequelize.sync()

require("./routes/note.routes")(app);
require("./routes/upload")(app);


app.get("/", (req, res) => {
  res.json({ message: "حياك كلكم" });
});


const PORT = 8080;
app.listen(PORT);


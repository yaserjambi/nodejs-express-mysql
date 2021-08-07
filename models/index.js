const dbConfig = require("../config/db.admin");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.item = require("./item.js")(sequelize, Sequelize);
db.Note = require("./note.model.js")(sequelize, Sequelize);
db.image = require("./image")(sequelize, Sequelize);
db.image2 = require("./image2")(sequelize, Sequelize);
db.title_many = require("./title")(sequelize, Sequelize);
db.image2.belongsTo(db.title_many, {
  as: "title_many",
});




module.exports = db;

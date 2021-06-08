module.exports = {
    HOST: "localhost",
    USER: "user_root",
    PASSWORD: "123456",
    DB: "nodejs-mysql",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

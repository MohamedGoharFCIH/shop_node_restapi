const config = require('../config');
const Sequelize = require("sequelize");

console.log("connect to db", config.database_name)
const sequelize = new Sequelize(
   config.database_name,
   config.database_username,
   config.database_password,
    {
      host: config.host,
      dialect: 'mysql',
      logging: false
    }
  );


module.exports = sequelize;

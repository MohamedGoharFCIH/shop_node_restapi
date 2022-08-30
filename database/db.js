const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.database_name,
    process.env.database_username,
    process.env.database_password,
    {
      host: process.env.host,
      dialect: 'mysql'
    }
  );


module.exports = sequelize;

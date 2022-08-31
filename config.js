
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
    database_name: process.env.database_name || "Shop",
    database_username: "root",
    database_password: "12345",
    host: "localhost",
    JWT_KEY: "jwt_token_this_should_be_longer_and_hidden_for_use_it_to_config_token",
    NODE_ENV: process.env.NODE_ENV || 'development',
}
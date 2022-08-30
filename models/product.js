const Sequelize = require('sequelize');

const sequelize = require('../database/db');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }


});

module.exports = Product;
const Sequelize = require('sequelize');

const sequelize = require('../database/db');

const Order_details = sequelize.define('order_details', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

});

module.exports = Order_details;
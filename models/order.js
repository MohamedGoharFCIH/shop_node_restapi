const Sequelize = require('sequelize');

const sequelize = require('../database/db');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    totalprice: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    }


});

module.exports = Order;
const Sequelize = require('sequelize');

const sequelize = require('../database/db');
const phoneValidationRegex = /^01[0-2]{1}[0-9]{8}/

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,

    },
    middlename: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,

    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token : {
        type : Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            validator: function(v) {
                return phoneValidationRegex.test(v); 
            },
        }
    },

});

module.exports = User;
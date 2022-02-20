const sequelize = require('sequelize');
const connection = require('../config');

const User = connection.define('users', {
    id: {
        type: sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
    },
    name: sequelize.STRING,
    otp: sequelize.STRING,
    otp_expiration_date: sequelize.DATE,
    phone_number: {
        type: sequelize.STRING,
        unique: true,
    },
});

module.exports = User;

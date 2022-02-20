const sequelize = require('sequelize');
const connection = new sequelize('db_user', 'root', 'password', {
    dialect: 'mysql',
});

module.exports = connection;

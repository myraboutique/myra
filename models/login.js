module.exports = (function(){

var db = require('../core/db');
var Sequelize = require('sequelize');

var Register = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    type: Sequelize.STRING,
    password: Sequelize.STRING,
    number: Sequelize.BIGINT,
    address: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
}, {
        timestamps: false
    });

    return Register;

})();

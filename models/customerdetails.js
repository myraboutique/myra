module.exports = (function(){

var db = require('../core/db');
var Sequelize = require('sequelize');

var CustomerDetails = db.define('customerdetails', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    gender: Sequelize.STRING,
    birthdate: Sequelize.DATEONLY,
    anniverysarydate: Sequelize.DATEONLY,
    mobilenumber: Sequelize.BIGINT,
    phonenumber: Sequelize.BIGINT,
    emailid: Sequelize.STRING,
    address: Sequelize.STRING,
    billingaddress: Sequelize.STRING,
    remark: Sequelize.STRING
}, {
        timestamps: false
    });

    return CustomerDetails;

})();

module.exports = (function(){

var db = require('../core/db');
var Sequelize = require('sequelize');

var OrderDetails = db.define('orderdetails', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    customerid : Sequelize.INTEGER,
    type: Sequelize.STRING,
    material: Sequelize.STRING,
    color: Sequelize.STRING,
    customization : Sequelize.STRING,
    cloth: Sequelize.STRING,
    date: Sequelize.STRING,
    orderdate: Sequelize.STRING,
    alertday: Sequelize.STRING,
    amount: Sequelize.BIGINT,
    measurement: Sequelize.STRING,
    status: Sequelize.STRING
}, {
        timestamps: false
    });

    return OrderDetails;

})();

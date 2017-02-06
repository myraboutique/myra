module.exports = (function(){

var db = require('../core/db');
var Sequelize = require('sequelize');

var Order = db.define('order', {
    Order_id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    Order_date : Sequelize.STRING
    //  Customer_id : Sequelize.INTEGER,
    //  Customer_name :Sequelize.STRING,
    //  Customer_email : Sequelize.STRING,     
    // Status: Sequelize.STRING
    
}, {
        timestamps: false
    });

    return Order;

})();

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
    state: Sequelize.STRING,
    travellingCaseCount: Sequelize.STRING,
    localCaseCount: Sequelize.STRING
}, {
        timestamps: false
    });

    return OrderDetails;

})();

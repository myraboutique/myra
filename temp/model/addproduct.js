module.exports = (function () {

    var db = require('../core/db');
    var Sequelize = require('sequelize');

    var addproduct = db.define('addproduct', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },       
        measurement: Sequelize.STRING    
    }, {
            timestamps: false
        });

    return addproduct;

})();

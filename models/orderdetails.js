module.exports = (function () {

    var db = require('../core/db');
    var Sequelize = require('sequelize');

    var OrderDetails = db.define('orderdetails', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        pair: Sequelize.STRING,
        timestamp: Sequelize.STRING,
        customerid: Sequelize.INTEGER,
        customerName: Sequelize.STRING,
        type: Sequelize.STRING,
        material: Sequelize.STRING,
        color: Sequelize.STRING,
        customization: Sequelize.STRING,
        cloth: Sequelize.STRING,
        deliverydate: Sequelize.STRING,
        orderdate: Sequelize.STRING,
        alertday: Sequelize.STRING,
        amount: Sequelize.BIGINT,
        measurement: Sequelize.STRING,
        stitchingdate: Sequelize.STRING,
        status: Sequelize.STRING,
        subdesign: Sequelize.STRING,
        browseimage: Sequelize.BLOB,  
        measurementname: Sequelize.STRING    
        }, {
            timestamps: false
        });

    return OrderDetails;
})();

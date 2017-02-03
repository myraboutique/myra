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
    // customerid : Sequelize.INTEGER,
    // customerName :Sequelize.STRING,
    // customeremail : Sequelize.STRING, 
    orderdetailid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    type: Sequelize.STRING,
    material: Sequelize.STRING,
    color: Sequelize.STRING,
    customization : Sequelize.STRING,
    cloth: Sequelize.STRING,
    deliverydate: Sequelize.STRING,
  //  orderdate: Sequelize.STRING,
    alertday: Sequelize.STRING,
    amount: Sequelize.BIGINT,
    measurement: Sequelize.STRING,
    stitchingdate:Sequelize.STRING,
    status: Sequelize.STRING,
            measureWAIST: Sequelize.INTEGER,
            measureWAIST: Sequelize.INTEGER,
            measureBUST: Sequelize.INTEGER,
            measureSH: Sequelize.INTEGER,
            measureLWAIST: Sequelize.INTEGER,
            measureHIPS: Sequelize.INTEGER,
            measureSLEEVES: Sequelize.INTEGER,
            measureSHORT: Sequelize.INTEGER,
            measuretype: Sequelize.INTEGER,
            measureLENGTH: Sequelize.INTEGER,
            measureFULL: Sequelize.INTEGER,
            measureFULLL: Sequelize.INTEGER,
            measureKNEE: Sequelize.INTEGER,
            measureARMHOLE: Sequelize.INTEGER,
            measureUTHIGH: Sequelize.INTEGER,
            measureLTHIGH: Sequelize.INTEGER,
            measureCALF: Sequelize.INTEGER,
            measureFNECK: Sequelize.INTEGER,
            measureBNECK: Sequelize.INTEGER,
            measureMORI: Sequelize.INTEGER,
            measureCROSS: Sequelize.INTEGER
    
}, {
        timestamps: false
    });

    return OrderDetails;

})();

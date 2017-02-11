module.exports = (function () {

    var db = require('../core/db');
    var Sequelize = require('sequelize');

    var CustomerDetails = db.define('customerdetails', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        customerName: Sequelize.STRING,
        gender: Sequelize.STRING,
        birthDate: Sequelize.STRING,
        anniversaryDate: Sequelize.STRING,
        anniversaryAlert: Sequelize.BOOLEAN,
        birthdayAlert: Sequelize.BOOLEAN,
        mobileNumber: Sequelize.BIGINT,
        phoneNumber: Sequelize.BIGINT,
        other: Sequelize.BOOLEAN,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
        billingAddress: Sequelize.STRING,
        remarks: Sequelize.STRING,
        measurementsname: Sequelize.STRING,
        measurementsvalue: Sequelize.STRING
        },
        {
            timestamps: false
        });

    return CustomerDetails;
})();

module.exports = (function () {

    var db = require('../core/db');
    var Sequelize = require('sequelize');

    var managemeasurements = db.define('managemeasurements', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        name: Sequelize.STRING,
        isActive: Sequelize.BOOLEAN
    }, {
            timestamps: false
        });

    return managemeasurements;

})();

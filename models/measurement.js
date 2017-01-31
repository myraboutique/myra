module.exports = (function () {

    var db = require('../core/db');
    var Sequelize = require('sequelize');

    var measurement = db.define('measurement', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        title: Sequelize.STRING,
        measurement: Sequelize.STRING,
        isActive: Sequelize.BOOLEAN,
        image: Sequelize.BLOB
    }, {
            timestamps: false
        });

    return measurement;

})();

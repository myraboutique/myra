module.exports = (function () {

    var db = require('../core/db');
    var Sequelize = require('sequelize');

    var AddMaterial = db.define('addmaterial', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        materialtype: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
    }, {
            timestamps: false
        });

    return AddMaterial;
})();

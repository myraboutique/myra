module.exports = (function () {

    var db = require('../core/db');
    var Sequelize = require('sequelize');

    var addsubdesign = db.define('addsubdesign', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        design: Sequelize.STRING,
        subdesign: Sequelize.STRING,
        subdesignimage: Sequelize.STRING,
        isActive: Sequelize.BOOLEAN
        // image: Sequelize.BLOB
    }, {
            timestamps: false
        });

    return addsubdesign;

})();

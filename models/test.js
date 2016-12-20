module.exports = (function(){

var db = require('../core/db');
var Sequelize = require('sequelize');

var Test = db.define('test', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    title: Sequelize.STRING,
     measurement: {
       type:Sequelize.TEXT
      },
    isActive: Sequelize.BOOLEAN,
}, {
        timestamps: false
    });

    return Test;

})();

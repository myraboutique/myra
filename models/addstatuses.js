module.exports = (function(){

var db = require('../core/db');
var Sequelize = require('sequelize');

var addstatuses = db.define('addstatuses', {
  id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
  },
  status: Sequelize.STRING,
  isActive : Sequelize.BOOLEAN,

}, {
        timestamps: false
    });

    return addstatuses;

})();

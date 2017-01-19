
module.exports = (function(){

   var config = require('../../config');
    var logger = require('../logger');
    var Sequelize = require('sequelize');

    var db = new Sequelize(config.db.database,config.db.user,config.db.password,{
        host:config.db.host,
        port:config.db.port
    });

    return db;
})();
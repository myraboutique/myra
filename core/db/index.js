/// <reference path="../../typings/tsd.d.ts" />
module.exports = (function(){
    var config = require('../../config');
    var types = require('./types');

    var m = require('./sequelize');
    
    if(config.db.type == types.mongodb){
        m = require('./mongoose');
    } else if (config.db.type == types.mysql || config.db.type == types.mssql){
         m = require('./sequelize');
    }

    return m;
})();
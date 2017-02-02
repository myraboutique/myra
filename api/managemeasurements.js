module.exports = (function(){
    var db = require('../db');

    var m = {
        GET: function(req, res, next){
          db.managemeasurements.find(req, res);
        }      
    };
    return m;
})();
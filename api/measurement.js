module.exports = (function(){
    var db = require('../db');

    var m = {
        GET: function(req, res, next){
          db.measurement.find(req, res);
        },
        POST : function(req,res,next){
            db.measurement.Create(req,res);
        },
        UPDATE: function(req,res,next){
            db.measurement.Update(req,res);
        }       
    };
    return m;
})();
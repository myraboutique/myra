module.exports = (function(){
  var db = require('../db');

  var m = {
    POST : function(req,res,next){
      db.managemeasurements.create(req,res);
    },
    GET : function(req,res,next){
      db.managemeasurements.find(req,res);
    },
    UPDATE : function(req,res,next){
      db.managemeasurements.Update(req,res);
    }
  };
  return m;
})();




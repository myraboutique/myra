module.exports = (function(){
  var db = require('../db');

  var m = {
    POST : function(req,res,next){
      db.addstatuses.create(req,res);
    },
    GET : function(req,res,next){
      db.addstatuses.find(req,res);
    },
    UPDATE : function(req,res,next){
      db.addstatuses.Update(req,res);
    }
  };
  return m;
})();

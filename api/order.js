module.exports = (function(){
  var db = require('../db');

  var m = {
    POST : function(req,res,next){
      db.order.create(req,res);
    },
    GET :function(req,res,next){
      db.order.find(req,res);                                                                                                                                                                                                                                                                                                                        
    },
    UPDATE : function(req,res,next){
      db.order.Update(req,res);
    },
    DELETE : function(req,res,next){
      db.order.Delete(req,res);
    }
  };
  return m;
})();
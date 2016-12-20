module.exports = (function(){
  var db = require('../db');

  var m = {
    POST : function(req,res,next){
      db.orderdetails.create(req,res);
    },
    GET :function(req,res,next){
      db.orderdetails.find(req,res);                                                                                                                                                                                                                                                                                                                        
    }
  };
  return m;
})();
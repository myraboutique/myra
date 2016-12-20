module.exports = (function(){
  var db = require('../db');

  var m = {
    POST: function(req,res,next){
      db.customerdetails.create(req,res);
    },
    GET :function(req,res,next){
      db.customerdetails.find(req,res);                                                           
    }
  };
  return m;
})();
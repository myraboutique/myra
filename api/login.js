module.exports = (function(){
    var db = require('../db');

    var m = {
        Login: function(req, res, next){
          db.login.login(req, res,next);
        },
         Register: function(req, res, next){
          db.login.register(req, res);
        },
       PUT : function(req,res,next){
        db.customerdetails.updateforRegister(req,res);
      },
        Update: function(req, res, next){
            db.login.update(req,res);
        },
        Update1: function(req, res, next){
            db.login.update1(req,res);
        },
        GET: function(req,res,next){
            db.login.Find(req,res);
        },
        forgotpassword : function(req,res,next){
            db.login.forgot(req,res);
        },
         LoginId : function(req,res,next){
            db.login.loginId(req,res);
        }
    };
    return m;
})();
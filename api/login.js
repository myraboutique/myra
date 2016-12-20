module.exports = (function(){
    var db = require('../db');

    var m = {
        Login: function(req, res, next){
          db.login.login(req, res,next);
        },
         Register: function(req, res, next){
          db.login.register(req, res);
        },
        Update: function(req, res, next){
            db.login.update(req,res);
        },
        GET: function(req,res,next){
            db.login.Find(req,res);
        }
    };
    return m;
})();
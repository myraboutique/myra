module.exports = (function(){
    var db = require('../db');

    var m = {
        
        POST : function(req,res,next){
            db.addproduct.Create(req,res);
        },
        GET : function(req,res,next){
            db.addproduct.find(req,res);
        }        
    };
    return m;
})();
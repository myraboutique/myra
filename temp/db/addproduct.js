/// <reference path="../typings/tsd.d.ts" />

module.exports = (function(){
  var models = require('../models').addproduct;
  var db = require('../core/db');
  var sequelize = require('sequelize');


  var m = {
   
    find: function(req, res){
      db.sync().then(function(){
        models.findAll().then(function(info){
          res.json(info);
        })
      })
      },
      Create: function(req, res){    
      db.sync().then(function(){
        models.create({
          measurement:req.body.measurement
        }).then(function(info){
          res.json(info);
        })
      })    
    }
  };
  return m;
})();

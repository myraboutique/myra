/// <reference path="../typings/tsd.d.ts" />

module.exports = (function(){
  var models = require('../models').measurement;
  var db = require('../core/db');
  var sequelize = require('sequelize');


  var m = {
    find: function(req, res){
     db.sync().then( function(){
       models.findAll().then(function(info){
         res.json(info);
       })
     })
    },
    create: function(req, res){
     // console.log(req.body.measurement);
      db.sync().then(function(){
        models.create({
          title:req.body.title,
          measurement :req.body.measurement,
          isActive : req.body.isActive
        }).then(function(info){
          res.json(info);
        })
      })
    }
  };
  return m;
})();

/// <reference path="../typings/tsd.d.ts" />

module.exports = (function(){
  var models = require('../models').orderdetails;
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
    create: function(req, res){
      console.log(req.body.date);
      console.log(req.body.orderdate);
      console.log(req.body.alertday)
      db.sync().then(function()
      {
        models.create(
          {
          customerid : req.body.customerid,
          type :  req.body.type,
          material: req.body.material,
          color : req.body.color,
          customization : req.body.customization,
          cloth : req.body.cloth,
          date : req.body.date ,
          alertday : req.body.alertday ,
          amount : req.body.amount,
          orderdate : req.body.orderdate,
          measurement: req.body.measurement,
          status :req.body.status 
        }).then(function(user)
        {
          res.json(user);
        })
      })
     
    }
  };
  return m;
})();

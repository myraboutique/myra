/// <reference path="../typings/tsd.d.ts" />

module.exports = (function(){
  var models = require('../models').addsubdesign;
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
    Create: function(req, res){
      db.sync().then(function () {
         models.findOne({ where: { design: req.body.design } }).then(function (user) {
      if (user) {
          return res.status(200).json({
            status: 'This Design  already exists.'
          });
          }
      else{
      db.sync().then(function(){
        models.create({
          design:req.body.design,
          subdesign :req.body.subdesign,
          subdesignimage : req.body.subdesignimage,
          isActive : req.body.isActive
          // image: req.body.image
        }).then(function(info){
          res.json(info);
        })
      })
    }
  })
    })
    },
    Update: function(req,res){
      db.sync().then(function(){
        models.update({
          design:req.body.design,
          subdesign :req.body.subdesign,
          subdesignimage : req.body.subdesignimage,
          isActive : req.body.isActive
          // image: req.body.image
        },{
          where:{id:req.body.id}
        }).then(function(info){
          res.json(info);
        })
      })
    }
  };
  return m;
})();

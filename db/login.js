/// <reference path="../typings/tsd.d.ts" />

module.exports = (function () {
  var models = require('../models').login;
  var db = require('../core/db');
  var sequelize = require('sequelize');

  var m = {
    login: function (req, res, next) {
      db.sync().then(function () {
        models.findOne({ where: { email: req.body.email } }).then(function (user) {
          if (!user) {
            return res.status(200).json({
              status: 'User not Found!'
            });
          } else if (user.dataValues.password != req.body.password) {
           return res.status(200).json({
              status: 'Password does not match!',
            });
          } else {
            res.json(user);
          }
        });
      });
    },
    register: function (req, res) {
      db.sync().then(function(){
        models.findOne({ where : {email : req.body.email}}).then(function(user){
          if(user){
            return res.status(200).json({
              status: 'user already exists'
            });
          } else {
            db.sync().then(function(){
              models.create({
                name : req.body.name,
                email: req.body.email,
                type: req.body.type,
                password:req.body.password,
                number:req.body.mobilenumber,
                address: req.body.address,
                isActive:req.body.isActive
              }).then(function(user){
                res.json(user);
              })
            })
          }
        })
      })
    },
    update: function(req, res){
      db.sync().then(function(){
        models.update(
          {
          password : req.body.password
        },
        {
          where : { id : req.body.id}
        }
        ).then(function(info){
          res.json(info);
        })
      })
    },
    Find: function(req,res){
      db.sync().then(function(){
        models.findAll().then(function(info){
          res.json(info);
        })
      })
    }
  };
  return m;
})();

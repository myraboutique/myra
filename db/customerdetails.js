/// <reference path="../typings/tsd.d.ts" />

module.exports = (function(){
  var models = require('../models').customerdetails;
  var db = require('../core/db');
  var sequelize = require('sequelize');


  var m = {
    find: function(req, res){
     db.sync().then(function () {
        models.findAll().then(function (info) {
          console.log(info);
            res.json(info);
        });
      });
    },
    create: function(req, res){
     
    }
  };
  return m;
})();

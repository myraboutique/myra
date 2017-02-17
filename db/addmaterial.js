/// <reference path="../typings/tsd.d.ts" />

module.exports = (function () {
  var models = require('../models').addmaterial;
  var db = require('../core/db');
  var sequelize = require('sequelize');

  var m = {
    find: function (req, res) {
      db.sync().then(function () {
        models.findAll().then(function (info) {
          res.json(info);
        });
      });
    },
    create: function (req, res) {
      db.sync().then(function () {
        models.findOne({ where: { materialtype: req.body.materialtype } }).then(function (user) {
          if (user) {
            return res.status(200).json({
              status: 'This material type already exists.'
            });
          }
          else {
            db.sync().then(function () {
              models.create(
                {
                  materialtype: req.body.materialtype,
                  active: req.body.active,
                }).then(function (user) {
                  res.json(user);
                })
            })
          }
        })
      })
    },
    Update: function (req, res) {
      db.sync().then(function () {
        models.findOne({ where: { materialtype: req.body.materialtype } }).then(function (info) {
          if (info && info.id != req.body.id) {
            return res.json({
              msg: 'already00++--'
            })
          }
          else {
            db.sync().then(function () {
              models.update({
                materialtype: req.body.materialtype,
                active: req.body.active,
              },
                {
                  where: { id: req.body.id }
                }).then(function (info) {
                  res.json(info);
                })
            })
          }
        })
      })
    }
  };

  return m;
})();

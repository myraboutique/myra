/// <reference path="../typings/tsd.d.ts" />

module.exports = (function () {
  var models = require('../models').addsubdesign;
  var db = require('../core/db');
  var sequelize = require('sequelize');


  var m = {
    find: function (req, res) {
      db.sync().then(function () {
        models.findAll().then(function (info) {
          res.json(info);
        })
      })
    },
    Create: function (req, res) {
      db.sync().then(function () {
        models.findOne({ where: { subdesign: req.body.subdesign } }).then(function (user) {
          if (user) {
            return res.status(200).json({
              status: "already78787878"
            });
          }
          else {
            db.sync().then(function () {
              models.create({
                design: req.body.design,
                subdesign: req.body.subdesign,
                subdesignimage: req.body.subdesignimage,
                isActive: req.body.isActive
                // image: req.body.image
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
        models.findOne({ where: { subdesign: req.body.subdesign } }).then(function (info) {
          if (info && info.id != req.body.id) {
            console.log("oyyyyyyyy");
            return res.json({
              msg: 'already00++--'
            })
          }
          else {
            db.sync().then(function () {
              console.log("bbbbbbbbbbbbbbba");
              models.update({
                design: req.body.design,
                subdesign: req.body.subdesign,
                subdesignimage: req.body.subdesignimage,
                isActive: req.body.isActive
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

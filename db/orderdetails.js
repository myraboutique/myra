/// <reference path="../typings/tsd.d.ts" />

module.exports = (function () {
  var models = require('../models').orderdetails;
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
    create: function (req, res) {
      db.sync().then(function () {
        models.create(
          {
            measurementname: req.body.measurementname,
            browseimage: req.body.browseimage,
            timestamp: req.body.timestamp,
            customerid: req.body.customerid,
            customerName: req.body.customerName,
            type: req.body.type,
            material: req.body.material,
            color: req.body.color,
            customization: req.body.customization,
            cloth: req.body.cloth,
            deliverydate: req.body.deliverydate,
            alertday: req.body.alertday,
            amount: req.body.amount,
            orderdate: req.body.orderdate,
            measurement: req.body.measurement,
            stitchingdate: req.body.stitchingdate,
            status: req.body.status,
            subdesign: req.body.subdesign,
            pair: req.body.pair
          }).then(function (user) {
            res.json(user);
          })
      })
    },
    Update: function (req, res) {
      db.sync().then(function () {
        models.update(
          {
            measurementname: req.body.measurementname,
            browseimage: req.body.browseimage,
            timestamp: req.body.timestamp,
            customerid: req.body.customerid,
            type: req.body.type,
            material: req.body.material,
            color: req.body.color,
            customization: req.body.customization,
            cloth: req.body.cloth,
            orderdate: req.body.orderdate,
            alertday: req.body.alertday,
            amount: req.body.amount,
            measurement: req.body.measurement,
            status: req.body.status,
            deliverydate: req.body.deliverydate,
            amount: req.body.amount,
            subdesign: req.body.subdesign,
            stitchingdate: req.body.stitchingdate,
            pair: req.body.pair
          },
          {
            where: { id: req.body.id }
          }
        ).then(function (info) {
          res.json(info);
        })
      })
    },
    Delete: function (req, res) {
      db.sync().then(function () {
        models.destroy({
          where: {
            id: req.params.id
          }
        }).then(function (info) {
          res.json(info);
        })
      })
    },
    Summary: function (req, res) {
      db.sync().then(function () {
        models.findAll({
          where: { customerid: req.params.id }
        }).then(function (info) {
          res.json(info);
        })
      })
    },
    findid: function (req, res) {
      db.sync().then(function () {
        models.findOne({ where: { id: req.params.id } }).then(function (info) {
          res.json(info);
        })
      })
    }
  };
  return m;
})();

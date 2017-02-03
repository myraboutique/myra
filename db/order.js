/// <reference path="../typings/tsd.d.ts" />

module.exports = (function () {
  var models = require('../models').order;
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
            Order_date :req.body.orderdate,
            Customer_id : req.body.customerid,
            Customer_name : req.body.customername,
            Customer_email : req.body.customeremail,            
            Status: req.body.status
          }).then(function (user) {
            res.json(user);
          })
      })

    },
    Update: function (req, res) {
      // console.log(req.body);
      db.sync().then(function () {
        models.update(
          {
            Order_date :req.body.orderdate,
            Customer_id : req.body.customerid,
            Customer_name : req.body.customername,
            Customer_email : req.body.customeremail,            
            Status: req.body.status
          },
          {
            where: { Order_id: req.params.id }
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
            Order_id: req.params.id
          }
        }).then(function (info) {
          res.json(info);
        })
      })
    }
  };
  return m;
})();

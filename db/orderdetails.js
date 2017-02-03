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
      // console.log(req.body.date);
      // console.log(req.body.orderdate);
      // console.log(req.body.alertday);
      db.sync().then(function () {
        models.create(
          {
            // customerid : req.body.customerid,
            // customerName : req.body.customerName,
            // customeremail : req.body.customeremail,
            orderdetailid: req.body.orderdetailid,
            orderid: req.body.orderid,
            type: req.body.type,
            material: req.body.material,
            color: req.body.color,
            customization: req.body.customization,
            cloth: req.body.cloth,
            deliverydate: req.body.date,
            alertday: req.body.alertday,
            amount: req.body.amount,
            // orderdate : req.body.orderdate,
            measurement: req.body.measurement,
            stitchingdate: req.body.stitchingdate,
            status: req.body.status,
            measureWAIST: req.body.measureWAIST,
            measureWAIST: req.body.measureWAIST,
            measureBUST: req.body.measureBUST,
            measureSH: req.body.measureSH,
            measureLWAIST: req.body.measureLWAIST,
            measureHIPS: req.body.measureHIPS,
            measureSLEEVES: req.body.measureSLEEVES,
            measureSHORT: req.body.measureSHORT,
            measuretype: req.body.measuretype,
            measureLENGTH: req.body.measureLENGTH,
            measureFULL: req.body.measureFULL,
            measureFULLL: req.body.measureFULLL,
            measureKNEE: req.body.measureKNEE,
            measureARMHOLE: req.body.measureARMHOLE,
            measureUTHIGH: req.body.measureUTHIGH,
            measureLTHIGH: req.body.measureLTHIGH,
            measureCALF: req.body.measureCALF,
            measureFNECK: req.body.measureFNECK,
            measureBNECK: req.body.measureBNECK,
            measureMORI: req.body.measureMORI,
            measureCROSS: req.body.measureCROSS
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
            // customerid : req.body.customerid,
            // type :  req.body.type,
            // material: req.body.material,
            // color : req.body.color,
            // customization : req.body.customization,
            // cloth : req.body.cloth,
            // date : req.body.date ,
            // alertday : req.body.alertday ,
            // amount : req.body.amount,
            // orderdate : req.body.orderdate,
            // measurement: req.body.measurement,
            // status :req.body.status 
            orderdetailid: req.body.orderdetailid,
            orderid: req.body.orderid,
            type: req.body.type,
            material: req.body.material,
            color: req.body.color,
            customization: req.body.customization,
            cloth: req.body.cloth,
            deliverydate: req.body.date,
            alertday: req.body.alertday,
            amount: req.body.amount,
            measurement: req.body.measurement,
            stitchingdate: req.body.stitchingdate,
            status: req.body.status,
            measureWAIST: req.body.measureWAIST,
            measureWAIST: req.body.measureWAIST,
            measureBUST: req.body.measureBUST,
            measureSH: req.body.measureSH,
            measureLWAIST: req.body.measureLWAIST,
            measureHIPS: req.body.measureHIPS,
            measureSLEEVES: req.body.measureSLEEVES,
            measureSHORT: req.body.measureSHORT,
            measuretype: req.body.measuretype,
            measureLENGTH: req.body.measureLENGTH,
            measureFULL: req.body.measureFULL,
            measureFULLL: req.body.measureFULLL,
            measureKNEE: req.body.measureKNEE,
            measureARMHOLE: req.body.measureARMHOLE,
            measureUTHIGH: req.body.measureUTHIGH,
            measureLTHIGH: req.body.measureLTHIGH,
            measureCALF: req.body.measureCALF,
            measureFNECK: req.body.measureFNECK,
            measureBNECK: req.body.measureBNECK,
            measureMORI: req.body.measureMORI,
            measureCROSS: req.body.measureCROSS
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
    // Summary: function (req, res) {
    //   db.sync().then(function () {
    //     models.findAll({
    //       where: { customerid: req.params.id }
    //     }).then(function (info) {
    //       res.json(info);
    //     })
    //   })
    // }
  };
  return m;
})();

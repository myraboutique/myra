/// <reference path="../typings/tsd.d.ts" />

module.exports = (function () {
  var models = require('../models').customerdetails;
  var db = require('../core/db');
  var sequelize = require('sequelize');


  var m = {
    find: function (req, res) {
      db.sync().then(function () {
        models.findAll().then(function (info) {
          res.json(info);
        });
      });
    },//////end of find
    create: function (req, res) {
      console.log(req.body);
      db.sync().then(function () {
        models.create(
          {
            customerName: req.body.customerName,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            anniversaryDate: req.body.anniversaryDate,
            birthdayAlert: req.body.birthdayAlert,
            anniversaryAlert: req.body.anniversaryAlert,
            other: req.body.other,
            mobileNumber: req.body.mobileNumber,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: req.body.address,
            billingAddress: req.body.billingAddress,
            remarks: req.body.remarks,

            measureSH: req.body.measureSH,
            measureBUST: req.body.measureBUST,
             measureWAIST: req.body.measureWAIST,
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

    },/////end of create

    update: function (req, res) {
      db.sync().then(function () {
        models.update({
          customerName: req.body.customerName,
          gender: req.body.gender,
          birthDate: req.body.birthDate,
          anniversaryDate: req.body.anniversaryDate,
          mobileNumber: req.body.mobileNumber,
          other: req.body.other,
          birthdayAlert: req.body.birthdayAlert,
          anniversaryAlert: req.body.anniversaryAlert,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          address: req.body.address,
          billingAddress: req.body.billingAddress,
          remarks: req.body.remarks
        },
          {
            where: {
              id: req.body.id
            }
          }).then(function (info) {
            res.json(info)
          });
      })
    },//////end of update

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

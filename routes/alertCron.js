var CronJob = require('cron').CronJob;
var models = require('../models').customerdetails;
var order = require('../models').orderdetails;
var db = require('../core/db');
var sequelize = require('sequelize');
var nodemailer = require('nodemailer');

module.exports = (function () {
  var job = new CronJob({
    cronTime: '00 3 14 * * *',
    onTick: function () {
      console.log("inside cron job");
      db.sync().then(function () {
        models.findAll().then(function (info) {
          info.forEach(function (e) {
            if (e.dataValues.birthdayAlert == true) {
              var transpoter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'ankurpatel1302@gmail.com',
                  pass: 'ankur1302'
                }
              });

              var mainOptions = {
                from: 'Ankur Patel <ankurpatel1302@gmail.com>',
                to: e.dataValues.email,
                subject: 'Happy Wedding anniversary!',
                 text: '<h2>Dear</h2>' + e.dataValues.customerName +'\n\nMay the love you have for one another continue to grow and blossom with each passing year. Wishing you endless happiness, joy, and love on your birthday and always.\n\n Thanks & Regards,\n\nProT Systems.'
              };
              transpoter.sendMail(mainOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('message sent');
                }
              });
            }
            if (e.dataValues.anniversaryAlert == true) {
              var transpoter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'ankurpatel1302@gmail.com',
                  pass: 'ankur1302'
                }
              });

              var mainOptions = {
                from: 'Ankur Patel <ankurpatel1302@gmail.com>',
                to: e.dataValues.email,
                subject: 'Happy Wedding anniversary!',
                text: '<h2>Dear</h2>' + e.dataValues.customerName +'\n\nMay the love you have for one another continue to grow and blossom with each passing year. Wishing you endless happiness, joy, and love on your anniversary and always.\n\n Thanks & Regards,\n\nProT Systems.'
              };
              transpoter.sendMail(mainOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('message sent');
                }
              });
            }
          })
        });
      });
      db.sync().then(function () {
        order.findAll().then(function (info) {
          info.forEach(function (e) {
            if(e.dataValues.alertday){
            var x = e.dataValues.alertday;
            var a = x.split('/');
            var date = new Date(a[2], a[1] - 1, a[0]);
            date.setHours(0, 0, 0, 0, 0);
            console.log(date);
            var Today = new Date();
            Today.setHours(0, 0, 0, 0, 0);
            console.log(Today);
            if (date.getTime() == Today.getTime()) {
               var transpoter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'ankurpatel1302@gmail.com',
                  pass: 'ankur1302'
                }
              });

              var mainOptions = {
                from: 'Ankur Patel <ankurpatel1302@gmail.com>',
                to: e.dataValues.customeremail,
                subject: 'Password Reset',
                text: 'You are receiving this because have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://localhost:3000/#/password/ \n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
              };
              transpoter.sendMail(mainOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('message sent');
                }
              });
            }
            }
          })
        });
      });

    },
    start: false,
    //timeZone: 'America/Los_Angeles'
  });
  job.start();
})();

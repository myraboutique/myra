/// <reference path="../typings/tsd.d.ts" />

module.exports = (function () {
  var models = require('../models').login;
  var db = require('../core/db');
  var sequelize = require('sequelize');
  var nodemailer = require('nodemailer');
  var crypto = require('crypto');

  var m = {
    login: function (req, res, next) {
      db.sync().then(function () {
        models.findOne({ where: { username: req.body.username } }).then(function (user) {
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
      db.sync().then(function () {
        models.findOne({ where: {username : req.body.username } }).then(function (user) {
          if (user) {
            return res.status(200).json({
              status: 'username already exists'
            });
          } else {
            db.sync().then(function () {
              models.create({
                name: req.body.name,
                email: req.body.email,
                type: req.body.type,
                password: req.body.password,
                number: req.body.mobilenumber,
                address: req.body.address,
                isActive: req.body.isActive,
                username: req.body.username
              }).then(function (user) {
                res.json(user);
              })
            })
          }
        })
      })
    },
//  update: function (req, res) {
//       db.sync().then(function () {
//         models.update({
//           name: req.body.name,
//                 email: req.body.email,
//                 type: req.body.type,
//                 password: req.body.password,
//                 number: req.body.mobilenumber,
//                 address: req.body.address,
//                 isActive: req.body.isActive,
//                 username: req.body.username
//         },
//           {
//             where: {
//               id: req.body.id
//             }
//           }).then(function (info) {
//             res.json(info)
//           });
//       })
//     },

    update: function (req, res) {

      db.sync().then(function () {
        models.update(
          {
            password: req.body.password
          },
          {
            where: { id: req.body.id }
          }
        ).then(function (info) {
          res.json(info);
        })
      })
    },
     update1: function (req, res) {
      db.sync().then(function () {
        models.update(
          {
            password: req.body[1]
          },
          {
            where: { id: req.body[0] }
          }
        ).then(function (info) {
          res.json(info);
        })
      })
    },
    Find: function (req, res) {
      db.sync().then(function () {
        models.findAll().then(function (info) {
          res.json(info);
        })
      })
    },
    forgot: function (req, res) {

      db.sync().then(function () {
        models.findOne({ where: { username: req.body.username } }).then(function (user) {
          if (!user) {
            return res.status(200).json({
              status: 'User not Found!'
            });
          } else {
            var transpoter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'ankurpatel1302@gmail.com',
                pass: 'ankur1302'
              }
            });

            var mainOptions = {
              from: 'Ankur Patel <ankurpatel1302@gmail.com>',
              to: req.body.username,
              subject: 'Password Reset',
              text: 'You are receiving this because have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'https://myraboutique.herokuapp.com/#/password/'+user.dataValues.id+' \n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
          transpoter.sendMail(mainOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('message sent');
               res.json(user);
            }
          });
        };
      })
    })
  },
    loginId: function (req, res) {
      db.sync().then(function(){
        models.findAll({
          where:{id:req.params.id}
        }).then(function(info){
          res.json(info);
        })
      })
    },
};
return m;
})();

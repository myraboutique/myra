/// <reference path="../typings/tsd.d.ts" />

module.exports = (function()
{
  var models = require('../models').customerdetails;
  var db = require('../core/db');
  var sequelize = require('sequelize');


  var m = {
    find: function(req, res)
    {
     db.sync().then(function ()
      {
        models.findAll().then(function (info)
        {  
            res.json(info);
        });
      });
    },//////end of find
    create: function(req, res)
    {
      db.sync().then(function()
      {
        models.create(
          {
          customerName : req.body.customerName,
          gender :  req.body.gender,
          birthDate: req.body.birthDate,
          anniversaryDate : req.body.anniversaryDate,
          mobileNumber : req.body.mobileNumber,
          phoneNumber : req.body.phoneNumber,
          email : req.body.email,
          address : req.body.address,
          billingAddress : req.body.billingAddress,
          remarks : req.body.remarks,

        }).then(function(user)
        {
          res.json(user);
        })
      })

    },/////end of create

    update : function(req , res)
    {
        db.sync().then(function(){
          models.update({
            customerName : req.body.customerName,
            gender :  req.body.gender,
            birthDate: req.body.birthDate,
            anniversaryDate : req.body.anniversaryDate,
            mobileNumber : req.body.mobileNumber,
            phoneNumber : req.body.phoneNumber,
            email : req.body.email,
            address : req.body.address,
            billingAddress : req.body.billingAddress,
            remarks : req.body.remarks
            },
            {
            where: {
                id: req.body.id
                    }
             }).then(function(info){
               res.json(info)
             });
         })
         },//////end of update

         findid : function(req,res){
           db.sync().then(function(){
             models.findOne({ where: {id:  req.params.id} }).then(function(info){
               console.log(info.dataValues);
               res.json(info.dataValues);
             })
           })
         }
};
  return m;

})();

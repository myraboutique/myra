/// <reference path="../typings/tsd.d.ts" />

module.exports = (function()
{
  var models = require('../models').addstatuses;
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
    db.sync().then(function () {
      models.findOne({ where: { status: req.body.status } }).then(function (user) {
    if (user) {
      return res.status(200).json({
        status: 'already00++--'
      });
      }
    else {
    db.sync().then(function()
    {
      models.create(
        {
         status : req.body.status,
        isActive :  req.body.isActive,
        }).then(function(user)
      {
        res.json(user);
      })
    })}
    })
      })

  },
    Update: function(req,res){

      db.sync().then(function(){
         models.findOne({where: {status: req.body.status }}).then(function (info){
             if(info && info.id != req.body.id){
               return res.json({
                 msg: 'already00++--'
               })
        }
        
        else{
         db.sync().then(function(){
          models.update({
          status : req.body.status,
          isActive :  req.body.isActive,
        },
        {
          where:{id:req.body.id}
        }).then(function(info){
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

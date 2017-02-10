/// <reference path="../typings/tsd.d.ts" />

module.exports = (function(){
  var models = require('../models').measurement;
  var db = require('../core/db');
  var sequelize = require('sequelize');


  var m = {
    find: function(req, res){
     db.sync().then( function(){
       models.findAll().then(function(info){
         res.json(info);
       })
     })
    },
    Create: function(req, res){
      db.sync().then(function () {
         models.findOne({ where: { title: req.body.title } }).then(function (user) {
      if (user) {
          return res.status(200).json({
            status: 'This cloth style already exists.'
          });
          }
      else{
      db.sync().then(function(){
        models.create({
          title:req.body.title,
          measurement :req.body.measurement,
          isActive : req.body.isActive,
          // image: req.body.image
        }).then(function(info){
          res.json(info);
        })
      })
    }
  })
    })
    },
//     Update: function(req,res){
//       db.sync().then(function(){
//         models.update({
//           title:req.body.title,
//           measurement :req.body.measurement,
//           isActive : req.body.isActive
//           // image: req.body.image
//         },{
//           where:{id:req.body.id}
//         }).then(function(info){
//           res.json(info);
//         })
//       })
//     }
//   };
//   return m;
// })();
 Update: function(req,res){

      db.sync().then(function(){
         models.findOne({where: {title: req.body.title }}).then(function (info){
             if(info && info.id != req.body.id){
               return res.json({
                 msg: 'already00++--'
               })
        }
        
        else{
         db.sync().then(function(){
          models.update({
          title:req.body.title,
          measurement :req.body.measurement,
          isActive : req.body.isActive,
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

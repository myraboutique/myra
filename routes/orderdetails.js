module.exports = (function(){
  var express = require('express');
  var api = require('../api').orderdetails;

   var m = express.Router();

     m.route('/api/orderdetails')
        .post(api.POST)
        .get(api.GET)
        .put(api.UPDATE)
        .delete(api.DELETE)

    return m;
})();
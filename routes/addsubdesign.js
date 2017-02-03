module.exports = (function(){
  var express = require('express');
  var api = require('../api').addsubdesign;

   var m = express.Router();

     m.route('/api/addsubdesign')
        .post(api.POST)
        .get(api.GET)
        .put(api.UPDATE)

    return m;
})();

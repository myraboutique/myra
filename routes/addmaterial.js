module.exports = (function(){
  var express = require('express');
  var api = require('../api').addmaterial;

   var m = express.Router();

     m.route('/api/addmaterial')
        .post(api.POST)
        .get(api.GET)
        .put(api.UPDATE)

    return m;
})();

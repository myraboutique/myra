module.exports = (function () {
  var express = require('express');
  var api = require('../api').customerdetails;

  var m = express.Router();

  m.route('/api/customerdetails')
    .get(api.GET)
    .post(api.POST)
    .put(api.PUT);

  m.route('/api/customerdetails/:id')
    .get(api.FindId)

 

  return m;
})();

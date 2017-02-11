module.exports = (function () {
  var express = require('express');
  var api = require('../api').order;

  var m = express.Router();

  m.route('/api/order')
    .post(api.POST)
    .get(api.GET)
  //.put(api.UPDATE)
  //.delete(api.DELETE)

  m.route('/api/order/:id')
    .delete(api.DELETE)
    .put(api.UPDATE)

  return m;
})();
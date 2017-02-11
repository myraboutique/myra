module.exports = (function () {
  var express = require('express');
  var api = require('../api').addstatuses;

  var m = express.Router();

  m.route('/api/addstatuses')
    .post(api.POST)
    .get(api.GET)
    .put(api.UPDATE)

  return m;
})();
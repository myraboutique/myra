module.exports = (function () {

    var express = require('express');
    var api = require('../api').managemeasurements;

    var m = express.Router();

    m.route('/api/managemeasurements')
        .post(api.POST)
        .get(api.GET)
        .put(api.UPDATE)

    return m;
})();

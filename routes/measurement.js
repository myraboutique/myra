
module.exports = (function () {

    var express = require('express');
    var api = require('../api').measurement;

    var m = express.Router();

    m.route('/api/measurement')
        .get(api.GET)
        .post(api.POST)
        .put(api.UPDATE);

    return m;
})();


module.exports = (function () {

    var express = require('express');
    var api = require('../api').managemeasurements;

    var m = express.Router();

    m.route('/api/managemeasurements')
        .get(api.GET);


    return m;
})();

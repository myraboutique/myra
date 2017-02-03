
module.exports = (function () {

    var express = require('express');
    var api = require('../api').addproduct;

    var m = express.Router();

    m.route('/api/addproduct')       
        .post(api.POST)
        .get(api.GET);

    return m;
})();

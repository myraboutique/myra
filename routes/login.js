
module.exports = (function () {

    var express = require('express');
    var api = require('../api').login;

    var m = express.Router();

    m.route('/api/login')
        .post(api.Login);

    m.route('/api/login/:id')
        .get(api.LoginId);    

    m.route('/api/register')
        .post(api.Register)
        .put(api.Update)
        .get(api.GET);

    m.route('/api/forgot')    
        .post(api.forgotpassword)
        .put(api.Update1)
    return m;
})();

module.exports = (function () {
    var login = require('./login');
    var order = require('./order');
    var orderdetails = require('./orderdetails');
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addmaterial = require('./addmaterial');
    var alert = require('./alertCron');
    var m = [
        login,
        order,
        orderdetails,
        customerdetails,
        measurement,
        addmaterial
    ];
    return m;
})();

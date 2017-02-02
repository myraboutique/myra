module.exports = (function () {

    var login = require('./login');
    var orderdetails = require('./orderdetails');
    var order = require('./order');
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addmaterial = require('./addmaterial');
    var managemeasurements = require('./managemeasurements');
    var m = {
        login: login,
        order:order,
        orderdetails: orderdetails,
        customerdetails: customerdetails,
        measurement: measurement,
        addmaterial: addmaterial,
        managemeasurements:managemeasurements
    };
    return m;
})();

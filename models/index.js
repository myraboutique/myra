module.exports = (function () {

    var login = require('./login');
    var order = require('./order');
    var orderdetails = require('./orderdetails');
    var order = require('./order');
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addsubdesign = require('./addsubdesign');
    var addmaterial = require('./addmaterial');
    var managemeasurements = require('./managemeasurements');
    var addsubdesign = require('./addsubdesign');
    var addstatuses = require('./addstatuses');

    var m = {
        login: login,
        order: order,
        orderdetails: orderdetails,
        customerdetails: customerdetails,
        measurement: measurement,
        addmaterial: addmaterial,
        managemeasurements: managemeasurements,
        addsubdesign: addsubdesign,
        addstatuses: addstatuses
    };
    return m;
})();

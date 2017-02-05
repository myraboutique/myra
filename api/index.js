module.exports = (function () {
    var login = require('./login');
    var orderdetails = require('./orderdetails');
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addmaterial = require('./addmaterial');
    var managemeasurements = require('./managemeasurements');
    var addsubdesign = require('./addsubdesign');
    var addstatuses = require('./addstatuses');
    var m = {
        login: login,
        orderdetails: orderdetails,
        customerdetails: customerdetails,
        measurement: measurement,
        addmaterial: addmaterial,
        managemeasurements: managemeasurements,
        addsubdesign: addsubdesign,
        addstatuses : addstatuses
    };

    return m;
})();

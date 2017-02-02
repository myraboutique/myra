module.exports = (function () {

    var login = require('./login');
    var orderdetails = require('./orderdetails');
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addmaterial = require('./addmaterial');
    var managemeasurements = require('./managemeasurements');
    // var addproduct = require('./addproduct');
    var m = {
        login: login,
        // addproduct:addproduct,
        orderdetails: orderdetails,
        customerdetails: customerdetails,
        measurement: measurement,
        addmaterial: addmaterial,
        managemeasurements:managemeasurements
    };
    return m;
})();

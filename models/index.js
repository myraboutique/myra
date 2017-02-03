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
    // var addproduct = require('./addproduct');
    var m = {
        login: login,
        order:order,
        // addproduct:addproduct,
        orderdetails: orderdetails,
        customerdetails: customerdetails,
        measurement: measurement,
        addmaterial: addmaterial,
        managemeasurements:managemeasurements,
        addsubdesign : addsubdesign
    };
    return m;
})();

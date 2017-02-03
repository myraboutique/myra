module.exports = (function () {
    var login = require('./login');
    var order = require('./order');   
    var orderdetails = require('./orderdetails');
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addmaterial = require('./addmaterial');
    // var addproduct = require('./addproduct');
    var managemeasurements = require('./managemeasurements');
    var addsubdesign = require('./addsubdesign');
    var m = {
        login: login,
        order:order,
        orderdetails: orderdetails,
        customerdetails: customerdetails,
        measurement: measurement,
        addmaterial: addmaterial,
        addsubdesign: addsubdesign,
        // addproduct: addproduct,        
        managemeasurements:managemeasurements
    };

    return m;
})();

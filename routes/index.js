module.exports = (function () {
    var login = require('./login');
    var order = require('./order');
    var orderdetails = require('./orderdetails');
    var order = require('./order');   
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addmaterial = require('./addmaterial');
    var alert = require('./alertCron');
    var addsubdesign = require('./addsubdesign');
    var managemeasurements = require('./managemeasurements');
    //  var addproduct = require('./addproduct');
    var addstatuses = require('./addstatuses');
    
    var m = [
        login,
        order,
        orderdetails,
        customerdetails,
        measurement,
        addmaterial,
        managemeasurements,
        addsubdesign,
        addstatuses

    ];
    return m;
})();
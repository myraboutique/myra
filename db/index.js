module.exports = (function(){

    var login = require('./login');
    var order = require('./order');
    var orderdetails = require('./orderdetails');
    var customerdetails = require('./customerdetails');
    var measurement = require('./measurement');
    var addmaterial = require('./addmaterial') ;
    var managemeasurements = require('./managemeasurements');

    var m = {
        order:order,
        orderdetails : orderdetails,
        login : login,
        customerdetails: customerdetails,
        measurement : measurement,
        addmaterial : addmaterial,
        managemeasurements : managemeasurements
    };

    return m;
})();

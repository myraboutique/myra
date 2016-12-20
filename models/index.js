module.exports = (function(){

    var login = require('./login');
    var orderdetails = require('./orderdetails');
    var customerdetails = require('./customerdetails');
   var measurement = require('./measurement');
   var test = require('./test');
   var addmaterial = require('./addmaterial') ;

    var m = {
        login: login,
        orderdetails : orderdetails,
        customerdetails : customerdetails,
        measurement : measurement,
        addmaterial : addmaterial
    };
    return m;
})();

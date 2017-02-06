module.exports = (function(){

var db = require('../core/db');
var  Sequelize = require('sequelize');

var CustomerDetails = db.define('customerdetails', {
  id: {
      type:  Sequelize.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
  },
  customerName :  Sequelize.STRING,
  gender :  Sequelize.STRING,
  birthDate :  Sequelize.STRING,
  anniversaryDate :  Sequelize.STRING,
  anniversaryAlert :  Sequelize.BOOLEAN,
  birthdayAlert :  Sequelize.BOOLEAN,
  mobileNumber :  Sequelize.BIGINT,
  phoneNumber :  Sequelize.BIGINT,
  other:  Sequelize.BOOLEAN,
  email :  Sequelize.STRING,
  address :  Sequelize.STRING,
  billingAddress :  Sequelize.STRING,
  remarks :  Sequelize.STRING,
  measurementsname: Sequelize.STRING,
  measurementsvalue: Sequelize.STRING
    //    measureSH :  Sequelize.INTEGER,
    //    measureBUST: Sequelize.INTEGER,
    //    measureWAIST:  Sequelize.INTEGER,
    //    measureLWAIST:  Sequelize.INTEGER,
    //    measureHIPS :   Sequelize.INTEGER,
    //    measureSLEEVES :   Sequelize.INTEGER,
    //    measureSHORT :   Sequelize.INTEGER,
    //    measuretype :   Sequelize.INTEGER,
    //    measureLENGTH :   Sequelize.INTEGER,
    //    measureFULL :   Sequelize.INTEGER,
    //    measureFULLL :   Sequelize.INTEGER,
    //    measureKNEE :   Sequelize.INTEGER,
    //    measureARMHOLE :   Sequelize.INTEGER,
    //    measureUTHIGH : Sequelize.INTEGER,
    //    measureLTHIGH :   Sequelize.INTEGER,
    //    measureCALF :   Sequelize.INTEGER,
    //    measureFNECK :   Sequelize.INTEGER,
    //    measureBNECK :   Sequelize.INTEGER,
    //    measureMORI :   Sequelize.INTEGER,
    //    measureCROSS :   Sequelize.INTEGER
     

  
}, {
        timestamps: false
    });

    return CustomerDetails;

})();

angular.module('myra')
  .controller('newCustomerController', newCustomerController);

newCustomerController.$inject = ['$resource'];

function newCustomerController($resource) {

  var vm = this;
  vm.measurementstype = [] ;
  vm.token = JSON.parse(localStorage.getItem('token'));
  vm.birthdate = birthdate;
  vm.anniversarydate = anniversarydate;
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.check = check;
  vm.cancel = cancel;
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var orderdate = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();

  var CustomerDetails = $resource('/api/customerdetails')

  function cancel() {
    window.location = '#/customerdetails';
  }

  vm.date1 = false;
  vm.date2 = false;

  function birthdate(date) {
    var b = date.split('/');
    var Date1 = new Date(b[2], b[1] - 1, b[0]);
    Date1.setHours(0, 0, 0, 0, 0);
    myDate.setHours(0,0,0,0,0);
    if (myDate < Date1) {
      vm.date1 = true;

    } else {
      vm.date1 = false;

    }
  }

  function anniversarydate(date) {
    var b = date.split('/');
    var Date1 = new Date(b[2], b[1] - 1, b[0]);
    Date1.setHours(0, 0, 0, 0, 0);
    myDate.setHours(0,0,0,0,0);
    if (myDate < Date1) {
      vm.date2 = true;

    } else {
      vm.date2 = false;

    }
  }

  function check(form) {
    vm.formSubmitted = true;
    if (form.$valid && !vm.date1 && !vm.date2) {
      var customerdetails = new CustomerDetails();

       var i, c, txt = "";
       var x =  vm.customerName;
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i ==0) {
                c = c.toUpperCase();
            }
            txt += c;
       }
   console.log(txt);
      customerdetails.customerName = txt;
      customerdetails.gender = vm.gender;
      customerdetails.other = vm.other;
      if (!vm.other) {
        customerdetails.billingAddress = vm.address;
      } else {
        customerdetails.billingAddress = vm.billingAddress;
      }
      customerdetails.birthDate = vm.birthDate;
      customerdetails.anniversaryDate = vm.anniversaryDate;
      customerdetails.mobileNumber = vm.mobileNumber;
      customerdetails.phoneNumber = vm.phoneNumber;
      customerdetails.email = vm.email;
      customerdetails.address = vm.address;
      customerdetails.anniversaryAlert = true;
      customerdetails.birthdayAlert = true;
      customerdetails.remarks = vm.remarks;
      
      customerdetails.measureSH = vm.data[0];
      customerdetails.measureBUST=vm.data[1];
      customerdetails.measureWAIST=vm.data[2];
      customerdetails.measureLWAIST=vm.data[3];
      customerdetails.measureHIPS=vm.data[4];
      customerdetails.measureSLEEVES=vm.data[5];
      customerdetails.measureSHORT=vm.data[6];
      customerdetails.measuretype=vm.data[7];
      customerdetails.measureLENGTH=vm.data[8];
      customerdetails.measureFULL=vm.data[9];
      customerdetails.measureFULLL=vm.data[10];
      customerdetails.measureKNEE=vm.data[11];
      customerdetails.measureARMHOLE=vm.data[12];
       customerdetails.measureCROSS=vm.data[13];
      customerdetails.measureLTHIGH=vm.data[14];
      customerdetails.measureCALF=vm.data[15];
      customerdetails.measureFNECK=vm.data[16];
      customerdetails.measureBNECK=vm.data[17];
      customerdetails.measureMORI=vm.data[18];


      customerdetails.$save(function(info){

       swal("Record saved successfully.");
          window.location = '#/customerdetails';


       })


    }
  }
  var managemeasurements = $resource('/api/managemeasurements')
  managemeasurements.query(function(info){
    console.log(info);
     
      vm.measurementstype = info ;
      console.log(vm.measurementstype);
        
   });
}

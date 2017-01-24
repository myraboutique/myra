angular.module('myra')
  .controller('newCustomerController', newCustomerController);

newCustomerController.$inject = ['$resource'];

function newCustomerController($resource) {

  var vm = this;
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
      customerdetails.customerName = vm.customerName;
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


      customerdetails.$save(function(info){
      console.log( swal("Recored Saved Successfully."));
      window.location = '#/customerdetails';
       })

      
    }
  }

}

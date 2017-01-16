angular.module('myra')
  .controller('newCustomerController', newCustomerController);

newCustomerController.$inject = ['$resource'];

function newCustomerController($resource) {

  var vm = this ;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
  vm.check = check ;
  vm.cancel = cancel;

  var CustomerDetails = $resource('/api/customerdetails')

   function cancel(){
       window.location = '#/customerdetails';
      }

   function check(form){
     vm.formSubmitted = true;
     if(form.$valid){
     var customerdetails = new CustomerDetails() ;
     customerdetails.customerName = vm.customerName ;
     customerdetails.gender = vm.gender ;
     customerdetails.other = vm.other;
     if(!vm.other){
       customerdetails.billingAddress = vm.address ;
     } else {
       customerdetails.billingAddress = vm.billingAddress ;
     }
     customerdetails.birthDate = vm.birthDate ;
     customerdetails.anniversaryDate = vm.anniversaryDate ;
     customerdetails.mobileNumber = vm.mobileNumber ;
     customerdetails.phoneNumber =vm.phoneNumber;
     customerdetails.email = vm.email ;
     customerdetails.address = vm.address ;
     customerdetails.anniversaryAlert = true;
     customerdetails.birthdayAlert = true;
     
     customerdetails.remarks = vm.remarks ;

      customerdetails.$save(function(info){
       console.log(info) ;

       })
      window.location = '#/customerdetails';
    }
   }

}

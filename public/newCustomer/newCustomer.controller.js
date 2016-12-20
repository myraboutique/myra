angular.module('myra')
  .controller('newCustomerController', newCustomerController);

newCustomerController.$inject = ['$resource'];

function newCustomerController($resource) {

  var vm = this ;
  vm.check = check ;
  vm.cancel = cancel;

  var CustomerDetails = $resource('/api/customerdetails')

   function cancel(){
       window.location = '#/customerdetails';
      }

   function check(){

     var customerdetails = new CustomerDetails() ;
     customerdetails.customerName = vm.customerName ;
     customerdetails.gender = vm.gender ;
     customerdetails.birthDate = vm.birthDate ;
     customerdetails.anniversaryDate = vm.anniversaryDate ;
     customerdetails.mobileNumber = vm.mobileNumber ;
     customerdetails.phoneNumber =vm.phoneNumber;
     customerdetails.email = vm.email ;
     customerdetails.address = vm.address ;
     if(vm.sameasabove){
       customerdetails.billingAddress = vm.address ;
     } else {
       customerdetails.billingAddress = vm.billingAddress ;
     }
     customerdetails.remarks = vm.remarks ;

      customerdetails.$save(function(info){
       console.log(info) ;
       })
      window.location = '#/customerdetails';
   }


}

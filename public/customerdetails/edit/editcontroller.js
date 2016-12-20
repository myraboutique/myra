angular.module('myra')
  .controller('editController', editController);

editController.$inject = ['$stateParams','$resource','$http']

function editController($stateParams,$resource,$http) {

  var vm= this ;
  vm.save = save ;
  vm.cancel = cancel ;
  console.log("inside edit controller")
  vm.data = JSON.parse($stateParams.referer)

var CustomerDetails = $resource('/api/customerdetails')

var customerdetails = new CustomerDetails()

function cancel(){
  window.location = "#/customerdetails"
}

function save(){
  if(vm.sameasabove){
    customerdetails.billingAddress = vm.address ;
  } else {
    customerdetails.billingAddress = vm.billingAddress ;
  }
     $http.put('/api/customerdetails', vm.data)
        .then(
            function(response){
              console.log("put successfull")
              window.location = '#/customerdetails';
            },
            function(response){
                console.log("put unsuccessfull")
            }
         );

       }

}

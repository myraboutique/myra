angular.module('myra')
  .controller('editcustomerController', editcustomerController);

editcustomerController.$inject = ['$stateParams','$resource','$http']

function editcustomerController($stateParams,$resource,$http) {

  var vm= this ;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
  vm.save = save ;
  vm.cancel = cancel ;
  vm.data = JSON.parse($stateParams.referer)

var CustomerDetails = $resource('/api/customerdetails')

var customerdetails = new CustomerDetails()
vm.data.other = true;
function cancel(){
  window.location = "#/customerdetails"
}

function save(form){

  if(form.$valid){
    if(vm.data.other){
      vm.data.billingAddress = vm.data.billingAddress;
    } else {
      vm.data.billingAddress = vm.data.address;
    }
     $http.put('/api/customerdetails', vm.data)
        .then(
            function(response){
              console.log(swal("Recored Updated Successfully."))
              window.location = '#/customerdetails';
            },
            function(response){
                console.log("put unsuccessfull")
            }
         );

       }
  }
    

}

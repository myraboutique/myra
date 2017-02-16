angular.module('myra')
  .controller('editcustomerController', editcustomerController);

editcustomerController.$inject = ['$stateParams','$resource','$http']

function editcustomerController($stateParams,$resource,$http) {

  var vm= this ;
   vm.token = JSON.parse(localStorage.getItem('token'));
    vm.birthdate = birthdate;
  vm.anniversarydate = anniversarydate;
  if(!vm.token){
    window.location = '#/login';
  }
  vm.save = save ;
  vm.cancel = cancel ;
  vm.data = JSON.parse($stateParams.referer)
   var myDate = new Date();
var CustomerDetails = $resource('/api/customerdetails');

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

var customerdetails = new CustomerDetails()
vm.data.other = true;
function cancel(){
  window.location = "#/customerdetails"
}

function save(form){
  vm.formSubmitted = true;
  if(form.$valid){
    if(vm.data.other){
      vm.data.billingAddress = vm.data.billingAddress;
    } else {
      vm.data.billingAddress = vm.data.address;
    }
     $http.put('/api/customerdetails', vm.data)
        .then(
            function(response){
              console.log(swal("Your record has been saved successfully."))
              window.location = '#/customerdetails';
            },
            function(response){
                console.log("put unsuccessfull")
            }
         );

       }
  }
    

}

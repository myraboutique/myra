angular.module('myra')
  .controller('editcustomerController', editcustomerController)
  .directive('myDirective', function() {
     function link(scope, elem, attrs, ngModel) {
          ngModel.$parsers.push(function(viewValue) {
            var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/;            
            if (viewValue.match(reg)) {
              return viewValue;
            }
            var transformedValue = ngModel.$modelValue;
            ngModel.$setViewValue(transformedValue);
            ngModel.$render();
            return transformedValue;
          });
      }
      return {
          restrict: 'A',
          require: 'ngModel',
          link: link
      };      
  }); 
  
editcustomerController.$inject = ['$stateParams','$resource','$http']

function editcustomerController($stateParams,$resource,$http) {

  var vm= this ;
  
  vm.birthdate = birthdate;
  vm.anniversarydate = anniversarydate;
  vm.save = save ;
  vm.cancel = cancel ;
  vm.data = JSON.parse($stateParams.referer);
  vm.data.other = false;
  

  vm.customermeasurementname = JSON.parse(vm.data.measurementsname);
  vm.customermeasurementvalue = JSON.parse(vm.data.measurementsvalue);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }

  var myDate = new Date();

  var managemeasurements = $resource('/api/managemeasurements')
  managemeasurements.query(function(info){
      vm.measurementstype = info ;
   });

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
      vm.data.measurementsvalue = JSON.stringify(vm.customermeasurementvalue);
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

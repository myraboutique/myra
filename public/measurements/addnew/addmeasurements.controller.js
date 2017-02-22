angular.module('myra')
  .controller('addmeasurementsController', addmeasurementsController)
  .directive('myDirective', function() {
     function link(scope, elem, attrs, ngModel) {
          ngModel.$parsers.push(function(viewValue) {
            var reg = /^[^`~!@#$%\^&*()-_+={}|[\]\\:';"<>?,./]*$/;            
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

  

addmeasurementsController.$inject = ['$resource'];

function addmeasurementsController($resource) {

  var AddMeasurement = $resource('/api/managemeasurements')

  var vm = this;
  //vm.$scope.isDisabled = false;
  vm.flag = false ;
  vm.materialsave = materialsave;
  vm.materialcancel = materialcancel;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.active = true;
  function materialcancel() {
    window.location = "#/measurements"
  }
  function materialsave(frm) {
    vm.formSubmitted = true;
      if(frm.$valid){
    var addmaterial = new AddMeasurement();
    addmaterial.isActive = vm.active;
    addmaterial.name = vm.measure;
    //vm.$scope.isDisabled = true;

    addmaterial.$save(function (info) {

      if(!info.status){

        console.log(swal("Your record has been saved successfully."));
         window.location = "#/measurements"
      }
      else {
            vm.flag = true;
            vm.status = info.status ;
          }

    })

  }
  }

}

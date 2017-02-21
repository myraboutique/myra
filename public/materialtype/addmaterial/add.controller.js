angular.module('myra')
  .controller('addController', addController)
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

addController.$inject = ['$resource'];

function addController($resource) {

  var AddMaterial = $resource('/api/addmaterial')

  var vm = this;
  vm.flag = false ;
  vm.materialsave = materialsave;
  vm.materialcancel = materialcancel;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.active = true;
  function materialcancel() {
    window.location = "#/materialtype"
  }
  function materialsave(frm) {
    vm.formSubmitted = true;
      if(frm.$valid){
    var addmaterial = new AddMaterial();
    addmaterial.active = vm.active;
    addmaterial.materialtype = vm.materialtype;


    addmaterial.$save(function (info) {

      if(!info.status){

        console.log(swal("Your record has been saved successfully."));
         window.location = "#/materialtype"
      }
      else {
            vm.flag = true;
            vm.status = info.status ;
          }

    })

  }
  }

}

angular.module('myra')
  .controller('addstatusController', addstatusController)
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

addstatusController.$inject = ['$resource'];

function addstatusController($resource) {

  var Addstatus = $resource('/api/addstatuses')

  var vm = this;
  vm.flag = false ;
  vm.statussave = statussave;
  vm.statuscancel = statuscancel;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.isActive = true;
  function statuscancel() {
    window.location = "#/statustype"
  }
  function statussave(frm) {
    vm.formSubmitted = true;
      if(frm.$valid){
    var addstatus = new Addstatus();
    addstatus.isActive = vm.isActive;
    addstatus.status = vm.status;


    addstatus.$save(function (info) {
      if(info.status != 'already00++--'){

        console.log(swal("Your record has been saved successfully."));
         window.location = "#/statustype"
      }
      else {
            vm.flag = true;
            // vm.status = info.status ;
          }

    })

  }
  }

}

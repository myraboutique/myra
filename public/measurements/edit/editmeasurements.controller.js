angular.module('myra')
  .controller('editmeasurementsController', editmeasurementsController)
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

editmeasurementsController.$inject = ['$resource', '$stateParams', '$http'];

function editmeasurementsController($resource, $stateParams, $http) {
  var vm = this;
  vm.materialcancel = materialcancel;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
 // vm.data = JSON.parse($stateParams.referer);
 vm.data1=localStorage.getItem('editmeasurements');
  vm.data = JSON.parse(vm.data1);
  vm.update = update;

  function materialcancel(){
    window.location = '#/measurements';
  }

//   function update(frm) {
//     if (frm.$valid) {
//       $http.put('/api/managemeasurements', vm.data)
//         .then(
//         function (response) {

//           console.log("put successfull")
//           window.location = '#/measurements';

//         },
//         function (response) {
//           console.log("put unsuccessfull")
//         });
//     }

//   }
// }
function update(frm) {
    if (frm.$valid) {
      $http.put('/api/managemeasurements', vm.data)
        .then(
        function (response) {
        if(response.data.msg){
           vm.flag = true;
        }
        else
        {
           console.log("put successfull")
          window.location = '#/measurements';
        }
        
        });
    }

  }

  
}
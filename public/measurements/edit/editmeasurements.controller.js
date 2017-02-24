angular.module('myra')
  .controller('editmeasurementsController', editmeasurementsController)
  .directive('noSpecialChar', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == null)
            return ''
          cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    }
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
           console.log(swal("Your record has been Updated."));
           console.log("put successfull")
          window.location = '#/measurements';
        }
        
        });
    }

  }

  
}
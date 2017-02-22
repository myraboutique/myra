angular.module('myra')
  .controller('editmaterialController', editmaterialController)
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

editmaterialController.$inject = ['$resource', '$stateParams', '$http'];

function editmaterialController($resource, $stateParams, $http) {
  var vm = this;
  vm.flag = false;
  vm.materialcancel = materialcancel;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
 // vm.data = JSON.parse($stateParams.referer);
 vm.data1=localStorage.getItem('editmaterial');
  vm.data = JSON.parse(vm.data1);
  vm.update = update;

  function materialcancel(){
    window.location = '#/materialtype';
  }

//   function update(frm) {
//     if (frm.$valid) {
//       $http.put('/api/addmaterial', vm.data)
//         .then(
//               function (response) {
//               //console.log(response.data.msg);
//               if(!response.data.msg){
//                  console.log("put successfull")
//                 window.location = '#/materialtype';
//               }
//               else
//               {
               
//                 vm.flag = true;
//               }
            
//         });
//     }

//   }

//  }

function update(frm) {
    if (frm.$valid) {
      $http.put('/api/addmaterial', vm.data)
        .then(
        function (response) {
        if(response.data.msg){
           vm.flag = true;
        }
        else
        {
           console.log("put successfull")
          window.location = '#/materialtype';
        }
        
        });
    }

  }

  
}

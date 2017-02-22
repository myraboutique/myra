angular.module('myra')
  .controller('editstatusController', editstatusController)
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

editstatusController.$inject = ['$resource', '$stateParams', '$http'];

function editstatusController($resource, $stateParams, $http) {
  var vm = this;
   vm.flag = false;
  vm.statuscancel = statuscancel;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.data = JSON.parse($stateParams.referer);
  vm.update = update;

  function statuscancel(){
    window.location = '#/statustype';
  }

  function update(frm) {
    if (frm.$valid) {
      $http.put('/api/addstatuses', vm.data)
        .then(
        function (response) {
        // Console.log(response.data.msg) 
         if(response.data.msg){
            vm.flag = true;
        }
         else{

           console.log("put successfull")
          window.location = '#/statustype';
 
        }
    
        
        });
    }

  }

  
}

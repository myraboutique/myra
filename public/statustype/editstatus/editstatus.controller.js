angular.module('myra')
  .controller('editstatusController', editstatusController)
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
            
            console.log(swal("Your record has been Updated."));
           console.log("put successfull")
          window.location = '#/statustype';
 
        }
    
        
        });
    }

  }

  
}

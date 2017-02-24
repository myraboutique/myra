angular.module('myra')
  .controller('edituserController', edituserController)
  //new chnage(rupa)
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
edituserController.$inject = ['$resource', '$stateParams', '$http'];

function edituserController($resource, $stateParams, $http) {
  var vm = this;
  vm.flag = false;
  vm.cancel = cancel;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
 // vm.data = JSON.parse($stateParams.referer);
 vm.data1=localStorage.getItem('edituser');
  vm.data = JSON.parse(vm.data1);
  vm.update = update;

  function cancel(){
    window.location = '#/register';
  }


function update(userform) {
    if (frm.$valid) {
      $http.put('/api/users', vm.data)
        .then(
        function (response) {
        if(response.data.msg){
           vm.flag = true;
        }
        else
        { 
           
           console.log(swal("Your record has been Updated."));
           console.log("put successfull")
          window.location = '#/register';
        }
        
        });
    }

  }

  
}

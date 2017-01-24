angular.module('myra')

.controller('forgotpasswordController', forgotpasswordController);


forgotpasswordController.$inject = ['$resource','$state'];

function forgotpasswordController($resource,$state) {
  var vm = this;
    vm.submit = submit;
    vm.cancel = cancel;
    vm.flag = false ;
    var Forgot = $resource('/api/forgot');
    function cancel()
    {
      $state.go("login")
    }
    function submit(form){
      vm.formValidate = true;
      if(form.$valid){
      var forgot = new Forgot();
      forgot.email = vm.email;
      forgot.$save(function(info){
        if(info.status){
          // swal(info.status)
          vm.flag = true ;
        } else {
          swal('Reset password link has been sent to your registered email address.');
        window.location = '#/login';
        }

      });
    }
  }
}

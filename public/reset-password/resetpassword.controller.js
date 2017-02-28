angular.module('myra')
  .controller('resetpasswordController', resetpasswordController);

resetpasswordController.$inject = ['$resource','$http','$stateParams','$state'];

function resetpasswordController($resource,$http,$stateParams,$state) {
   var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
   vm.order = JSON.parse($stateParams.referer);
   var ResetPassword = $resource('/api/login/:id');
   ResetPassword.query({id:vm.order.id},function(info){
   vm.userData = info;
   })
  if(!vm.token){
    window.location = '#/login';
  }

  vm.change = change;
  vm.reset = reset;
  vm.check = check;
  vm.cancel = cancel;

function cancel()
{
  $state.go("register")
}
  function check(){
    if(vm.password && vm.newpassword){
    if(vm.password == vm.newpassword){
      vm.passsame = false;
    } else {
      vm.passsame = true
    }
    }
  }

  function reset(){

    if(vm.userData[0].password == vm.oldpassword){
      vm.same = false;
    } else {
      vm.same = true;
    }

  }

  function change(form){
   vm.formSubmitted= true;
    vm.userData[0].password = vm.newpassword;

   if(form.$valid && !vm.same){
      

       $http.put('/api/register',vm.userData[0])
        .then(
          function(response){
        
      
            vm.token.password = vm.newpassword;
            localStorage.setItem('token',JSON.stringify(vm.token));
            window.location = '#/register';
            console.log("Password Updated Successfully.")
                // window.location = '#/alert';
                window.location = '#/register';
        },
        function(err){
          console.log(err);
        });
   }

  }

}


angular.module('myra')
  .controller('resetpasswordController', resetpasswordController);

resetpasswordController.$inject = ['$resource','$http'];

function resetpasswordController($resource,$http) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }

  vm.change = change;
  vm.reset = reset;
  vm.check = check;

  function check(){
    if(vm.password != vm.newpassword){
      vm.passsame = true;
    } else {
      vm.passsame = false
    }
  }

  function reset(){
    if(vm.token.password != vm.oldpassword){
      vm.same = true;
    } else {
      vm.same = false;
    }
  }
  
  function change(form){
   vm.formSubmitted= true;
   if(form.$valid){
       vm.token.password = vm.newpassword;
       $http.put('/api/register',vm.token)
        .then(
          function(response){
            vm.token.password = vm.newpassword;
            localStorage.setItem('token',JSON.stringify(vm.token));
            window.location = '#/register';
        },
        function(err){
          console.log(err);
        })
   }
 
  }

}
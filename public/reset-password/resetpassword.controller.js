angular.module('myra')
  .controller('resetpasswordController', resetpasswordController);

resetpasswordController.$inject = ['$resource','$http'];

function resetpasswordController($resource,$http) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }

  vm.change = change;
  
  function change(){
    if(vm.token.password != vm.oldpassword){
      swal("please corect you old password");
    } else {
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
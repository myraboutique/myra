angular.module('myra')
  .controller('loginController', loginController);

loginController.$inject = ['$resource','$state'];

function loginController($resource,$state) {

  var vm = this;
  vm.data = data;
  var Login = $resource('/api/login');

  function data(myform){
    if(myform.$valid){
    var login = new Login()
    login.email = vm.username;
    login.password = vm.password;
    login.$save(function(info){
      if(info.email){
        localStorage.setItem('token',JSON.stringify(info));
       // window.location = '#/home';
        $state.go('home');
      } else {
        swal(info.status);
      } 
    });
  }

}

}
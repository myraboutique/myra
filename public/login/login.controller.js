angular.module('myra')
  .controller('loginController', loginController);

loginController.$inject = ['$resource'];

function loginController($resource) {

  var vm = this;
  vm.data = data;
  var Login = $resource('/api/login');

  function data(){
    var login = new Login()
    login.email = vm.username;
    login.password = vm.password;
    login.$save(function(info){
      if(info.email){
        localStorage.setItem('token',JSON.stringify(info));
        window.location = '#/home';
      } else {
        swal(info.status);
      } 
    });
  }



}
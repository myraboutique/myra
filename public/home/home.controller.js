angular.module('myra')
  .controller('homeController', homeController);

homeController.$inject = ['$resource'];

function homeController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
}
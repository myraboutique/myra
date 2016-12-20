angular.module('myra')
  .controller('addController', addController);

addController.$inject = ['$resource'];

function addController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
}
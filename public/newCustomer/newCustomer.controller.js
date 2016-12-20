angular.module('myra')
  .controller('newCustomerController', newCustomerController);

newCustomerController.$inject = ['$resource'];

function newCustomerController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
}
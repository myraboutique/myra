angular.module('myra')
  .controller('customerdetailsController', customerdetailsController);

customerdetailsController.$inject = ['$resource'];

function customerdetailsController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
}
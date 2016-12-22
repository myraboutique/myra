angular.module('myra')
  .controller('editclothController', editclothController);

editclothController.$inject = ['$resource','$stateParams'];

function editclothController($resource,$stateParams) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
  vm.clothtype = JSON.parse($stateParams.data);
  
}
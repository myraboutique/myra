angular.module('myra')
  .controller('editController', editController);

editController.$inject = ['$resource'];

function editController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
}
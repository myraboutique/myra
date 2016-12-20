angular.module('myra')
  .controller('materialtypeController', materialtypeController);

materialtypeController.$inject = ['$resource'];

function materialtypeController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
}
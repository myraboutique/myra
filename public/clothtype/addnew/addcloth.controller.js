angular.module('myra')
  .controller('newclothController', newclothController);

newclothController.$inject = ['$resource'];

function newclothController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
  vm.measurement = measuremet;
  vm.selectMeasurement = [];

  function measuremet(data){
    vm.selectMeasurement.push(data);
    vm.measu = "";
  }
}
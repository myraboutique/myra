angular.module('myra')
  .controller('newclothController', newclothController);

newclothController.$inject = ['$resource'];

function newclothController($resource) {
  var vm = this;
  vm.selectMeasurement = [];
  vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }

  vm.measurement = measurement;

  function measurement(data) {
    vm.selectMeasurement.push(data);
    vm.measure = "";
  }

}
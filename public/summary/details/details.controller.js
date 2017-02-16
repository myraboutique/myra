angular.module('myra')
  .controller('detailsController', detailsController);

detailsController.$inject = ['$resource', '$stateParams'];

function detailsController($resource, $stateParams) {

  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.data = JSON.parse($stateParams.referer);
  
  vm.type = [];
  vm.measure = [];
  var Summary = $resource('/api/summary/:id');
  var measurement = $resource('/api/measurement');

  // measurement.query(function (info) {
  //   vm.type = info;
  // });
  vm.temp = [];
  vm.temp2 = [];
  Summary.query({ id: vm.data.id }, function (info) {
    vm.order = info;
    info.forEach(function(element) {
      vm.temp.push(JSON.parse(element.measurement));
      if(element.measurementname){
        vm.temp2.push(element.measurementname.split(','));
      }
      else{
        vm.temp2.push("");
      }
    }, this);
    console.log(vm.temp2);
  });

}

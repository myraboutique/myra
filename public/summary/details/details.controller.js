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

  Summary.query({ id: vm.data.id }, function (info) {
    vm.order = info;
  });


}

angular.module('myra')
  .controller('detailsController', detailsController);

detailsController.$inject = ['$resource', '$stateParams'];

function detailsController($resource, $stateParams) {

  var vm = this;
  vm.arr=
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

  measurement.query(function(info){
    vm.order.forEach(function(e){
      info.forEach(function(f){
         if(e.type == f.title){
           vm.type.push(JSON.parse(e.measurement));
           vm.measure.push(f.measurement.split(","));
         } 
      })
    });
  })

}

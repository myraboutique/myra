angular.module('myra')
  .controller('clothtypeController', clothtypeController);

clothtypeController.$inject = ['$resource'];

function clothtypeController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
  var measurement = $resource('/api/measurement');
  measurement.query(function(info){
    vm.type = info;
  });
}
angular.module('myra')
  .controller('orderController', orderController);

orderController.$inject = ['$resource'];

function orderController($resource) {
  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
   var measurement = $resource('/api/orderdetails');
   var customer = $resource('/api/customerdetails/:id');
  measurement.query(function(info){
    vm.type = info;
  });
 

  

  

}
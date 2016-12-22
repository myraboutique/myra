angular.module('myra')
  .controller('editorderController', editorderController);

editorderController.$inject = ['$resource','$stateParams','$http'];

function editorderController($resource,$stateParams,$http) {
  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }

  var measurement = $resource('/api/measurement');
  vm.orderform = JSON.parse($stateParams.referer);
  vm.measurement = JSON.parse(vm.orderform.measurement);
  var customer = $resource('/api/customerdetails/:id');
  customer.get({id:vm.orderform.customerid},function(info){
    vm.customer = info;
  });
  
  vm.final = final;
  

  measurement.query(function(info){
    info.forEach(function(e){
      if(e.title == vm.orderform.type){
        var temp = e.measurement.split(',');
        vm.tyepemeasurement = temp;
      }
    })
  });
  

  function final(){
    vm.orderform = JSON.stringify(vm.measurement);
     $http.put('/api/orderdetails',vm.orderform)
        .then(
          function(response){
            window.location = '#/order';
        },
        function(err){
          console.log(err);
        })
  }

}
angular.module('myra')
  .controller('editorderController', editorderController);

editorderController.$inject = ['$resource', '$scope','$http'];

function editorderController($resource, $scope, $http) {
  var vm = this;

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);
  console.log(vm.records);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  
  var addstatus = $resource('/api/addstatuses');
  addstatus.query(function(info){
      vm.statusdata = info ;
  });


  vm.updateOrder = function(info) {
    console.log(info);
          
          $http.put('/api/orderdetails',  info)
          .then(
          function (response) {
            window.location = '#/order';
          },
          function (err) {
            console.log(err);
          });
  }

}

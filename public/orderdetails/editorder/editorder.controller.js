angular.module('myra')
  .controller('editorderController', editorderController);

editorderController.$inject = ['$resource', '$scope','$http'];

function editorderController($resource, $scope, $http) {
  var vm = this;

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);

  vm.data3=localStorage.getItem('customerdetailsnew');
  vm.customerdetailsnew = JSON.parse(vm.data3);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  
  vm.productwiserecord = [];
  var customer = $resource('/api/orderdetails');
  customer.query(function (response) {
      // console.log(response);
      vm.something = response[1].timestamp;

  console.log(vm.something);

      for (var index = 0; index < response.length; index++) {
        if(response[index].timestamp == vm.records.timestamp) {
          vm.productwiserecord.push(response[index]);
          // console.log(vm.productwiserecord);
        }
      }      
  });

  

  // vm.test = [];
  // vm.productwiserecord.forEach(function(element) {
  //   vm.test.push(element);
  // }, this);
  
  // console.log(vm.test);

  var addstatus = $resource('/api/addstatuses');
  addstatus.query(function(info){
      vm.statusdata = info ;
  });


  vm.updateOrder = function(info) {
    console.log(info);
          info.forEach(function(element) {
            $http.put('/api/orderdetails', element)
            .then(
            function (response) {
              window.location = '#/order';
            },
            function (err) {
              console.log(err);
            });
          }, this);
          
  }

}

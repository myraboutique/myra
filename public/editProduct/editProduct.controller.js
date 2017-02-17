angular.module('myra')
  .controller('editProductController', editProductController);

editProductController.$inject = ['$resource', '$state', '$http', 'Upload', '$window'];

function editProductController($resource, $state, $http, Upload, $window) {
  var vm = this;

  vm.inexforprompt = function (index) {
    vm.indexforpromptbox = index;
  };

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);

  vm.data2 = localStorage.getItem('customerdetailsnew');
  vm.records2 = JSON.parse(vm.data2);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  vm.measurevalue = [[]];
  vm.measurename = [[]];

  var customer = $resource('/api/orderdetails');
  customer.query(function (response) {
    vm.productwiserecord = [];
      for (var index = 0; index < response.length; index++) {
        if(response[index].timestamp == vm.records.timestamp) {
          vm.productwiserecord.push(response[index]);
          vm.measurevalue[index] = JSON.parse(response[index].measurement);
          vm.measurename[index] = response[index].measurementname.split(',');
        }
      }  
  });

  vm.update = function(info) {

    for (var index = 0; index < info.length; index++) {
      info[index].measurement = JSON.stringify(vm.measurevalue[index]);

      $http.put('/api/orderdetails', info[index])
        .then(
        function (response) {
          window.location = '#/editorder';
        },
        function (err) {
          console.log(err);
        });
    }
  };
}



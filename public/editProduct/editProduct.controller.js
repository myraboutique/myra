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

  var customerdetails = $resource('/api/customerdetails');
  customerdetails.query(function (info) {
    vm.customer = info;
  });

  var measurement = $resource('/api/measurement');
  measurement.query(function (info) {
    vm.type = info;
  });

  var addmaterial = $resource('/api/addmaterial');
  addmaterial.query(function (info) {
    vm.material = info;
  });



  var customer = $resource('/api/orderdetails');
  customer.query(function (response) {
    vm.productwiserecord = [];
      for (var index = 0; index < response.length; index++) {
        if(response[index].timestamp == vm.records.timestamp) {
          vm.productwiserecord.push(response[index]);
        }
      }  
  });




  vm.update = function(info) {

    info.forEach(function(element) {
      $http.put('/api/orderdetails', element)
        .then(
        function (response) {
          window.location = '#/editorder';
        },
        function (err) {
          console.log(err);
        });
      }, this);
  };
}



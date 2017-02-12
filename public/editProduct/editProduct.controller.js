angular.module('myra')
  .controller('editProductController', editProductController);

editProductController.$inject = ['$resource', '$state', '$http'];

function editProductController($resource, $state, $http) {
  var vm = this;

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);
  console.log(vm.records);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);

  var customerdetails = $resource('/api/customerdetails');
  customerdetails.query(function (info) {
    vm.customer = info;
  });

  var measurement = $resource('/api/measurement');
  measurement.query(function (info) {
    vm.type = info;

    info.forEach(function(element) {
    if (element.title == vm.records.type) {
      vm.measure = element.measurement;
      vm.measu = vm.measure.split(',');
    }
    }, this);

  });

  var addmaterial = $resource('/api/addmaterial');
  addmaterial.query(function (info) {
    vm.material = info;
  });

  var addsubdesign = $resource('/api/addsubdesign');
  addsubdesign.query(function (info) {
    vm.subdesign = [];
    // vm.subdesignimage  = [];
    info.forEach(function (e){
      if(e.design.trim() == vm.records.type) {
        // vm.subdesignimage.push(e.subdesignimage);
        vm.subdesign.push(e.subdesign);
      }
    });
  });

  var customer = $resource('/api/orderdetails');
  customer.query(function (response) {
    vm.productwiserecord = [];
      for (var index = 0; index < response.length; index++) {
        if(response[index].timestamp == vm.records.timestamp) {
          vm.productwiserecord.push(response[index]);
          console.log(vm.productwiserecord);
        }
      }      
  });

  vm.update = function(info) {
    if(vm.order){
      for (var index = 0; index < info.length; index++) {
        vm.productwiserecord[index].browseimage = vm.order[index].image.resized.dataURL;
      }
    }
    console.log(info);
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



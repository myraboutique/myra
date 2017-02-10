angular.module('myra')
  .controller('editProductController', editProductController);

editProductController.$inject = ['$resource', '$state', '$http'];

function editProductController($resource, $state, $http) {
  var vm = this;

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

  vm.update = function(info) {
    info.id = vm.records.id;

    $http.put('/api/orderdetails',  info)
      .then(
      function (response) {
        window.location = '#/editorder';
      },
      function (err) {
         console.log(err);
      });
  };
}



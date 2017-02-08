angular.module('myra')
  .controller('addordernewController', addordernewController);

addordernewController.$inject = ['$resource', '$scope'];

function addordernewController($resource, $scope) {
  var vm = this;

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);
  vm.data2=localStorage.getItem('vmorder');
  vm.selectedOrder = JSON.parse(vm.data2);
  

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  var customerdetails = $resource('/api/customerdetails');

  var customer = $resource('/api/customerdetails/:id');
  customer.get({ id: vm.records.id }, function (response) {
    console.log(response);
    vm.customerpatch = response;
  });
  
  var addstatus = $resource('/api/addstatuses');
  addstatus.query(function(info){
    // console.log(info);
      vm.statusdata = info ;
  });

  customerdetails.query(function (info) {
    vm.customer = info;

    info.forEach(function (element) {
      if (info.id == vm.records.id) {
        vm.customerphone = info.mobileNumber;
        console.log(vm.customerphone);
      }
    }, this);
  });

}

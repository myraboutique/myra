angular.module('myra')
  .controller('addordernewController', addordernewController);

addordernewController.$inject = ['$resource', '$scope','$http'];

function addordernewController($resource, $scope, $http) {
  var vm = this;

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);
  vm.data2=localStorage.getItem('vmorder');
  vm.selectedOrder = JSON.parse(vm.data2);
  console.log(vm.selectedOrder);
  

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  var customerdetails = $resource('/api/customerdetails');
  var orderdetails = $resource('/api/orderdetails');
  orderdetails.query(function(info) {
    vm.lastid = info[info.length -1].id;
    console.log(vm.lastid);
  });

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

  vm.updateOrder = function(info) {
    console.log(info);
    

for (var index = 0; index < vm.selectedOrder.length; index++) {
      info[index].orderdate = vm.orderdate;
      info[index].id = vm.lastid;
      vm.lastid--;
      console.log(info[index]);
      
       $http.put('/api/orderdetails',  info[index])
      .then(
      function (response) {
        // swal("Record add successfully.");
        // window.location = '#/order';
      },
      function (err) {
        console.log(err);
      });

  
}

  }

}

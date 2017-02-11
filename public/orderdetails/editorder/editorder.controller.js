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
          console.log(vm.productwiserecord);
        }
      }      
  });

  // =============================================================

  vm.date1 = false;
  vm.date2 = false;
  vm.date3 = false;

  vm.tempalert = false;
  vm.date4 = false;

  vm.change = change;
  vm.alertchange = alertchange;
  vm.stitchingchange = stitchingchange;
  vm.forstitchingdate = forstitchingdate;


  function forstitchingdate(index) {
    if (vm.productwiserecord[index].stitchingdate > vm.productwiserecord[index].deliverydate) {
      console.log("Oyye");
      vm.date4 = true;
    }
    else {
      vm.date4 = false;
    }
  }
  //new change 00 --index inject
  function change(orderdate, index) {

    if (vm.productwiserecord[index].stitchingdate) {
      console.log("There is ");
      stitchingchange(vm.productwiserecord[index].stitchingdate, index);
      if (vm.productwiserecord[index].deliverydate) {
        forstitchingdate(index);
      }
    }

    if (vm.productwiserecord[index].deliverydate) {
      var b = orderdate.split('/');
      var a = vm.productwiserecord[index].deliverydate.split('/');
      console.log(a);
      var deliveryDate = new Date(a[2], a[1] - 1, a[0]);
      var orderDate = new Date(b[2], b[1] - 1, b[0]);
      orderDate.setHours(0, 0, 0, 0, 0);
      deliveryDate.setHours(0, 0, 0, 0, 0);
      //new change 00
      // var alertday = a[0] - 2 + '/' + a[1] + '/' + a[2];
      var alertDay = new Date(a[2], a[1], a[0] - 1);
      alertDay.setHours(0, 0, 0, 0, 0);
      var alertday = alertDay.getUTCDate() + '/' + alertDay.getUTCMonth() + '/' + alertDay.getUTCFullYear();
      vm.productwiserecord[index].alertday = '';
      console.log(vm.productwiserecord[index].alertday);
      if (deliveryDate < orderDate) {
        vm.date1 = true;
        vm.productwiserecord[index].alertday = alertday;
        alertchange(orderDate, deliveryDate, vm.productwiserecord[index].alertday);
      } else {
        vm.date1 = false;
        vm.productwiserecord[index].alertday = alertday;
        alertchange(orderDate, deliveryDate, vm.productwiserecord[index].alertday);
      }
    }

  }

  // new change 00 --index inject
  function stitchingchange(stitchingdate, index) {

    if (vm.records.orderdate) {
      console.log(orderdate);
      console.log(stitchingdate);
      console.log(index);
      var orderdate = vm.records.orderdate;
      var b = orderdate.split('/');
      var a = stitchingdate.split('/');
      var stitchingDate = new Date(a[2], a[1] - 1, a[0]);
      var orderDate = new Date(b[2], b[1] - 1, b[0]);
      orderDate.setHours(0, 0, 0, 0, 0);
      stitchingDate.setHours(0, 0, 0, 0, 0);

      if (stitchingDate < orderDate) {
        vm.tempalert = true;
      } else {
        vm.tempalert = false;
      }
      console.log(vm.tempalert);
    }
    if (vm.productwiserecord[index].deliverydate) {
      forstitchingdate(index);
    }
  }

  function alertchange(orderdate, deliverydate, alertdate) {
    console.log(orderdate);
    console.log(deliverydate);
    console.log(alertdate);

    var type = typeof orderdate;
    if (type == 'string') {
      var b = orderdate.split('/');
      var a = deliverydate.split('/');
      var deliveryDate = new Date(a[2], a[1] - 1, a[0]);
      var orderDate = new Date(b[2], b[1] - 1, b[0]);
    } else {
      orderDate = orderdate;
      deliveryDate = deliverydate;
    }
    var c = alertdate.split('/');
    var alertDate = new Date(c[2], c[1] - 1, c[0]);
    orderDate.setHours(0, 0, 0, 0, 0);
    deliveryDate.setHours(0, 0, 0, 0, 0);
    alertDate.setHours(0, 0, 0, 0, 0);
    if (alertDate > deliveryDate) {
      vm.date2 = true;
    } else {
      vm.date2 = false;
    }
    if (alertDate < orderDate) {
      vm.date3 = true;
    } else {
      vm.date3 = false;
    }
  }





//=============================================================


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

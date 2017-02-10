angular.module('myra')
  .controller('addordernewController', addordernewController);

addordernewController.$inject = ['$resource', '$scope','$http'];

function addordernewController($resource, $scope, $http) {
  var vm = this;
  
  vm.data2=localStorage.getItem('vmorder');
  vm.selectedOrder = JSON.parse(vm.data2);
  
  vm.data3=localStorage.getItem('customerdetailsnew');
  vm.customerdetailsnew = JSON.parse(vm.data3);

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
//=============================================================

  // vm.date1 = false;
  // vm.date2 = false;
  // vm.date3 = false;

  // vm.tempalert = false;
  // vm.date4 = false;

  // vm.change = change;
  // vm.alertchange = alertchange;
  // vm.stitchingchange = stitchingchange;
  // vm.forstitchingdate = forstitchingdate;


  // function forstitchingdate(index) {
  //   if (vm.order[index].stitchingdate > vm.order[index].deliverydate) {
  //     console.log("Oyye");
  //     vm.date4 = true;
  //   }
  //   else {
  //     vm.date4 = false;
  //   }
  // }
  //new change 00 --index inject
  // function change(orderdate, index) {

  //   if (vm.order[index].stitchingdate) {
  //     console.log("There is ");
  //     stitchingchange(vm.order[index].stitchingdate, index);
  //     if (vm.order[index].deliverydate) {
  //       forstitchingdate(index);
  //     }
  //   }

  //   if (vm.order[index].deliverydate) {
  //     var b = orderdate.split('/');
  //     var a = vm.order[index].deliverydate.split('/');
  //     console.log(a);
  //     var deliveryDate = new Date(a[2], a[1] - 1, a[0]);
  //     var orderDate = new Date(b[2], b[1] - 1, b[0]);
  //     orderDate.setHours(0, 0, 0, 0, 0);
  //     deliveryDate.setHours(0, 0, 0, 0, 0);
  //     //new change 00
  //     // var alertday = a[0] - 2 + '/' + a[1] + '/' + a[2];
  //     var alertDay = new Date(a[2], a[1], a[0] - 1);
  //     alertDay.setHours(0, 0, 0, 0, 0);
  //     var alertday = alertDay.getUTCDate() + '/' + alertDay.getUTCMonth() + '/' + alertDay.getUTCFullYear();
  //     vm.order[index].alertday = '';
  //     console.log(vm.order[index].alertday);
  //     if (deliveryDate < orderDate) {
  //       vm.date1 = true;
  //       vm.order[index].alertday = alertday;
  //       alertchange(orderDate, deliveryDate, vm.order[index].alertday);
  //     } else {
  //       vm.date1 = false;
  //       vm.order[index].alertday = alertday;
  //       alertchange(orderDate, deliveryDate, vm.order[index].alertday);
  //     }
  //   }

  // }

  //new change 00 --index inject
  // function stitchingchange(stitchingdate, index) {

  //   if (vm.order[index].orderdate) {
  //     console.log(orderdate);
  //     console.log(stitchingdate);
  //     console.log(index);
  //     var orderdate = vm.order[index].orderdate;
  //     var b = orderdate.split('/');
  //     var a = stitchingdate.split('/');
  //     var stitchingDate = new Date(a[2], a[1] - 1, a[0]);
  //     var orderDate = new Date(b[2], b[1] - 1, b[0]);
  //     orderDate.setHours(0, 0, 0, 0, 0);
  //     stitchingDate.setHours(0, 0, 0, 0, 0);

  //     if (stitchingDate < orderDate) {
  //       vm.tempalert = true;
  //     } else {
  //       vm.tempalert = false;
  //     }
  //     console.log(vm.tempalert);
  //   }
  //   if (vm.order[index].deliverydate) {
  //     forstitchingdate(index);
  //   }
  // }

  // function alertchange(orderdate, deliverydate, alertdate) {
  //   console.log(orderdate);
  //   console.log(deliverydate);
  //   console.log(alertdate);

  //   var type = typeof orderdate;
  //   if (type == 'string') {
  //     var b = orderdate.split('/');
  //     var a = deliverydate.split('/');
  //     var deliveryDate = new Date(a[2], a[1] - 1, a[0]);
  //     var orderDate = new Date(b[2], b[1] - 1, b[0]);
  //   } else {
  //     orderDate = orderdate;
  //     deliveryDate = deliverydate;
  //   }
  //   var c = alertdate.split('/');
  //   var alertDate = new Date(c[2], c[1] - 1, c[0]);
  //   orderDate.setHours(0, 0, 0, 0, 0);
  //   deliveryDate.setHours(0, 0, 0, 0, 0);
  //   alertDate.setHours(0, 0, 0, 0, 0);
  //   if (alertDate > deliveryDate) {
  //     vm.date2 = true;
  //   } else {
  //     vm.date2 = false;
  //   }
  //   if (alertDate < orderDate) {
  //     vm.date3 = true;
  //   } else {
  //     vm.date3 = false;
  //   }
  // }





//=============================================================

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
        swal("Record add successfully.");
        window.location = '#/order';
      },
      function (err) {
        console.log(err);
      });

  
}

  }

}

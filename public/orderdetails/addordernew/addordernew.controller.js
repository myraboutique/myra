angular.module('myra')
  .controller('addordernewController', addordernewController);

addordernewController.$inject = ['$resource', '$scope','$http'];

function addordernewController($resource, $scope, $http) {
  var vm = this;

  vm.data1=localStorage.getItem('addProductscustomer');
  vm.addProductscustomer = JSON.parse(vm.data1);
  
  vm.data2=localStorage.getItem('vmorder');
  vm.selectedOrder = JSON.parse(vm.data2);
  
  vm.data3=localStorage.getItem('customerdetailsnew');
  vm.customerdetailsnew = JSON.parse(vm.data3);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  vm.orderdate1 = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();

  var customerdetails = $resource('/api/customerdetails');
  var Orderdetails = $resource('/api/orderdetails');
  var addstatus = $resource('/api/addstatuses');
  
  addstatus.query(function(info){
      vm.statusdata = info ;
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
    if (vm.order[index].stitchingdate > vm.order[index].deliverydate) {
      console.log("Oyye");
      vm.date4 = true;
    }
    else {
      vm.date4 = false;
    }
  }
  //new change 00 --index inject
  function change(orderdate, index) {

    if (vm.order[index].stitchingdate) {
      console.log("There is ");
      stitchingchange(vm.order[index].stitchingdate, index);
      if (vm.order[index].deliverydate) {
        forstitchingdate(index);
      }
    }

    if (vm.order[index].deliverydate) {
      var b = orderdate.split('/');
      var a = vm.order[index].deliverydate.split('/');
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
      vm.order[index].alertday = '';

      //stitchingdate setring
      var stitchingDay = new Date(a[2], a[1], a[0] - 4);
      stitchingDay.setHours(0, 0, 0, 0, 0);
      var stitchingday = stitchingDay.getUTCDate() + '/' + stitchingDay.getUTCMonth() + '/' + stitchingDay.getUTCFullYear();
      vm.order[index].stitchingdate = '';

      //stitchingdate setring
      console.log(vm.order[index].alertday);
      if (deliveryDate < orderDate) {
        vm.date1 = true;
        vm.order[index].alertday = alertday;
        vm.order[index].stitchingdate = stitchingday;
        alertchange(orderDate, deliveryDate, vm.order[index].alertday);
      } else {
        vm.date1 = false;
        vm.order[index].alertday = alertday;
        vm.order[index].stitchingdate = stitchingday;
        alertchange(orderDate, deliveryDate, vm.order[index].alertday);
      }
    }

  }

  // new change 00 --index inject
  function stitchingchange(stitchingdate, index) {

    if (vm.order[index].orderdate) {
      console.log(orderdate);
      console.log(stitchingdate);
      console.log(index);
      var orderdate = vm.orderdate1;
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
    if (vm.order[index].deliverydate) {
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
  var orderdetails = new Orderdetails();
  vm.updateOrder = function(info) {
        console.log(info);
        vm.temp = [];
    for (var index = 0; index < vm.selectedOrder.length; index++) {

        vm.data4=localStorage.getItem('vmorder' + index);
        vm.temp[index] = JSON.parse(vm.data4);

        orderdetails.measurement = vm.temp[index].measurement;
        orderdetails.customerName = vm.temp[index].customerName;
        orderdetails.customerid = vm.temp[index].customerid;
        orderdetails.timestamp = vm.temp[index].timestamp;
        orderdetails.cloth = vm.temp[index].cloth;
        orderdetails.color = vm.temp[index].color;
        orderdetails.customization = vm.temp[index].customization;
        if(vm.temp[index].image){
        orderdetails.browseimage = vm.temp[index].image.dataURL;
        }
        orderdetails.material = vm.temp[index].materialtype.materialtype;
        orderdetails.type = vm.temp[index].type.title;
        orderdetails.subdesign = vm.temp[index].type2;
        orderdetails.status = info[index].status;
        orderdetails.alertday = info[index].alertday;
        orderdetails.stitchingdate = info[index].stitchingdate;
        orderdetails.deliverydate = info[index].deliverydate;
        orderdetails.amount = info[index].amount;
        orderdetails.orderdate = vm.orderdate1;

        orderdetails.$save(function (info) {
        // if (!info.status) {
        //   swal("Recored Saved Successfully.");
        //   window.location = '#/clothtype';
        // }
        // else {
        //   vm.flag = true;
        //   vm.status = info.status;
        // }
      });
      localStorage.removeItem('vmorder' + index);
    }
  }
}
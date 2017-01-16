angular.module('myra')
  .controller('editorderController', editorderController);

editorderController.$inject = ['$resource', '$stateParams', '$http'];

function editorderController($resource, $stateParams, $http) {
  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  var measurement = $resource('/api/measurement');
  var customer = $resource('/api/customerdetails/:id');
  var Addmaterial = $resource('/api/addmaterial');

  vm.order = JSON.parse($stateParams.referer);
  vm.order.measurement = JSON.parse(vm.order.measurement);

  vm.final = final;
  vm.cancelbtn = cancelbtn;
  vm.alertchange = alertchange;
  vm.change = change;

  customer.get({ id: vm.order.customerid }, function (info) {
    vm.customer = info;
    console.log(vm.customer);
  });

  Addmaterial.query(function (info) {
    vm.material = info;
  });


  measurement.query(function (info) {
    info.forEach(function (e) {
      if (e.title == vm.order.type) {
        var temp = e.measurement.split(',');
        vm.tyepemeasurement = temp;
      }
    })
  });


  function change(orderdate, deliverydate) {
    var b = orderdate.split('/');
    var a = deliverydate.split('/');
    var deliveryDate = new Date(a[2], a[1] - 1, a[0]);
    var orderDate = new Date(b[2], b[1] - 1, b[0]);
    orderDate.setHours(0, 0, 0, 0, 0);
    deliveryDate.setHours(0, 0, 0, 0, 0);
    if (deliveryDate < orderDate) {
      vm.date1 = true;
    } else {
      vm.date1 = false;
    }
  }


  function alertchange(orderdate, deliverydate, alertdate) {
    var b = orderdate.split('/');
    var a = deliverydate.split('/');
    var c = alertdate.split('/');
    var deliveryDate = new Date(a[2], a[1] - 1, a[0]);
    var orderDate = new Date(b[2], b[1] - 1, b[0]);
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

  function cancelbtn() {
    window.location = '#/order'
  }


  function final(orderform) {
    if(orderform.$valid){
      vm.order.measurement = JSON.stringify(vm.order.measurement);
       $http.put('/api/orderdetails',  vm.order)
      .then(
      function (response) {
        window.location = '#/order';
      },
      function (err) {
        console.log(err);
      })
    }

  }

}

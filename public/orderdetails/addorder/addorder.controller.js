angular.module('myra')
  .controller('addorderController', addorderController);

addorderController.$inject = ['$resource'];

function addorderController($resource) {
  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.datepattern = "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i";
  var measurement = $resource('/api/measurement');
  var customerdetails = $resource('/api/customerdetails');
  var Addmaterial = $resource('/api/addmaterial');
  var Orderdetails = $resource('/api/orderdetails');
  vm.order = [];
  vm.clothtype = [];
   vm.cancel = cancel;
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var orderdate = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();
  vm.order = [
    {
      orderdate: orderdate
    }
  ]
  vm.typeSelect = typeSelect;
  vm.items = [{}];
  vm.add = add;
  vm.final = final;
  // vm.cancelbtn = cancelbtn;
  function cancel(){
       window.location = '#/order';
      }

  vm.selectCustomer = selectCustomer;
  vm.data = [];

  measurement.query(function (info) {
    vm.type = info;
  });
  customerdetails.query(function (info) {
    console.log(info);
    vm.customer = info;
  });
  Addmaterial.query(function (info) {
    vm.material = info;
  });

  vm.change = change;
  vm.alertchange = alertchange;
 
  function selectCustomer(info) {
    console.log(info);
    vm.seleCust = info;
    vm.contact = info.mobileNumber;
    vm.email = info.email;
    vm.address = info.address
  }

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

  var pos = 0;
  function typeSelect(selecttype) {
    vm.type.forEach(function (e) {
      if (e.id == selecttype.id) {
        vm.clothtype[pos] = selecttype.measurement.split(',');
      }
    });
    pos++;
    
  }

  function add(orderform,inform) {
    vm.formSubmitted = true;
    if (orderform.$valid) {
      vm.formSubmitted = false;
      vm.order.push({ orderdate: orderdate });
      console.log(vm.order);
      vm.items.push({});
    }
  }

  function final(orderform) {
    vm.formSubmitted = true;
    if (orderform.$valid) {
      var orderdetails = new Orderdetails();
      var i = 0;
      var rOrder = function () {
        if (i < vm.order.length) {
          orderdetails.customerid = vm.seleCust.id;
          orderdetails.customerName = vm.seleCust.customerName;
          orderdetails.customeremail = vm.seleCust.email;
          orderdetails.type = vm.order[i].type.title
          orderdetails.material = vm.order[i].materialtype.materialtype;
          orderdetails.color = vm.order[i].color;
          if (vm.order[i].checked) {
            orderdetails.customization = vm.order[i].customization;
          } else {
            orderdetails.customization = "";
          }
          orderdetails.cloth = vm.order[i].cloth
          orderdetails.orderdate = vm.order[i].orderdate
          orderdetails.date = vm.order[i].deliverydate
          orderdetails.alertday = vm.order[i].alertday
          orderdetails.amount = vm.order[i].amount
          orderdetails.measurement = JSON.stringify(vm.order[i].measurement);
          orderdetails.status = 'new';
          orderdetails.$save(function (info) {
            i++;
            rOrder();
          });
        } else {
          window.location = '#/order';
        }
      }
      rOrder();
    }

  }

}

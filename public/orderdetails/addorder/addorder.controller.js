angular.module('myra')
  .controller('addorderController', addorderController);

addorderController.$inject = ['$resource','$scope'];

function addorderController($resource,$scope) {
  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.disable = true;
  vm.datepattern = "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i";
  var measurement = $resource('/api/measurement');
  var customerdetails = $resource('/api/customerdetails');
  var Addmaterial = $resource('/api/addmaterial');
  var Orderdetails = $resource('/api/orderdetails');
  vm.order = [];
  vm.clothtype = [];
  vm.date1 = false;
  vm.date2 = false;
 //vm.date4 = false;
  vm.date3 = false;
 vm.tempalert = false;
 vm.date4 = false;
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
    vm.customer = info;
  });
  Addmaterial.query(function (info) {
    vm.material = info;  
  });

  vm.change = change;
  vm.alertchange = alertchange;
  vm.stitchingchange =stitchingchange;
  vm.empty = empty;
  vm.forstitchingdate=forstitchingdate;
 // vm.changeforstich =changeforstich;
  function empty(index){
      vm.order[index].customization = "";
  }
 
 
  function selectCustomer(info) {
    vm.seleCust = info;
    vm.contact = info.mobileNumber;
    vm.email = info.email;
    vm.address = info.address
  }

  function forstitchingdate(index){
    if(vm.order[index].stitchingdate>vm.order[index].deliverydate){
            console.log("Oyye");
            vm.date4 = true;
          }
          else{
             vm.date4 = false;
          }
  }
  //new change 00 --index inject
 function change(orderdate,  index) {

    if(vm.order[index].stitchingdate){
        console.log("There is ");
        stitchingchange(vm.order[index].stitchingdate, index);
        if(vm.order[index].deliverydate){
          forstitchingdate(index);
        }
    }
   
    if(vm.order[index].deliverydate){
    var b = orderdate.split('/');
    var a =vm.order[index].deliverydate.split('/');
    console.log(a);
    var deliveryDate = new Date(a[2], a[1] - 1, a[0]);
    var orderDate = new Date(b[2], b[1] - 1, b[0]);
    orderDate.setHours(0, 0, 0, 0, 0);
    deliveryDate.setHours(0, 0, 0, 0, 0);
    //new change 00
   // var alertday = a[0] - 2 + '/' + a[1] + '/' + a[2];
   var alertDay =  new Date(a[2], a[1], a[0] -1);
   alertDay.setHours(0, 0, 0, 0, 0);
    var alertday = alertDay.getUTCDate()+'/'+alertDay.getUTCMonth()+'/'+alertDay.getUTCFullYear();
    vm.order[index].alertday = '';
    console.log(vm.order[index].alertday);
    if (deliveryDate < orderDate) {
      vm.date1 = true;
        vm.order[index].alertday = alertday;
      alertchange(orderDate, deliveryDate, vm.order[index].alertday);
    } else {
      vm.date1 = false;
      vm.order[index].alertday = alertday;
      alertchange(orderDate, deliveryDate, vm.order[index].alertday);
    }
    }
    
  }

//  function changeforstich(orderdate, stitchingdate, index) {
  
//       console.log(orderdate);
//       console.log(stitchingdate);
//     var b = orderdate.split('/');
//     var a = stitchingdate.split('/');
//     var stitchingDate = new Date(a[2], a[1] - 1, a[0]);
//     var orderDate = new Date(b[2], b[1] - 1, b[0]);
//     orderDate.setHours(0, 0, 0, 0, 0);
//     stitchingDate.setHours(0, 0, 0, 0, 0);
//     //new change 00

//     if (stitchingDate < orderDate) {
//       vm.date4 = true;
     
//     } else {
//       vm.date4 = false;
//     }
//   }

  //new change 00 --index inject
 function stitchingchange(stitchingdate,index) {

   if(vm.order[index].orderdate){
        console.log(orderdate);
        console.log(stitchingdate);
        console.log(index);
        var orderdate = vm.order[index].orderdate;
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
      if(vm.order[index].deliverydate){
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
    if (!vm.date2 && !vm.date3 && !vm.date1 && orderform.$valid) {
      vm.formSubmitted = false;
      vm.order.push({ orderdate: orderdate });
      console.log(vm.order);
      vm.items.push({});
    }
      
  }

  function final(orderform) {
    vm.formSubmitted = true;
    if (!vm.date2 && !vm.date3 && !vm.date1 && orderform.$valid) {
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
          orderdetails.stitchingdate = vm.order[i].stitchingdate
          console.log();
          orderdetails.date = vm.order[i].deliverydate
          orderdetails.alertday = vm.order[i].alertday
          orderdetails.amount = vm.order[i].amount
          orderdetails.measurement = JSON.stringify(vm.order[i].measurement);
          orderdetails.status = 'New';
          orderdetails.$save(function (info) {
            i++;
            rOrder();
          });
        } else {
        swal("Record saved successfully.");
          window.location = '#/order';
        }
      
      }
      rOrder();
    }

  }

}
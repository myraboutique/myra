angular.module('myra')
  .controller('addorderController', addorderController);

addorderController.$inject = ['$resource'];

function addorderController($resource) {
  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }

  var measurement = $resource('/api/measurement');
  var customerdetails = $resource('/api/customerdetails');
  var Addmaterial = $resource('/api/addmaterial');
  var Orderdetails = $resource('/api/orderdetails');
  //vm.order.date = new Date();
  vm.typeSelect = typeSelect;
  vm.showNext2 = showNext2;
  vm.showNext3 = showNext3;
  vm.showNext4 = showNext4;
  vm.showNext1 = showNext1;
  vm.order = [];
  vm.order1 = [];
  vm.order2 = [];
  vm.order3 = [];
  vm.order4 = [];
  vm.final = final;
  vm.order.orderdate = new Date();
  vm.order1.orderdate = new Date();
  vm.order2.orderdate = new Date();
  vm.order3.orderdate = new Date();
  vm.order4.orderdate = new Date();
  vm.selectCustomer = selectCustomer;
  vm.data = [];

  measurement.query(function(info){
    vm.type = info;
  });
  customerdetails.query(function(info){
    vm.customer = info;
  });
  Addmaterial.query(function(info){
    vm.material = info;
  });

  function selectCustomer(info){
    vm.seleCust = info;
    vm.contact = info.mobileNumber;
    vm.email = info.email;
    vm.address = info.address
  }

  function typeSelect(selecttype){
    vm.type.forEach(function(e){
      if(e.id == selecttype.id){
        vm.clothtype = selecttype.measurement.split(',');
      }
    });
  }

  function showNext1(info){
    
    vm.next1 = true;
    vm.data.push(info);
   
  }

  function showNext2(info){
 
    vm.next2 = true;
    vm.data.push(info);
  }

  function showNext3(info){
    
    vm.next3 = true;
    vm.data.push(info);
  }

  function showNext4(info){
     
    vm.next4 = true;
    vm.data.push(info);
  }
    var i = 0;
  function final(info){
    if(info){
       vm.data.push(info);
    }
    console.log(vm.data);
    var orderdetails = new Orderdetails();
      if(i< vm.data.length){
      orderdetails.customerid = vm.seleCust.id;
      orderdetails.customerName = vm.seleCust.customerName;
      orderdetails.customeremail = vm.seleCust.email;
      orderdetails.type = vm.data[i].type.title
      orderdetails.material = vm.data[i].materialtype.materialtype;
      orderdetails.color = vm.data[i].color;
      if(vm.data[i].checked){
      orderdetails.customization = vm.data[i].customization;
      }
      orderdetails.cloth = vm.data[i].cloth
      orderdetails.orderdate = vm.data[i].orderdate
      orderdetails.date = vm.data[i].date
      orderdetails.alertday = vm.data[i].alertday
      orderdetails.amount = vm.data[i].amount
      orderdetails.measurement = JSON.stringify(vm.data[i].measurement);
      orderdetails.status = 'new';
      orderdetails.$save(function(info){
        i++;
        final();
      });
    } else {
      window.location = '#/order';
      console.log("ankur");
    }
 
  } 

}
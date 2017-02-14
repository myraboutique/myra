angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource', '$state', '$http'];

function addProductController($resource, $state, $http) {
  var vm = this;

  vm.clicked = function (info) {
    vm.order[vm.newinex].type2 = info;
  };

   vm.inexforprompt = function (index) {
    console.log(index);
    vm.indexforpromptbox = index;
  };

  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  vm.orderdate1 = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();
  vm.orderdate2 = myDate.getTime();

  vm.items = [{}];
  vm.order = [{}];
  vm.measu = [];

  vm.designSelect = designSelect;
  vm.submit = submit;
  vm.final = final;
  vm.selectCustomer = selectCustomer;

  var measurement = $resource('/api/measurement');
  var addsubdesigns = $resource('/api/addsubdesign');
  var addmaterial = $resource('/api/addmaterial');
  var customerdetails = $resource('/api/customerdetails');
  var Orderdetails = $resource('/api/orderdetails');

  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  }
  
  Orderdetails.query(function (info) {
    vm.temp = info[info.length -1].timestamp;
    vm.pid1 = Number(vm.temp) + 1;
    vm.pid = pad(vm.pid1,5);
  });

  measurement.query(function (info) {
    vm.type = info;
  });

  addmaterial.query(function (info) {
    vm.material = info;
  });

  customerdetails.query(function (info) {
    vm.customer = info;
  });

  function selectCustomer(info) {
    vm.seleCust = info;
    if (localStorage.getItem('addProductscustomer')) {
     localStorage.removeItem('addProductscustomer');
     localStorage.setItem('addProductscustomer', JSON.stringify(info));
   }
   else {
     localStorage.setItem('addProductscustomer', JSON.stringify(info));
   }
  }

  function designSelect(info, index) {
    vm.newinex = index;
    vm.order[vm.newinex].type2 = '';

    addsubdesigns.query(function (subdesigns) {
      vm.subdesign = [];
      vm.subdesignimage = [];
      subdesigns.forEach(function (e) {
        if (e.design.trim() == info.title) {
          vm.subdesignimage.push(e.subdesignimage);
          vm.subdesign.push(e.subdesign);
        }
      });
    });

    vm.type.forEach(function (element) {
      if (element.title == info.title && element.isActive) {
        vm.measure = element.measurement;
        vm.measu[vm.newinex] = vm.measure.split(',');
      }
    }, this);
  };

  function submit() {
    vm.items.push({});
  }



  function final(info) {
    vm.designs = [];
    info.forEach(function (element) {
//       console.log(element);
      vm.designs.push(element.type.title + " (" + element.type2 + ")");
    }, this);

    if (localStorage.getItem('vmorder')) {
      localStorage.removeItem('vmorder');
      localStorage.setItem('vmorder', JSON.stringify(vm.designs));
    }
    else {
      localStorage.setItem('vmorder', JSON.stringify(vm.designs));
    }

    for (var index = 0; index < info.length; index++) {
      info[index].timestamp = vm.pid;
      info[index].customerid = vm.seleCust.id;
      info[index].customerName = vm.seleCust.customerName;
      
      if (localStorage.getItem('vmorder' + index)) {
        localStorage.removeItem('vmorder' + index);
        localStorage.setItem('vmorder' + index, JSON.stringify(info[index]));
      }
      else {
        localStorage.setItem('vmorder' + index, JSON.stringify(info[index]));
      }
    }

    window.location = '#/addordernew';

  }

}



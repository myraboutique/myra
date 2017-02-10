angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource', '$state', '$http'];

function addProductController($resource, $state, $http) {
  var vm = this;


  vm.items = [{}];
  vm.order = [{}];

  vm.clicked = function(info) {
    vm.order[vm.newinex].type2=info;
  };

  vm.designSelect = designSelect;
  vm.submit = submit;
  vm.final = final;
  vm.selectCustomer = selectCustomer;
  

  var measurement = $resource('/api/measurement');
  var addsubdesigns = $resource('/api/addsubdesign');
  var addmaterial = $resource('/api/addmaterial');
  var customerdetails = $resource('/api/customerdetails');
  var Orderdetails = $resource('/api/orderdetails');
  
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var orderdate = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();

  measurement.query(function (info) {
    vm.type = info;
    console.log(vm.type);
  });

  addmaterial.query(function (info) {
    vm.material = info;
  });

  customerdetails.query(function (info) {
    vm.customer = info;
  });

  function selectCustomer(info) {
    vm.seleCust = info;
    console.log(vm.seleCust);
  }

  function designSelect(info,index) {
    vm.measure = [];
    vm.images1 = [];
    vm.images1title = [];
    vm.newinex = index;
    vm.order[vm.newinex].type2='';
    addsubdesigns.query(function (subdesigns) {
      vm.subdesign = [];
      vm.subdesignimage  = [];
      subdesigns.forEach(function (e){
        if(e.design.trim() == info.title) {
          vm.subdesignimage.push(e.subdesignimage);
          vm.subdesign.push(e.subdesign);
        }
      });
      console.log(vm.subdesignimage);
    });
  };

  function submit(info) {
      vm.items.push({});
  }

  var orderdetails = new Orderdetails();
      var i = 0;

  function final() {
    vm.designs = [];
    vm.order.forEach(function(element) {
      vm.designs.push(element.type.title);
    }, this);

                if(localStorage.getItem('vmorder')){
                  localStorage.removeItem('vmorder');
                  localStorage.setItem('vmorder',JSON.stringify(vm.designs));
                }
                else{
                        localStorage.setItem('vmorder',JSON.stringify(vm.designs));     
                }
        
        if (i < vm.order.length) {
          orderdetails.customerid = vm.seleCust.id;
          orderdetails.customerName = vm.seleCust.customerName;
          orderdetails.customerid = vm.seleCust.id;
          orderdetails.type = vm.order[i].type.title;
          orderdetails.subdesign = vm.order[i].type2;
          orderdetails.material = vm.order[i].materialtype.materialtype;
          orderdetails.color = vm.order[i].color;
          orderdetails.customization = vm.order[i].customization;
          orderdetails.cloth = vm.order[i].cloth;
               
          orderdetails.$save(function (info) {
            i++;
            final();
          });
        } else {
          window.location = '#/addordernew';
        }
        
  }

}



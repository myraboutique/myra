angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource', '$state', '$http'];

function addProductController($resource, $state, $http) {
  var vm = this;

// vm.savecus = function(info) {
// vm.order[vm.newinex].customization = info;
// console.log(info);
// }

  vm.single = function (image) {
    vm.src=image;  
    // if (!vm.src) {
    //     vm.flagforimg = true;
    // }else{
    //     addClothtype(form);
    // }
  };
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  vm.orderdate1 = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();
  vm.orderdate2 = myDate.getTime();
  
  
vm.clicked = function(info) {

   vm.order[vm.newinex].type2=info;
 };

  vm.items = [{}];
  vm.order = [{}];

  vm.designSelect = designSelect;
  vm.submit = submit;
  vm.final = final;
  vm.selectCustomer = selectCustomer;
  
  var measurement = $resource('/api/measurement');
  var addsubdesigns = $resource('/api/addsubdesign');
  var addmaterial = $resource('/api/addmaterial');
  var customerdetails = $resource('/api/customerdetails');
  var Orderdetails = $resource('/api/orderdetails');
  
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
    if(localStorage.getItem('addProductscustomer')){
        localStorage.removeItem('addProductscustomer');
        localStorage.setItem('addProductscustomer',JSON.stringify(info));
        }
        else{
            localStorage.setItem('addProductscustomer',JSON.stringify(info));     
        }
  }

  function designSelect(info,index) {
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
    });

    vm.type.forEach(function(element) {
    if (element.title == info.title) {
      vm.measure = element.measurement;
      vm.measu = vm.measure.split(',');
      vm.mlength=vm.measu.length;
    }
    }, this);


    
  //  vm.customer.forEach(function(element) {    
  //     vm.measureval = JSON.parse(element.measurementsvalue);          
  //   }, this);

    
      // for (var index = 0; index < vm.mlength; index++) {
      //   for (var indexx = 0; indexx < vm.measureval.length; indexx++) {
      //       vm.order[index].xyz[indexx]=vm.measureval[indexx];
      //       console.log(vm.order[index].xyz[indexx]);
      //   }        
      // }
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
          orderdetails.browseimage = vm.src;
          orderdetails.timestamp = vm.orderdate2;
          orderdetails.customerid = vm.seleCust.id;
          orderdetails.customerName = vm.seleCust.customerName;
          orderdetails.orderdate = vm.orderdate1;
          orderdetails.type = vm.order[i].type.title;
          orderdetails.subdesign = vm.order[i].type2;
          orderdetails.material = vm.order[i].materialtype.materialtype;
          orderdetails.color = vm.order[i].color;
          orderdetails.customization = vm.order[i].customization;
          orderdetails.cloth = vm.order[i].cloth;
          orderdetails.measurement = JSON.stringify(vm.order[i].xyz);
               
          orderdetails.$save(function (info) {
            i++;
            final();
          });
        } else {
          window.location = '#/addordernew';
        }
        
  }

}



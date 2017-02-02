angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource','$state'];

function addProductController($resource,$state) {
  var vm = this;
  vm.image = [];
  vm.images = [];
  
  var measurement = $resource('/api/measurement');
  measurement.query(function (info) {
    vm.type = info;
  });

  

  vm.typeSelect = typeSelect;
  function typeSelect(info) {
    vm.measurements = [];
    // vm.style1 = info[0].title;
    vm.type.forEach(function (e){
      if(e.title == info)
        vm.measurements.push(e.measurement);
    });
    vm.measure = vm.measurements[0].split(',');
    console.log(vm.measure[0]);
  };  

  var addmaterial = $resource('/api/addmaterial')
  addmaterial.query(function(info){
      vm.material = info;
      // console.log(vm.material);   
  });

  var customerdetails = $resource('/api/customerdetails')
  customerdetails.query(function (info) {
    vm.data = info[2];
    vm.measureWAIST = info[2].measureWAIST;
    vm.measureBUST = info[2].measureBUST;
     vm.measureSH = info[2].measureSH;
     vm.measureLWAIST = info[2].measureLWAIST;
    // console.log(vm.measureWAIST);
  });

}
     


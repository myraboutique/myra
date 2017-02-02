angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource','$state'];

function addProductController($resource,$state) {
  var vm = this;
  vm.image = [];
  vm.images = [];
  // vm.measurements = [];
// console.log(vm.measurements);
  var measurement = $resource('/api/measurement');
  measurement.query(function (info) {
    vm.type = info;
    vm.selected =  vm.type[0].title;
    info.forEach(function (e){
      vm.image = e.image.split('###');
      vm.images.push(vm.image);
      // vm.measurements.push = e.measurement.split(',');
    });
  });

  vm.typeSelect = typeSelect;
  function typeSelect(info) {
    
  };  

  var addmaterial = $resource('/api/addmaterial')
  addmaterial.query(function(info){
      vm.material = info;
      // console.log(vm.material);   
  });
}
     


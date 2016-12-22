angular.module('myra')
  .controller('newclothController', newclothController);

newclothController.$inject = ['$resource'];

function newclothController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
  vm.measurement = measuremet;
  vm.selectMeasurement = [];
  vm.addClothtype = addClothtype;
  var Clothtype = $resource('/api/measurement');

  function measuremet(data){
    vm.selectMeasurement.push(data);
    vm.measu = "";
  }

  function addClothtype(){
    var clothtype = new Clothtype();
    clothtype.title = vm.title;
    clothtype.measurement = JSON.stringify(vm.selectMeasurement);
    clothtype.isActive = vm.isActive;
    clothtype.$save(function(info){
      window.location = '#/clothtype';
    })
  }
}
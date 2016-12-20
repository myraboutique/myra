angular.module('myra')
  .controller('orderController', orderController);

orderController.$inject = ['$resource'];

function orderController($resource) {
  var vm = this;

  vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }

  var measurement = $resource('/api/measurement');
  vm.typeSelect = typeSelect;
  vm.showNext2 = showNext2;
  vm.showNext3 = showNext3;
  vm.showNext4 = showNext4;

  measurement.query(function(info){
    vm.type = info;
  });

  function typeSelect(selecttype){
    vm.type.forEach(function(e){
      if(e.id == selecttype.id){
        vm.clothtype = selecttype.measurement.split(',');
      }
    });
  }

  function showNext2(){
    vm.next2 = true;
  }

  function showNext3(){
    vm.next3 = true;
  }

  function showNext4(){
    vm.next4 = true;
  }

}
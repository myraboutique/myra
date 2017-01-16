angular.module('myra')
  .controller('newclothController', newclothController);

newclothController.$inject = ['$resource'];

function newclothController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
  vm.measurement = measuremet;
  vm.selectMeasurement = [];
  vm.addClothtype = addClothtype;
  vm.isActive = true;
  var Clothtype = $resource('/api/measurement');
  vm.delete = Delete;

  function Delete(number){
    vm.selectMeasurement.splice(number,1);
  }

  function measuremet(data){
    vm.selectMeasurement.push(data);
    vm.measu = "";
   
  }

  function addClothtype(form){
    vm.formSubmitted = true;
    if(form.$valid){
    var newArr =  vm.selectMeasurement.join(",");
    var clothtype = new Clothtype();
    clothtype.title = vm.title;
    clothtype.measurement = newArr;
    console.log(clothtype.measurement);
    clothtype.isActive = vm.isActive;
    clothtype.$save(function(info){
      window.location = '#/clothtype';
    });
    }
  }
}
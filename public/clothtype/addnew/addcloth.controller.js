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
  vm.flag = false;
  var Clothtype = $resource('/api/measurement');
  vm.delete = Delete;

  function Delete(number){
    vm.selectMeasurement.splice(number,1);
  }

  function measuremet(data){
     vm.flagformeasure =0 ;
    if(data){
      console.log(vm.selectMeasurement.length);
      for(var i=0;i<vm.selectMeasurement.length+1;i++){
        if(vm.selectMeasurement[i]==data){
         vm.flagformeasure++;
        }
      }
      if(vm.flagformeasure==0){
    vm.selectMeasurement.push(data);
    vm.measu = "";
      }
   else{
     console.log("Already Exists");
   }
  }
  }

  function addClothtype(form){
    vm.formSubmitted = true;
    if(form.$valid && vm.selectMeasurement.length > 0){
    var newArr =  vm.selectMeasurement.join(",");
    var clothtype = new Clothtype();
    clothtype.title = vm.title;
    clothtype.measurement = newArr;
    console.log(clothtype.measurement);
    clothtype.isActive = vm.isActive;

    clothtype.$save(function(info){
      if(!info.status){
        swal("Record saved successfully.");
  window.location = '#/clothtype';
      }
      else {
        vm.flag = true;
       vm.status = info.status ;
      }
    });
    }
  }
}

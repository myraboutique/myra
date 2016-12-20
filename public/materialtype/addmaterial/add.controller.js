angular.module('myra')
  .controller('addController', addController);

addController.$inject = ['$resource'];

function addController($resource) {

  var AddMaterial = $resource('/api/addmaterial')

  var vm = this;
  vm.materialsave = materialsave ;
  vm.materialcancel = materialcancel ;

   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
function materialcancel()
  {
    window.location = "#/materialtype"
  }
 function materialsave()
 {
   var addmaterial = new AddMaterial();
    if(vm.active)
    {
       addmaterial.active = vm.active;
    }
    else {
      addmaterial.active = "false" ;
    }
   addmaterial.materialtype = vm.materialtype;


   addmaterial.$save(function(info){
    console.log(info) ;
    })

 }

}

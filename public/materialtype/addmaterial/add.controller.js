angular.module('myra')
  .controller('addController', addController);

addController.$inject = ['$resource'];

function addController($resource) {

  var AddMaterial = $resource('/api/addmaterial')

  var vm = this;
  vm.materialsave = materialsave;
  vm.materialcancel = materialcancel;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.active = true;
  function materialcancel() {
    window.location = "#/materialtype"
  }
  function materialsave(frm) {
    vm.formSubmitted = true;
      if(frm.$valid){
    console.log("inside save function")
    var addmaterial = new AddMaterial();
    addmaterial.active = vm.active;
    addmaterial.materialtype = vm.materialtype;


    addmaterial.$save(function (info) {
      console.log(swal("Recored Saved Successfully."));
         
       window.location = "#/materialtype"
    })
   
  }
  }

}

angular.module('myra')
  .controller('addmeasurementsController', addmeasurementsController);

addmeasurementsController.$inject = ['$resource'];

function addmeasurementsController($resource) {

  var AddMeasurement = $resource('/api/managemeasurements')

  var vm = this;
  vm.flag = false ;
  vm.materialsave = materialsave;
  vm.materialcancel = materialcancel;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.active = true;
  function materialcancel() {
    window.location = "#/measurements"
  }
  function materialsave(frm) {
    vm.formSubmitted = true;
      if(frm.$valid){
    console.log("inside save function")
    var addmaterial = new AddMeasurement();
    addmaterial.isActive = vm.active;
    addmaterial.name = vm.measure;


    addmaterial.$save(function (info) {

      if(!info.status){

        console.log(swal("Record saved successfully."));
         window.location = "#/measurements"
      }
      else {
            vm.flag = true;
            vm.status = info.status ;
          }

    })

  }
  }

}

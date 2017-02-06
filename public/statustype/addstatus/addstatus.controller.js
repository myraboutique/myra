angular.module('myra')
  .controller('addstatusController', addstatusController);

addstatusController.$inject = ['$resource'];

function addstatusController($resource) {

  var Addstatus = $resource('/api/addstatuses')

  var vm = this;
  vm.flag = false ;
  vm.statussave = statussave;
  vm.statuscancel = statuscancel;

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.active = true;
  function statuscancel() {
    window.location = "#/statustype"
  }
  function statussave(frm) {
    vm.formSubmitted = true;
      if(frm.$valid){
    console.log("inside save function")
    var addstatus = new Addstatus();
    addstatus.active = vm.active;
    addstatus.statustype = vm.statustype;


    addstatus.$save(function (info) {

      if(!info.status){

        console.log(swal("Record saved successfully."));
         window.location = "#/statustype"
      }
      else {
            vm.flag = true;
            vm.status = info.status ;
          }

    })

  }
  }

}

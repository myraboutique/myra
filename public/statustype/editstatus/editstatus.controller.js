angular.module('myra')
  .controller('editstatusController', editstatusController);

editstatusController.$inject = ['$resource', '$stateParams', '$http'];

function editstatusController($resource, $stateParams, $http) {
  var vm = this;
   vm.flag = false;
  vm.statuscancel = statuscancel;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.data = JSON.parse($stateParams.referer);
  vm.update = update;

  function statuscancel(){
    window.location = '#/statustype';
  }

  function update(frm) {
    if (frm.$valid) {
      $http.put('/api/addstatuses', vm.data)
        .then(
        function (response) {

         if(vm.data.status != 'already00++--'){
          console.log("put successfull")
          window.location = '#/statustype';
         }
         else{
           vm.flag = true;
         }
        },
        function (response) {
          console.log("put unsuccessfull")
        });
    }

  }
}

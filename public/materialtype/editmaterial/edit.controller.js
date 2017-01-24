angular.module('myra')
  .controller('editmaterialController', editmaterialController);

editmaterialController.$inject = ['$resource', '$stateParams', '$http'];

function editmaterialController($resource, $stateParams, $http) {
  var vm = this;
  vm.materialcancel = materialcancel;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.data = JSON.parse($stateParams.referer);
  vm.update = update;

  function materialcancel(){
    window.location = '#/materialtype';
  }

  function update(frm) {
    if (frm.$valid) {
      $http.put('/api/addmaterial', vm.data)
        .then(
        function (response) {
          console.log("put successfull")
          window.location = '#/materialtype';
        },
        function (response) {
          console.log("put unsuccessfull")
        });
    }

  }
}

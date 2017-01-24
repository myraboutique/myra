angular.module('myra')
  .controller('alertController', alertController);

alertController.$inject = ['$resource','$http'];

function alertController($resource,$http) {
  var vm = this;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
  var Register = $resource('/api/customerdetails');
  //  vm.anniversary = true;
  //  vm.birthdate = true;
  //  vm.order = true;
  vm.update = update;

  Register.query(function (info) {
    vm.user = info;
  });

  function update(info) {
    // console.log(info);
    // console.log(vm.user.anniversaryAlert);
    $http.put('/api/customerdetails', info)
      .then(
      function (response) {
        console.log(swal("Recored Updated Successfully."))
        window.location = '#/alert';
      },
      function (response) {
        console.log("put unsuccessfull")
      }
      );

  }


}
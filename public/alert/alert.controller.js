angular.module('myra')
  .controller('alertController', alertController);

alertController.$inject = ['$resource'];

function alertController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  
  // }
   var Register = $resource('/api/customerdetails');
  //  vm.anniversary = true;
  //  vm.birthdate = true;
  //  vm.order = true;

  Register.query(function(info){
    vm.user = info;
  })

}
angular.module('myra')
  .controller('registerController', registerController);

registerController.$inject = ['$resource'];

function registerController($resource) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }
 var vm = this;
  vm.submit = submit;
  var Register = $resource('/api/register');

  Register.query(function(info){
    vm.user = info;
  })

  function submit(){
    var register = new Register()
    register.name = vm.name;
    register.email = vm.email;
    register.type = vm.type;
    register.password = vm.password;
    register.number = vm.number;
    register.address = vm.address;
    register.isActive = true;
    register.$save(function(info){
      window.location = '#/register';
    });
  }

}
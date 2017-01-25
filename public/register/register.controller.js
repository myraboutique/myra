angular.module('myra')
  .controller('registerController', registerController);

registerController.$inject = ['$resource','$state'];

function registerController($resource,$state) {
  var vm = this;
  vm.check = false;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
 var vm = this;
  vm.submit = submit;
  vm.confirm = confirm;
  vm.resetPassword = resetPassword;
  var Register = $resource('/api/register');
  

  Register.query(function(info){
    vm.user = info;
  })

  function confirm(){
    if(vm.password && vm.password1){
    if(vm.password1 == vm.password){
      vm.check = false;
    } else {
      vm.check = true;
    }
    }
  }

  function resetPassword(data){
    console.log(data);
     vm.selectData = JSON.stringify(data);
        $state.go("reset-password", { 'referer': vm.selectData });
  }

  function submit(userform){
    vm.formSubmitted = true;
    if(!vm.check && userform.$valid){
    var register = new Register()
    register.name = vm.name;
    register.email = vm.email;
    register.type = vm.type;
    register.password = vm.password;
    register.number = vm.number;
    register.address = vm.address;
    register.isActive = true;
    register.$save(function(info){
      if(info.status){
        swal(info.status);
      } else {
      swal("Record Saved Successfully.");
         window.location = '#/register';
      }
     
    });
  }
  }
}
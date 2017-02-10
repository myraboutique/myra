angular.module('myra')
  .controller('registerController', registerController);

registerController.$inject = ['$resource','$state'];

function registerController($resource,$state) {
  var vm = this;
  vm.order = order;
  vm.check = false;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }

    vm.predicate = '';
  vm.reverse = true;
  function order(predicate) {
    vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
    vm.predicate = predicate;
  };
  
 var vm = this;
  vm.submit = submit;
  vm.confirm = confirm;
  vm.resetPassword = resetPassword;
  var Register = $resource('/api/register');
  
  vm.filters = {
    search: ''
  };

  Register.query(function(info){
   // vm.user = info(reverse);
     vm.user = info.reverse();
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
    if(!vm.check && userform){
    var register = new Register()
    
       var i, c, txt = "";
       var x = vm.name;
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i ==0) {
                c = c.toUpperCase();
            }
            txt += c;
       }
   console.log(txt);

    register.name = txt;
    register.email = vm.email;
    register.username = vm.username;
    register.type = vm.type;
    register.password = vm.password;
    register.number = vm.number;
    register.address = vm.address;
    register.isActive = true;
    
    register.$save(function(info){
      console.log(info.status);
      console.log(info);
      if(info.status){
        swal(info.status);
      } else {
      swal("Record saved successfully.");
         window.location = '#/register';
      }
     
    });
  }
  }
}
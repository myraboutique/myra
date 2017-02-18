angular.module('myra')
  .controller('loginController', loginController);

loginController.$inject = ['$resource','$state'];

function loginController($resource,$state) {

  var vm = this;
  vm.data = data;
  var Login = $resource('/api/register');
  Login.query(function (info) {
    vm.Login = info;
  });
  function setup(x){
    if(x.isActive==1){
           localStorage.setItem('token',JSON.stringify(x));
       // window.location = '#/home';
        $state.go('home'); 
    }
    else{
      vm.validationmsg="Username might be inactive.";
    }   

  }
  function data(myform){
    vm.formSubmitted = true;
    if(myform.$valid){
     for(var i=0;i<=vm.Login.length;i++){
      if(vm.Login[i].username==vm.username &&  vm.Login[i].password==vm.password){        
          setup(vm.Login[i]);
      }          
     }
 
      
     }
  }  



}
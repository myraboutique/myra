angular.module('myra')
  .controller('passwordController', passwordController);

passwordController.$inject = ['$resource','$http','$stateParams'];

function passwordController($resource,$http,$stateParams) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }

  vm.change = change;
  vm.data = [];
  var id = $stateParams.data;
  vm.data.push(id);
  function change(){
    var password = vm.password;
    vm.data.push(password);
      $http.put('/api/forgot',vm.data)
       .then(
          function(response){
            window.location = '#/login';
        },
        function(err){
          console.log(err);
        })
    
    
     
  }

}
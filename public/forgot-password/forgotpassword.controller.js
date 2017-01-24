angular.module('myra')
  .controller('forgotpasswordController', forgotpasswordController);

forgotpasswordController.$inject = ['$resource'];

function forgotpasswordController($resource) {
  var vm = this;
    vm.submit = submit;
    var Forgot = $resource('/api/forgot');
    function submit(){
      var forgot = new Forgot();
      forgot.email = vm.email;
      forgot.$save(function(info){
        if(info.status){
          swal(info.status)
        } else {
          
        window.location = '#/login';
        }
        
      });
    }
}
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
        // Console.log(response.data.msg) 
         if(response.data.msg){
            vm.flag = true;
        }
         else{

           console.log("put successfull")
          window.location = '#/statustype';
 
        }
    
        
        });
    }

  }

  
}

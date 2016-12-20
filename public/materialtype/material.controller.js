angular.module('myra')
  .controller('materialtypeController', materialtypeController);

materialtypeController.$inject = ['$resource'];

function materialtypeController($resource) {

  var vm = this;
  vm.materialdata = [] ;
   vm.token = JSON.parse(localStorage.getItem('token'));
  // if(!vm.token){
  //   window.location = '#/login';
  // }

  var addmaterial = $resource('/api/addmaterial')
  addmaterial.query(function(info){
    console.log(info) ;
      vm.materialdata = info ;
   })
}

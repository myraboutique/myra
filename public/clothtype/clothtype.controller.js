angular.module('myra')
  .controller('clothtypeController', clothtypeController);

clothtypeController.$inject = ['$resource','$state'];

function clothtypeController($resource,$state) {
  var vm = this;
  vm.editpage = editpage;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
  var measurement = $resource('/api/measurement');
  measurement.query(function(info){
    vm.type = info;
  });

   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);
     $state.go("editclothtype",{ 'referer': vm.selectData});
   }
}
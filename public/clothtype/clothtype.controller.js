angular.module('myra')
  .controller('clothtypeController', clothtypeController);

clothtypeController.$inject = ['$resource','$state'];

function clothtypeController($resource,$state) {
  var vm = this;
  vm.temp = false;
  vm.editpage = editpage;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
  var measurement = $resource('/api/measurement');
  measurement.query(function(info){
    vm.type = info;
      // console.log(vm.type);
    
    vm.image = [];
    info.forEach(function (e){
      vm.image = e.image.split('###');
      // console.log(vm.image);
    });
    
    
  });

   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);
     $state.go("editclothtype",{ 'referer': vm.selectData});
   }
}
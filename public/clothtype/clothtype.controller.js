angular.module('myra')
  .controller('clothtypeController', clothtypeController);

clothtypeController.$inject = ['$resource','$state','$scope'];

function clothtypeController($resource,$state,$scope) {
  var vm = this;

  vm.image = [];
  vm.images = [];
  vm.editpage = editpage;

  vm.temp = function(data) {
    $scope.index = data;
  }
  
  vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }

  var measurement = $resource('/api/measurement');
  measurement.query(function(info){
    vm.type = info;
    info.forEach(function (e){
      vm.image = e.image.split('###');
      vm.images.push(vm.image);
    });
  });

   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);
     if(localStorage.getItem('editcloth')){
       localStorage.removeItem('editcloth');
       localStorage.setItem('editcloth',vm.selectData);
     }
     else{
            localStorage.setItem('editcloth',vm.selectData);       
     }
     //localStorage.setItem('editcloth',vm.selectData);
     $state.go("editclothtype",{ 'referer': vm.selectData});
   }
}
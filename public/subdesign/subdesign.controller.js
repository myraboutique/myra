angular.module('myra')
  .controller('subdesignController', subdesignController);

subdesignController.$inject = ['$resource','$state','$scope'];

function subdesignController($resource,$state,$scope) {
  var vm = this;

  vm.image = [];
  vm.images = [];
  vm.editpage = editpage;

  vm.temp = function(data) {
    console.log(data);
    $scope.index = data;
    console.log($scope.index);
  }
  
  vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }

  var measurement = $resource('/api/addsubdesign');
  measurement.query(function(info){
    vm.type = info;
    console.log(vm.type);
    info.forEach(function (e){
      vm.image = e.image.split('###');
      vm.images.push(vm.image);
    });
    console.log(vm.images);
  });

   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);
     $state.go("editsubdesign",{ 'referer': vm.selectData});
   }
}
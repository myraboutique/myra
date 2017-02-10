angular.module('myra')
  .controller('subdesignController', subdesignController);

subdesignController.$inject = ['$resource','$state','$scope'];

function subdesignController($resource,$state,$scope) {
  var vm = this;

  // vm.image = [];
  // vm.images = [];
  vm.editpage = editpage;
vm.order = order;
  vm.temp = function(data) {
    $scope.index = data;
  }
  vm.filters = {
     search: ''
  }
  vm.predicate = '';
  vm.reverse = true;
  function order(predicate) {
    vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
    vm.predicate = predicate;
  };
  
  vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }

  var measurement = $resource('/api/addsubdesign');
  measurement.query(function(info){
    vm.type = info.reverse();
    // info.forEach(function (e){
    //   vm.image = e.image.split('###');
    //   vm.images.push(vm.image);
    // });
  });

   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);
       if(localStorage.getItem('subdesign')){
       localStorage.removeItem('subdesign');
       localStorage.setItem('subdesign',vm.selectData);
     }
     else{
            localStorage.setItem('subdesign',vm.selectData);       
     }
     $state.go("editsubdesign",{ 'referer': vm.selectData});
   }
}
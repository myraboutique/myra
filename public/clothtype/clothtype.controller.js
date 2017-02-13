angular.module('myra')
  .controller('clothtypeController', clothtypeController);

clothtypeController.$inject = ['$resource','$state','$scope'];

function clothtypeController($resource,$state,$scope) {
  var vm = this;

  // vm.image = [];
  // vm.images = [];
  vm.editpage = editpage;
  vm.order = order;

  vm.temp = function(data) {
    $scope.index = data;
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

  var measurement = $resource('/api/measurement');
  measurement.query(function(info){
    vm.type = info;
    vm.measure = [];
    console.log(vm.type);

    for (var index = 0; index < info.length; index++) {
      
    }

    // info.forEach(function (e){
    //   vm.mesu1 = e.measurement;
    //   vm.mesu = vm.mesu1.split(',');
    //   vm.measure.push(vm.mesu); 
    // });
    console.log(vm.measure);
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
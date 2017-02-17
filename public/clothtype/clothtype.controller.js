angular.module('myra')
  .controller('clothtypeController', clothtypeController);

clothtypeController.$inject = ['$resource','$state','$scope'];

function clothtypeController($resource,$state,$scope) {
  var vm = this;

  vm.editpage = editpage;
  vm.order = order;
  vm.dynamicmeasure = [[]];

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
  var managemeasurements = $resource('/api/managemeasurements');
  
  managemeasurements.query(function(info){
    vm.manamgemeasure = info;
  });

  measurement.query(function(info){
    vm.type = info;  

    // for (var index = 0; index < info.length; index++) {
    //   vm.m = info[index].measurement.split(',');
    //   vm.m.forEach(function(element2) {
    //   vm.dynamicmeasure[index].push(vm.manamgemeasure[element2].name);
    //     console.log(vm.dynamicmeasure[index]);
    //   }, this);  
    // }  

    // info.forEach(function(element) {

    //   vm.m = element.measurement.split(',');

    //   vm.m.forEach(function(element2) {
    //     vm.dynamicmeasure[0].push(vm.manamgemeasure[element2].name);
    //   }, this);
    // console.log(vm.dynamicmeasure[0]);

    // }, this);

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
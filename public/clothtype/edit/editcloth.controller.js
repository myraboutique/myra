angular.module('myra')
  .controller('editclothController', editclothController);

editclothController.$inject = ['$resource','$stateParams','$http'];

function editclothController($resource,$stateParams,$http) {
  var vm = this;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
   vm.data = JSON.parse($stateParams.referer);
   vm.measurement = measuremet;
   vm.update = update;
   vm.delete = Delete;
   vm.selectMeasurement = [];
   vm.selectMeasurement = vm.data.measurement.split(',');
   console.log(vm.selectMeasurement);

   function measuremet(data){
    vm.selectMeasurement.push(data);
    vm.measu = "";
  }

  function Delete(number){
    vm.selectMeasurement.splice(number,1);
  }

  function update(form){
    if(form.$valid){
    vm.data.measurement = vm.selectMeasurement.join(',');
    console.log(vm.data);

    $http.put('/api/measurement', vm.data)
      .then(
        function(response){
          console.log("put successfull")
          window.location = '#/clothtype';
        },
        function(response){
          console.log("put unsuccessfull")
    });
  }
  }
  
}
angular.module('myra')
  .controller('editsubdesignController', editsubdesignController);

editsubdesignController.$inject = ['$resource', '$stateParams', '$http'];

function editsubdesignController($resource, $stateParams, $http) {
  var vm = this;
    vm.measurementstype = [] ;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.data = JSON.parse($stateParams.referer);
  vm.subdesign = subdesign;
  vm.update = update;
  vm.delete = Delete;
  vm.selectMeasurement = [];
  vm.selectMeasurement = vm.data.subdesign.split(',');
  console.log(vm.selectMeasurement);

  // function subdesign(data,image) {
  //   if (data) {
  //     vm.selectMeasurement.push(data);
  //     vm.subdesi = "";
  //   }
  // }

  function Delete(number) {
    vm.selectMeasurement.splice(number, 1);
  }

  function update(form) {
    if (form.$valid) {
      vm.data.subdesign = vm.selectMeasurement.join(',');
      console.log(vm.data);

      $http.put('/api/addsubdesign', vm.data)
        .then(
        function (response) {
          console.log("put successfull")
          window.location = '#/subdesign';
        },
        function (response) {
          console.log("put unsuccessfull")
        });
    }
  }
var measurement = $resource('/api/measurement')
  measurement.query(function(info){
    console.log(info);
     
      vm.measurementstype = info ;
      console.log(vm.measurementstype);
        
   });
}
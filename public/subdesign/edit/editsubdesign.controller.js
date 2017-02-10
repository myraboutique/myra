angular.module('myra')
  .controller('editsubdesignController', editsubdesignController);

editsubdesignController.$inject = ['$resource', '$stateParams', '$http', '$scope'];

function editsubdesignController($resource, $stateParams, $http,$scope) {
  var vm = this;
  vm.flag = false;
    vm.measurementstype = [] ;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
   
  

  //vm.data = JSON.parse($stateParams.referer);
  vm.data1=localStorage.getItem('subdesign');
  vm.data = JSON.parse(vm.data1);
  console.log(vm.data);
  vm.subdesign = subdesign;
  vm.update = update;
  vm.delete = Delete;
  vm.selectMeasurement = vm.data.subdesign;
  vm.subdesignimage = vm.data.subdesignimage;

  function subdesign(data,image) {
    if (data) {
      vm.selectMeasurement.push(data);
      vm.subdesi = "";
    }
  }

  function Delete(number) {
    vm.selectMeasurement.splice(number, 1);
  }


 $scope.single = function (image) {
      vm.src=image;
      // vm.subdesignimage = vm.data.subdesignimage;
       vm.data.subdesignimage = vm.src;

      
    //console.log('src data'+vm.src);
  };


  function update(form) {
    if (form.$valid) {
      // vm.data.subdesign = vm.selectMeasurement.join(',');

      $http.put('/api/addsubdesign', vm.data)
        .then(
        function (response) {
          if(response.data.msg){
                    vm.flag = true;
         }
         else{
           console.log("put successfull")
          window.location = '#/subdesign';
         }
          
        },
        function (response) {
          console.log("put unsuccessfull")
        });
    }
  }
var measurement = $resource('/api/measurement')
  measurement.query(function(info){
      vm.measurementstype = info ;
   });
}
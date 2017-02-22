angular.module('myra')
  .controller('editclothController', editclothController)
  .directive('myDirective', function() {
     function link(scope, elem, attrs, ngModel) {
          ngModel.$parsers.push(function(viewValue) {
            var reg = /^[^`~!@#$%\^&*()-_+={}|[\]\\:';"<>?,./]*$/;            
            if (viewValue.match(reg)) {
              return viewValue;
            }
            var transformedValue = ngModel.$modelValue;
            ngModel.$setViewValue(transformedValue);
            ngModel.$render();
            return transformedValue;
          });
      }
      return {
          restrict: 'A',
          require: 'ngModel',
          link: link
      };      
  }); 

editclothController.$inject = ['$resource', '$stateParams', '$http'];

function editclothController($resource, $stateParams, $http) {
  var vm = this;
    vm.measurementstype = [] ;
   
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.data1=localStorage.getItem('editcloth');
  vm.data = JSON.parse(vm.data1);
  vm.measurement = measuremet;
  vm.update = update;
  vm.delete = Delete;
   vm.flag = false;
  vm.selectMeasurement = [];
  vm.selectMeasurement = vm.data.measurement.split(',');

  function measuremet(data) {
    if (data) {
      vm.selectMeasurement.push(data);
      vm.measu = "";
    }
  }

  function Delete(number) {
    vm.selectMeasurement.splice(number, 1);
  }

  function update(form) {
    if (form.$valid) {
      vm.data.measurement = vm.selectMeasurement.join(',');

      $http.put('/api/measurement', vm.data)
        .then(
        function (response) {
          if(!response.data.msg){
             console.log("put successfull")
             window.location = '#/clothtype';
          }
          else {
          vm.flag = true;
          //vm.status = info.status;
        }
      });

    }
  }
  var managemeasurements = $resource('/api/managemeasurements')
  managemeasurements.query(function(info){
      vm.measurementstype = info ;
   });
}

  //        else{
  //          vm.flag = true;
  //        }
  //       },
  //       function (response) {
  //         console.log("put unsuccessfull")
  //       });
  //   }
  // }

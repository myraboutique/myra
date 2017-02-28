angular.module('myra')
  .controller('editclothController', editclothController)
  .directive('noSpecialChar', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == null)
            return ''
          cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    }
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

  // function measuremet(data) {
  //   if (data) {
  //     vm.selectMeasurement.push(data);
  //     vm.measu = "";
  //    } else {
  //       console.log("Already Exists");
  //     } 
  //   }
  
  //New change 
  function measuremet(data) {
    vm.flagformeasure = 0;
    if (data) {
      for (var i = 0; i < vm.selectMeasurement.length + 1; i++) {
        if (vm.selectMeasurement[i] == data) {
          vm.flagformeasure++;
        }
      }
      if (vm.flagformeasure == 0) {
        vm.selectMeasurement.push(data);
        vm.measu = "";
      }
      else {
        console.log("Already Exists");
      }
    }
  }

  function Delete(number) {
    vm.selectMeasurement.splice(number, 1);
  }

  function update(form) {
  if (form.$valid && vm.selectMeasurement.length > 0) {     
    vm.data.measurement = vm.selectMeasurement.join(',');

      $http.put('/api/measurement', vm.data)
        .then(
        function (response) {
          if(!response.data.msg){
            console.log(swal("Your record has been Updated."));
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

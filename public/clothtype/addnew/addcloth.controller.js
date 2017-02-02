angular.module('myra')
  .controller('newclothController', newclothController);

newclothController.$inject = ['$resource', '$scope'];

function newclothController($resource, $scope) {
  var vm = this;
  vm.measurementstype = [] ;
  // vm.src = [];
  
  // $scope.single = function (image) {
  //   image.forEach(function (e) {
  //     vm.src.push(e.resized.dataURL);
  //   });
  //   console.log(vm.src);
  // };
  


  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.measurement = measuremet;
  // vm.single = single;
  vm.selectMeasurement = [];
  vm.addClothtype = addClothtype;
  vm.isActive = true;
  vm.flag = false;
  var Clothtype = $resource('/api/measurement');
  vm.delete = Delete;

  function Delete(number) {
    vm.selectMeasurement.splice(number, 1);
  }

  function measuremet(data) {
    vm.flagformeasure = 0;
    if (data) {
      console.log(vm.selectMeasurement.length);
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

    // function single(data) {
    //   vm.data = data;
    //   // console.log(vm.data);
    //   vm.src.push(data);
    //   // vm.measu = "";
    //   console.log(vm.src);
    // }

  function addClothtype(form) {
    vm.formSubmitted = true;
    if (form.$valid && vm.selectMeasurement.length > 0) {
      var newArr = vm.selectMeasurement.join(",");
      // var newArr2 = vm.src.join("###");
      var clothtype = new Clothtype();
      clothtype.title = vm.title;
      clothtype.measurement = newArr;
      clothtype.isActive = vm.isActive;
      // clothtype.image = newArr2;
      //console.log(newArr2);

      clothtype.$save(function (info) {
        if (!info.status) {
          swal("Recored Saved Successfully.");
          window.location = '#/clothtype';
        }
        else {
          vm.flag = true;
          vm.status = info.status;
        }
      });

    }
  }

  var managemeasurements = $resource('/api/managemeasurements')
  managemeasurements.query(function(info){
    console.log(info);
     
      vm.measurementstype = info ;
      console.log(vm.measurementstype);
        
   });
}

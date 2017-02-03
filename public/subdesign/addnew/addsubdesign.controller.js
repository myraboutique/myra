angular.module('myra')
  .controller('newsubdesignController', newsubdesignController);

newsubdesignController.$inject = ['$resource', '$scope'];

function newsubdesignController($resource, $scope) {
  var vm = this;
  vm.src ;
  
  $scope.single = function (image) {
      vm.src=image;
    console.log(vm.src);
  };
  


  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.subdesign = subdesign;
  // vm.single = single;
  vm.selectMeasurement = [];
  vm.addClothtype = addClothtype;
  vm.isActive = true;
  vm.flag = false;
  var AddSubDesign = $resource('/api/Addsubdesign');
  vm.delete = Delete;

  function Delete(number) {
    vm.selectMeasurement.splice(number, 1);
  }

  function subdesign(data,image) {
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
        vm.subdesi = "";
      }
      else {
        console.log("Already Exists");
      }
    }
    if(image){
      vm.src = image;
    console.log(image);
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
    if (form.$valid) {



      // var newArr = vm.selectMeasurement.join(",");
    
      var addsubdesign = new AddSubDesign();
      addsubdesign.design = vm.designs;
      // addsubdesign.subdesign = newArr;
      addsubdesign.subdesign = vm.subdesigns;
      addsubdesign.subdesinimage = vm.src;
      addsubdesign.isActive = vm.isActive;

      addsubdesign.$save(function (info) {
        // if (!info.status) {
          swal("Recored Saved Successfully.");
          window.location = '#/subdesign';
        // }
        // else {
        //   vm.flag = true;
        //   vm.status = info.status;
        // }
      });

    }
  }

  var managemeasurements = $resource('/api/measurement')
  managemeasurements.query(function(info){
      vm.design = info ;
   });
}

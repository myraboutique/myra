angular.module('myra')
  .controller('newsubdesignController', newsubdesignController);

newsubdesignController.$inject = ['$resource', '$scope'];

function newsubdesignController($resource, $scope) {
  var vm = this;
  vm.flag = false;
  vm.flagforimg  = false;
  $scope.single = function (image,form) {
    vm.src=image;  
    if (!vm.src) {
        // alert("Name must be filled out");
        vm.flagforimg = true;
    }else{
        addClothtype(form);
    }
  };
  


  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  vm.addClothtype = addClothtype;
  vm.isActive = true;
  var AddSubDesign = $resource('/api/addsubdesign');

  function addClothtype(form) {
    vm.formSubmitted = true;
    if (form.$valid) {



      // var newArr = vm.selectMeasurement.join(",");
    
      var addsubdesign = new AddSubDesign();
      
      addsubdesign.design = vm.designs;
      // addsubdesign.subdesign = newArr;
      addsubdesign.subdesign = vm.subdesigns;
      addsubdesign.subdesignimage = vm.src;
      addsubdesign.isActive = vm.isActive;

      addsubdesign.$save(function (info) {
        if (!info.status) {
          swal("Your record has been saved successfully.");
          window.location = '#/subdesign';
        }
        else {
          vm.flag = true;
          vm.status = info.status;
        }
      });

    }
  }

  var managemeasurements = $resource('/api/measurement')
  managemeasurements.query(function(info){
      vm.design = info ;
   });
}

angular.module('myra')
  .controller('newsubdesignController', newsubdesignController);

newsubdesignController.$inject = ['$resource', '$scope','Upload','$window'];

function newsubdesignController($resource, $scope,Upload, $window) {
  var vm = this;
  vm.flag = false;
  vm.flagforimg  = false;





  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  vm.addClothtype = addClothtype;
  vm.isActive = true;
  var AddSubDesign = $resource('/api/addsubdesign');
var addsubdesign = new AddSubDesign();
  function addClothtype(form) {
    vm.formSubmitted  = true;
    if (form.$valid) {
      vm.submit();

      // var newArr = vm.selectMeasurement.join(",");
    
      
      
      addsubdesign.design = vm.designs;
      // addsubdesign.subdesign = newArr;
      addsubdesign.subdesign = vm.subdesigns;
      console.log(vm.file);
      addsubdesign.isActive = vm.isActive;
     
      

    }
  }
   vm.submit = function(){ //function to call on form submit
        if (vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    };
    
    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                addsubdesign.subdesignimage = resp.data.fname;
                console.log(vm.addsubdesignimage);
                addsubdesign.$save(function (info) {
        if (!info.status) {
          swal("Recored Saved Successfully.");
          window.location = '#/subdesign';
        }
        else {
          vm.flag = true;
          vm.status = info.status;
        }
      });
            } 
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
  
  var managemeasurements = $resource('/api/measurement')
  managemeasurements.query(function(info){
      vm.design = info ;
   });
}

angular.module('myra')
  .controller('editsubdesignController', editsubdesignController);

editsubdesignController.$inject = ['$resource', '$stateParams', '$http', '$scope','Upload','$window'];

function editsubdesignController($resource, $stateParams, $http,$scope,Upload, $window) {
  var vm = this;
  vm.file =null;
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
  // vm.subdesign = subdesign;
  vm.update = update;
  // vm.delete = Delete;
  vm.selectMeasurement = vm.data.subdesign;
  vm.subdesignimage = vm.data.subdesignimage;

  // function subdesign(data,image) {
  //   if (data) {
  //     vm.selectMeasurement.push(data);
  //     vm.subdesi = "";
  //   }
  // }

  // function Delete(number) {
  //   vm.selectMeasurement.splice(number, 1);
  // }


//  $scope.single = function (image) {
//       vm.src=image;
//       // vm.subdesignimage = vm.data.subdesignimage;
//        vm.data.subdesignimage = vm.src;

      
//     //console.log('src data'+vm.src);
//   };


  function update(form) {
    if (form.$valid) {
      // vm.data.subdesign = vm.selectMeasurement.join(',');
      if(!vm.file){
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
      }else
      {
        vm.submit();
      }
    }
  }
     vm.submit = function(){ //function to call on form submit
        if (vm.file!= null) { //check if from is valid
             //call upload function
             vm.upload(vm.file);
        }
    };
    
    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                vm.data.subdesignimage = resp.data.fname;
                // console.log( resp.data.fname);
                // console.log( vm.data.subdesignimage);
                      $http.put('/api/addsubdesign', vm.data)
                          .then(
                          function (response) {
                            if(response.data.msg){
                                      vm.flag = true;
                          }
                          else{
                            // console.log("put successfull")
                            window.location = '#/subdesign';
                          }
                            
                          },
                          function (response) {
                            // console.log("put unsuccessfull")
                          });
            } 
        }, function (resp) { //catch error
            // console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            // console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };

var measurement = $resource('/api/measurement')
  measurement.query(function(info){
      vm.measurementstype = info ;
   });
}

 

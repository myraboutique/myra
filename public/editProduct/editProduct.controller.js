angular.module('myra')
  .controller('editProductController', editProductController);

editProductController.$inject = ['$resource', '$state', '$http', 'Upload', '$window'];

function editProductController($resource, $state, $http, Upload, $window) {
  var vm = this;
  vm.abcd =[];

  vm.inexforprompt = function (index) {
    vm.indexforpromptbox = index;
  };

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);

  vm.data2 = localStorage.getItem('customerdetailsnew');
  vm.records2 = JSON.parse(vm.data2);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  vm.measurevalue = [[]];
  vm.measurename = [[]];

  var customer = $resource('/api/orderdetails');
  customer.query(function (response) {
    vm.productwiserecord = [];
      for (var index = 0; index < response.length; index++) {
        if(response[index].timestamp == vm.records.timestamp) {
          vm.productwiserecord.push(response[index]);
          vm.measurevalue[index] = JSON.parse(response[index].measurement);
          vm.measurename[index] = response[index].measurementname.split(',');
        }
      }  
      vm.len = vm.productwiserecord.length;
  });

  vm.update = function(info) {

      vm.fileup(function(){
        for (var index = 0; index < info.length; index++) {
          info[index].measurement = JSON.stringify(vm.measurevalue[index]);
          info[index].browseimage = vm.abcd[index];

          $http.put('/api/orderdetails', info[index])
            .then(
            function (response) {
              window.location = '#/editorder';
            },
            function (err) {
              console.log(err);
            });
        }  
      });
  };

  vm.tempimg = [];
 vm.i = 0;
  //file uploa ==========================================
  vm.fileup = function (cb) { //function to call on form submit
    if (vm.order[vm.i]) { //check if from is valid
      vm.upload(vm.order[vm.i].image,cb); //call upload function
    }
    else{
      vm.tempimg.push("");
     vm.i++;
      vm.fileup(cb);
    }
  };

  vm.upload = function (file,cb) {
    Upload.upload({
      url: 'http://myraboutique.herokuapp.com/upload', //webAPI exposed to upload the file
      // url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
      data: { file: file } //pass file as data, should be user ng-model
    }).then(function (resp) { //upload function returns a promise
      if (resp.data.error_code === 0) { //validate success
        
        vm.abcd[vm.i] = resp.data.fname;

        if (vm.i < vm.len -1) {
          vm.i++;
          if(vm.order[vm.i]){
          vm.upload(vm.order[vm.i].image,cb);
          }else{
            cb();
          }
        }
        else{
          cb();
        }
        console.log(vm.abcd[vm.i]);
        
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
  //file uploa ==========================================

}



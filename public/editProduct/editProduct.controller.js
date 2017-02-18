angular.module('myra')
  .controller('editProductController', editProductController);

editProductController.$inject = ['$resource', '$state', '$http', 'Upload', '$window'];

function editProductController($resource, $state, $http, Upload, $window) {
  var vm = this;

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
      // vm.len = vm.productwiserecord.length;
  });

  vm.update = function(info) {

      // vm.fileup();
      for (var index = 0; index < info.length; index++) {
        info[index].measurement = JSON.stringify(vm.measurevalue[index]);
        info[index].browseimage = vm.tempimg[index];
        $http.put('/api/orderdetails', info[index])
          .then(
          function (response) {
            window.location = '#/editorder';
          },
          function (err) {
            console.log(err);
          });
      }  

    // vm.fileup().then(function () {
    //   for (var index = 0; index < info.length; index++) {
    //     info[index].measurement = JSON.stringify(vm.measurevalue[index]);
    //     info[index].browseimage = vm.tempimg[index];
    //     $http.put('/api/orderdetails', info[index])
    //       .then(
    //       function (response) {
    //         window.location = '#/editorder';
    //       },
    //       function (err) {
    //         console.log(err);
    //       });
    //   }
    // });
  };



  var i = 1;
  vm.fileup = function () {
    if(vm.order){
      vm.upload(vm.order[0].image);
    }
  };
  vm.tempimg = [];
  vm.upload = function (file) {
    Upload.upload({
      url: 'https://myraboutique.herokuapp.com/upload',
      data: { file: file } 
    }).then(function (resp) { 
      if (resp.data.error_code === 0) { 
        if(resp.data.fname){
          vm.tempimg.push(resp.data.fname);
        }
        else{
          vm.tempimg.push("");
        }
        
        console.log(vm.tempimg);

        vm.upload(vm.order[i].image);
        if (i < vm.len) {
          i++;
        }
      }

    }, function (resp) {
      $window.alert('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      vm.progress = 'progress: ' + progressPercentage + '% ';
    });
  };



}



angular.module('myra')
  .controller('editProductController', editProductController);

editProductController.$inject = ['$resource', '$state', '$http', 'Upload', '$window'];

function editProductController($resource, $state, $http, Upload, $window) {
  var vm = this;

  vm.inexforprompt = function (index) {
    vm.indexforpromptbox = index;
  };

  vm.measu = [];
  vm.designSelect = designSelect;

  vm.data1 = localStorage.getItem('orderdetailsnew');
  vm.records = JSON.parse(vm.data1);

  vm.data2 = localStorage.getItem('customerdetailsnew');
  vm.records2 = JSON.parse(vm.data2);

  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }

  var customerdetails = $resource('/api/customerdetails');
  customerdetails.query(function (info) {
    vm.customer = info;
  });

  var measurement = $resource('/api/measurement');
  measurement.query(function (info) {
    vm.type = info;
  });

  var addmaterial = $resource('/api/addmaterial');
  addmaterial.query(function (info) {
    vm.material = info;
  });

  var addsubdesign = $resource('/api/addsubdesign');
  addsubdesign.query(function (info) {
    vm.subdesign = [];
    // vm.subdesignimage  = [];
    info.forEach(function (e){
      if(e.design.trim() == vm.records.type) {
        // vm.subdesignimage.push(e.subdesignimage);
        vm.subdesign.push(e.subdesign);
      }
    });
  });

  var customer = $resource('/api/orderdetails');
  customer.query(function (response) {
    vm.productwiserecord = [];
      for (var index = 0; index < response.length; index++) {
        if(response[index].timestamp == vm.records.timestamp) {
          vm.productwiserecord.push(response[index]);
        }
      }      
  });


  vm.clicked = function (info) {
    vm.productwiserecord[vm.newinex].type = info;

  };

  // vm.designSelect = function (info, index) {
  //   vm.newinex = index;
  //   vm.productwiserecord[vm.newinex].type2 = '';

  //   addsubdesign.query(function (subdesigns) {
  //     vm.subdesign = [];
  //     vm.subdesignimage = [];
  //     subdesigns.forEach(function (e) {
  //       console.log(e);
  //       if (e.design.trim() == info.title) {
  //         vm.subdesignimage.push(e.subdesignimage);
  //         vm.subdesign.push(e.subdesign);
  //       }
  //     });
  //   });
  // };

    function designSelect(info, index) {

    vm.newinex = index;
    vm.order[vm.newinex].type2 = '';

    addsubdesigns.query(function (subdesigns) {
      vm.subdesign = [];
      vm.subdesignimage = [];
      subdesigns.forEach(function (e) {
        if (e.design.trim() == info.title) {
          vm.subdesignimage.push(e.subdesignimage);
          vm.subdesign.push(e.subdesign);
        }
      });
    });

    vm.type.forEach(function (element) {
      if (element.title == info.title && element.isActive) {
        vm.measure = element.measurement;
        vm.measu[vm.newinex] = vm.measure.split(',');
      }
    }, this);

    var xyz = [];

    for (var j = 0; j < vm.measu[vm.newinex].length; j++) {
      var key = vm.customermeasurementname.indexOf(vm.measu[vm.newinex][j]);
      var val = vm.customermeasurementvalue[key];
      xyz.splice(key, 0, val);
    }
    if (vm.orderDetails[index]) {
      vm.orderDetails[index] = xyz;
    }
    else {
      vm.orderDetails.push(xyz);
    }
  };


  vm.update = function(info) {
    vm.fileup();

    info.forEach(function(element) {
      $http.put('/api/orderdetails', element)
        .then(
        function (response) {
          window.location = '#/editorder';
        },
        function (err) {
          console.log(err);
        });
      }, this);
  };

vm.tempimg = [];
  var i = 1;
  //file uploa ==========================================
  vm.fileup = function () { //function to call on form submit
    if (vm.order[0].image) { //check if from is valid
      vm.upload(vm.order[0].image); //call upload function
    }
  };

  vm.upload = function (file) {
    Upload.upload({
      url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
      data: { file: file } //pass file as data, should be user ng-model
    }).then(function (resp) { //upload function returns a promise
      if (resp.data.error_code === 0) { //validate success

        vm.tempimg.push(resp.data.fname);
        console.log(vm.order[i].image);
      //   vm.upload(vm.order[i].image);
      //   if (i < vm.order.length) {
      //     i++;
      //   }
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



angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource','$state','$http'];

function addProductController($resource,$state,$http) {
  var vm = this;

  vm.designSelect = designSelect;
  vm.submit = submit;
  
  var measurement = $resource('/api/measurement');
  var addmaterial = $resource('/api/addmaterial');
  var customerdetails = $resource('/api/customerdetails');
  var orderdetails = $resource('/api/orderdetails');
  

  measurement.query(function (info) {
    vm.type = info;
  });

  addmaterial.query(function(info){
      vm.material = info; 
  });

  customerdetails.query(function (info) {
    vm.measureWAIST = info[0].measureWAIST;
    vm.measureBUST = info[0].measureBUST;
    vm.measureSH = info[0].measureSH;
    vm.measureLWAIST = info[0].measureLWAIST;
    vm.measureHIPS = info[0].measureHIPS;
    vm.measureSLEEVES = info[0].measureSLEEVES;
    vm.measureSHORT = info[0].measureSHORT;
    vm.measuretype = info[0].measuretype;
    vm.measureLENGTH = info[0].measureLENGTH;
    vm.measureFULL = info[0].measureFULL;
    vm.measureFULLL = info[0].measureFULLL;
    vm.measureKNEE = info[0].measureKNEE;
    vm.measureARMHOLE = info[0].measureARMHOLE;
    vm.measureUTHIGH = info[0].measureUTHIGH;
    vm.measureLTHIGH = info[0].measureLTHIGH;
    vm.measureCALF = info[0].measureCALF;
    vm.measureFNECK = info[0].measureFNECK;
    vm.measureBNECK = info[0].measureBNECK;
    vm.measureMORI = info[0].measureMORI;
    vm.measureCROSS = info[0].measureCROSS;
  });

  function designSelect(info) {
    vm.measurements = [];
    vm.measure = [];
    
    vm.type.forEach(function (e){
      if(e.title == info) {
        vm.measurements.push(e.measurement);
        vm.images = e.image;
        vm.ee = e.id;
      }
    });

    vm.measure1 = vm.measurements[0].split(',');
    vm.images1 = vm.images.split('###');
    console.log(vm.images1);
    vm.measure.push("");
    vm.measure1.forEach(function(element) {
      vm.measure.push(element.trim());
    }, this);
  };  

  function submit(info) {
    // vm.formSubmitted = true;
    // if(form.$valid){
      // if(vm.data.other){
      //   vm.data.billingAddress = vm.data.billingAddress;
      // } else {
      //   vm.data.billingAddress = vm.data.address;
      // }
      // var orderdetails = new Orderdetails();
      // console.log(info);
      info.measureWAIST = vm.measureWAIST;
      info.measureWAIST = vm.measureWAIST;
      info.measureBUST = vm.measureBUST;
      info.measureSH = vm.measureSH;
      info.measureLWAIST = vm.measureLWAIST;
      info.measureHIPS = vm.measureHIPS;
      info.measureSLEEVES = vm.measureSLEEVES;
      info.measureSHORT = vm.measureSHORT;
      info.measuretype = vm.measuretype;
      info.measureLENGTH = vm.measureLENGTH;
      info.measureFULL = vm.measureFULL;
      info.measureFULLL = vm.measureFULLL;
      info.measureKNEE = vm.measureKNEE;
      info.measureARMHOLE = vm.measureARMHOLE;
      info.measureUTHIGH = vm.measureUTHIGH;
      info.measureLTHIGH = vm.measureLTHIGH;
      info.measureCALF = vm.measureCALF;
      info.measureFNECK = vm.measureFNECK;
      info.measureBNECK = vm.measureBNECK;
      info.measureMORI = vm.measureMORI;
      info.measureCROSS = vm.measureCROSS;
      // console.log(info);

      $http.put('/api/orderdetails', info)
      .then(
      function (response) {

        console.log(swal("Record updated successfully."))

        // window.location = '#/alert';
      },
      function (response) {
        console.log("put unsuccessfull")
      }
      );

      // }
    
  };
}
     


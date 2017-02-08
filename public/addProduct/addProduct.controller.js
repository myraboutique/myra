angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource', '$state', '$http'];

function addProductController($resource, $state, $http) {
  var vm = this;

  vm.data1 = localStorage.getItem('editproduct');
  vm.data = JSON.parse(vm.data1);

  // vm.selectimage = function(index) {
  //   vm.index = index;
  // }

  vm.designSelect = designSelect;
  vm.submit = submit;

  var measurement = $resource('/api/measurement');
  var addsubdesigns = $resource('/api/addsubdesign');
  var addmaterial = $resource('/api/addmaterial');
  var customerdetails = $resource('/api/customerdetails');
  var orderdetails = $resource('/api/orderdetails');

  
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var orderdate = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();
  vm.order = [
    {
      orderdate: orderdate
    }
  ]

  measurement.query(function (info) {
    vm.type = info;
  });

  addsubdesigns.query(function (info) {
    vm.type2 = info;
  });

  addmaterial.query(function (info) {
    vm.material = info;
  });
  
    vm.selectCustomer = selectCustomer;
  vm.data = [];


  measurement.query(function (info) {
    vm.type = info;
  });
  customerdetails.query(function (info) {
    vm.customer = info;
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
function selectCustomer(info) {
    vm.seleCust = info;
    vm.contact = info.mobileNumber;
    vm.email = info.email;
    vm.address = info.address
  }

  function designSelect(info) {

    vm.measurements = [];
    vm.measure = [];
    vm.images1 = [];
    vm.images1title = [];

    vm.type.forEach(function (e) {
      if (e.title == info) {
        vm.measurements.push(e.measurement);
        // vm.ee = e.id;
      }
    });

    vm.type2.forEach(function (e) {
      if (e.design == info) {
        vm.images1.push(e.subdesignimage);
        vm.images1title.push(e.subdesign);
      }
    });
    vm.measure1 = vm.measurements[0].split(',');
    vm.measure.push("");
    vm.measure1.forEach(function (element) {
      vm.measure.push(element.trim());
    }, this);
  };

  function submit(info) {
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
    info.id = vm.data.id;


    $http.put('/api/orderdetails', info)
      .then(
      function (response) {
        window.location = '#/subdesign';
      },
      function (response) {
      });
  }
}



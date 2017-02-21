angular.module('myra')
  .controller('newCustomerController', newCustomerController)
  .directive('myDirective', function() {
     function link(scope, elem, attrs, ngModel) {
          ngModel.$parsers.push(function(viewValue) {
            var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/;            
            if (viewValue.match(reg)) {
              return viewValue;
            }
            var transformedValue = ngModel.$modelValue;
            ngModel.$setViewValue(transformedValue);
            ngModel.$render();
            return transformedValue;
          });
      }
      return {
          restrict: 'A',
          require: 'ngModel',
          link: link
      };      
  }); 
newCustomerController.$inject = ['$resource'];

function newCustomerController($resource) {

  var vm = this;

  vm.measurementstype = [] ;
  vm.mname = [];
  vm.mvalue = [];

  vm.token = JSON.parse(localStorage.getItem('token'));
  vm.birthdate = birthdate;
  vm.anniversarydate = anniversarydate;
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.check = check;
  vm.cancel = cancel;
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var orderdate = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();

  var CustomerDetails = $resource('/api/customerdetails')

  function cancel() {
    window.location = '#/customerdetails';
  }

  vm.date1 = false;
  vm.date2 = false;

  function birthdate(date) {
    var b = date.split('/');
    var Date1 = new Date(b[2], b[1] - 1, b[0]);
    Date1.setHours(0, 0, 0, 0, 0);
    myDate.setHours(0,0,0,0,0);
    if (myDate < Date1) {
      vm.date1 = true;

    } else {
      vm.date1 = false;

    }
  }

  function anniversarydate(date) {
    var b = date.split('/');
    var Date1 = new Date(b[2], b[1] - 1, b[0]);
    Date1.setHours(0, 0, 0, 0, 0);
    myDate.setHours(0,0,0,0,0);
    if (myDate < Date1) {
      vm.date2 = true;

    } else {
      vm.date2 = false;

    }
  }

  function check(form) {
    vm.formSubmitted = true;
    if (form.$valid && !vm.date1 && !vm.date2) {
      var customerdetails = new CustomerDetails();

       var i, c, txt = "";
       var x =  vm.customerName;
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i ==0) {
                c = c.toUpperCase();
            }
            txt += c;
       }
   
      customerdetails.customerName = txt;
      customerdetails.gender = vm.gender;
      customerdetails.other = vm.other;
      if (!vm.other) {
        customerdetails.billingAddress = vm.address;
      } else {
        customerdetails.billingAddress = vm.billingAddress;
      }
      customerdetails.birthDate = vm.birthDate;
      customerdetails.anniversaryDate = vm.anniversaryDate;
      customerdetails.mobileNumber = vm.mobileNumber;
      customerdetails.phoneNumber = vm.phoneNumber;
      customerdetails.email = vm.email;
      customerdetails.address = vm.address;
      customerdetails.anniversaryAlert = true;
      customerdetails.birthdayAlert = true;
      customerdetails.remarks = vm.remarks;
      if(vm.data){
        for (var index = 0; index < vm.measurementstype.length; index++) {
          vm.mname.push(vm.measurementstype[index].name);
          vm.mvalue.push(vm.data[index]);
        }
      }
      customerdetails.measurementsname = JSON.stringify(vm.mname);
      customerdetails.measurementsvalue = JSON.stringify(vm.mvalue);

      customerdetails.$save(function(info){

       swal("Your record has been saved successfully.");
          window.location = '#/customerdetails';
       })


    }
  }
  var managemeasurements = $resource('/api/managemeasurements')
  managemeasurements.query(function(info){
      vm.measurementstype = info ;
   });
}

angular.module('myra')
  .controller('customerdetailsController', customerdetailsController);

customerdetailsController.$inject = ['$scope', '$resource', '$state'];

function customerdetailsController($scope, $resource, $state) {

  var vm = this;
  
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.editpage = editpage;
  vm.data = [];
  vm.selectData = [];
  vm.order = order;
  vm.summary = summary;


  vm.filters = {
    search: ''
  };

  vm.predicate = '';
  vm.reverse = true;
  function order(predicate) {
    vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
    vm.predicate = predicate;
  };

  var customerdetails = $resource('/api/customerdetails')
  customerdetails.query(function (info) {
    vm.data = info;
  })

  function editpage(x) {
     vm.selectData = JSON.stringify(x);
     if(localStorage.getItem('edit')){
       localStorage.removeItem('edit');
       localStorage.setItem('edit',vm.selectData);
     }
     else{
            localStorage.setItem('edit',vm.selectData);       
     }
     //localStorage.setItem('edit',vm.selectData);
     $state.go("edit",{ 'referer': vm.selectData});
   }

  function summary(x) {
    vm.selectData = JSON.stringify(x);
 
    
    $state.go("details", { 'referer': vm.selectData });
  }



}

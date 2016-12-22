angular.module('myra')
  .controller('customerdetailsController', customerdetailsController);

customerdetailsController.$inject = ['$scope','$resource','$state'];

function customerdetailsController($scope,$resource,$state) {

  var vm = this;
  vm.editpage = editpage ;
   vm.data = [];
   vm.selectData = [];
   vm.order = order;
  

     vm.filters = {
        search: ''
    };

     vm.predicate = '';
    vm.reverse = true;
    function order (predicate) {
        vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
        vm.predicate = predicate;
    };

  var customerdetails = $resource('/api/customerdetails')
  customerdetails.query(function(info){
      vm.data = info ;
   })

   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);
     $state.go("edit",{ 'referer': vm.selectData});
   }

   

}

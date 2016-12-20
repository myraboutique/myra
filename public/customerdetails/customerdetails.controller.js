angular.module('myra')
  .controller('customerdetailsController', customerdetailsController);

customerdetailsController.$inject = ['$resource','$state'];

function customerdetailsController($resource,$state) {

  var vm = this;
  vm.editpage = editpage ;
   vm.data = [];
   vm.selectData = [];

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

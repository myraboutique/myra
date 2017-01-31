angular.module('myra')
  .controller('summaryController', summaryController);

summaryController.$inject = ['$resource','$state'];

function summaryController($resource,$state) {

  var vm = this;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.editpage = editpage;
  var customerdetails = $resource('/api/customerdetails')
  customerdetails.query(function (info) {
    vm.data = info;
  });

  function editpage(x) {
    vm.selectData = JSON.stringify(x);
    $state.go("details", { 'referer': vm.selectData });
  }


}
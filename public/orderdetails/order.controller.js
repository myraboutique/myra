angular.module('myra')
    .controller('orderController', orderController);

orderController.$inject = ['$resource', '$state'];

function orderController($resource, $state) {
    var vm = this;

    vm.token = JSON.parse(localStorage.getItem('token'));
    // if(!vm.token){
    //   window.location = '#/login';
    // }
    var measurement = $resource('/api/orderdetails');
    var customer = $resource('/api/customerdetails/:id');
    vm.customername = [];
    vm.order = order;


    vm.filters = {
        search: ''
    };

    vm.predicate = '';
    vm.reverse = true;
    function order(predicate) {
        vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
        vm.predicate = predicate;
    };

    vm.sendData = sendData;
    measurement.query(function(info) {
        info.forEach(function(e) {
            customer.get({ id: e.customerid }, function(response) {
                vm.customername.push(response.customerName);
            });
        });
        vm.type = info;
    });

    function sendData(info) {
        vm.selectData = JSON.stringify(info);
        $state.go("editorder", { 'referer': vm.selectData });
    }




}
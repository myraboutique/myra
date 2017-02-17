angular.module('myra')
    .controller('dashboardController', dashboardController);

dashboardController.$inject = ['$resource', '$state'];

function dashboardController($resource, $state) {
    var vm = this;

    vm.token = JSON.parse(localStorage.getItem('token'));
    if (!vm.token) {

        window.location = '#/login';
    }
    var orderdetails = $resource('/api/orderdetails');
    orderdetails.query(function(info){
        vm.type = info;
        console.log(info);
    });
}






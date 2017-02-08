angular.module('myra')
    .controller('orderController', orderController);

orderController.$inject = ['$resource', '$state'];

function orderController($resource, $state) {
    var vm = this;
    vm.myDropDown = "";
    vm.temp = ["Keyword","Status"];

    var addstatus = $resource('/api/addstatuses');
    addstatus.query(function(info){
        // console.log(info);
        vm.status = info ;
    });

    // vm.status = ["New","Stiching", "Cancel"];

    vm.token = JSON.parse(localStorage.getItem('token'));
    if (!vm.token) {

        window.location = '#/login';
    }
    var orderdetails = $resource('/api/orderdetails');
    var customer = $resource('/api/customerdetails/:id');
    vm.customerid = [];
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
    orderdetails.query(function (info) {
        info.forEach(function (e) {
            customer.get({ id: e.customerid }, function (response) {
                vm.customerid.push(response.customerid);
            });
        });
        vm.type = info.reverse();
   });

    function sendData(info) {

     vm.selectData = JSON.stringify(info);
     if(localStorage.getItem('orderdetailsnew')){
       localStorage.removeItem('orderdetailsnew');
       localStorage.setItem('orderdetailsnew',vm.selectData);
     }
     else{
            localStorage.setItem('orderdetailsnew',vm.selectData);       
     }
     $state.go("addordernew",{ 'referer': vm.selectData});
    }
}






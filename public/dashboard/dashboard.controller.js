angular.module('myra')
<<<<<<< HEAD
    .controller('dashboardController', dashboardController);

dashboardController.$inject = ['$resource', '$state'];

function dashboardController($resource, $state) {
    var vm = this;

=======
  .controller('dashboardController', dashboardController);

dashboardController.$inject = ['$resource','$http'];

function dashboardController($resource, $state) {
    var vm = this;
>>>>>>> origin/kajal_16feb
    vm.token = JSON.parse(localStorage.getItem('token'));
    if (!vm.token) {

        window.location = '#/login';
    }
<<<<<<< HEAD

    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    vm.today = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();

    var orderdetails = $resource('/api/orderdetails');
    orderdetails.query(function(info){
        vm.type1 = [];
        info.forEach(function(element) {
            if(element.status != 'Completed' && element.status != 'Cancelled' && element.deliverydate >= vm.today ){
                vm.type1.push(element);
            }
        }, this);

        vm.type2 = [];
        info.forEach(function(element) {
            if(element.status == 'New'){
                vm.type2.push(element);
            }
        }, this);

        vm.type3 = [];
        info.forEach(function(element) {
            if(element.status == 'Completed'){
                vm.type3.push(element);
            }
        }, this);
                console.log(info);
    });
}





=======
    
    var orderdetails = $resource('/api/orderdetails');
        orderdetails.query(function(info){
      vm.type=info;
      console.log(info);
   });


   
}

>>>>>>> origin/kajal_16feb

(function () {
  'use strict';

  angular
  .module('myra')
  .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'loginController',
      controllerAs: 'vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'register/userlist.html',
      controller: 'registerController',
      controllerAs: 'vm'
    })
     .state('adduser', {
      url: '/adduser',
      templateUrl: 'register/adduser.html',
      controller: 'registerController',
      controllerAs: 'vm'
    })
    .state('order', {
      url: '/order',
      templateUrl: 'orderdetails/orderdetails.html',
      controller: 'orderController',
      controllerAs: 'vm'
    })
    .state('addorder', {
      url: '/addorder',
      templateUrl: 'orderdetails/addorder/addorder.html',
      controller: 'addorderController',
      controllerAs: 'vm'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'logout/logout.html',
      controller: 'logoutController',
      controllerAs: 'vm'
    })
    .state('customerdetails', {
      url: '/customerdetails',
      templateUrl: 'customerdetails/customerdetails.html',
      controller: 'customerdetailsController',
      controllerAs: 'vm'
    })
    .state('newCustomer', {
      url: '/newcustomer',
      templateUrl: 'newCustomer/newCustomer.html',
      controller: 'newCustomerController',
      controllerAs: 'vm'
    })
    .state('reset-password', {
      url: '/resetpassword',
      templateUrl: 'reset-password/resetpassword.html',
      controller: 'resetpasswordController',
      controllerAs: 'vm'
    })
    .state('forgot-password', {
      url: '/forgotpassword',
      templateUrl: 'forgot-password/forgotpassword.html',
      controller: 'forgotpasswordController',
      controllerAs: 'vm'
    })
    .state('clothtype', {
      url: '/clothtype',
      templateUrl: 'clothtype/clothtype.html',
      controller: 'clothtypeController',
      controllerAs: 'vm'
    })
    .state('addclothtype', {
      url: '/addclothtype',
      templateUrl: 'clothtype/addnew/addnewcloth.html',
      controller: 'newclothController',
      controllerAs: 'vm'
    })
    .state('editclothtype', {
      url: '/editclothtype/:data',
      templateUrl: 'clothtype/edit/editcloth.html',
      controller: 'editclothController',
      controllerAs: 'vm'
    })
    .state('materialtype', {
      url: '/materialtype',
      templateUrl: 'materialtype/material.html',
      controller: 'materialtypeController',
      controllerAs: 'vm'
    })
    .state('addmaterialtype', {
      url: '/addmaterialtype',
      templateUrl: 'materialtype/addmaterial/add.html',
      controller: 'addController',
      controllerAs: 'vm'
    })
     .state('editmaterialtype', {
      url: '/editmaterialtype',
      templateUrl: 'materialtype/editmaterial/edit.html',
      controller: 'editController',
      controllerAs: 'vm'
    })
    .state('edit', {
    url: '/edit',
    templateUrl: 'customerdetails/edit/edit.html',
    controller: 'editController',
    controllerAs: 'vm',
    params: {
      'referer': null
            }
    })
    .state('home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: 'homeController',
      controllerAs: 'vm'
    })
    .state('alert', {
      url: '/alert',
      templateUrl: 'alert/alert.html',
      controller: 'alertController',
      controllerAs: 'vm'
    })
  }
})();

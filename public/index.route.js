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
     .state('details', {
      url: '/details',
      templateUrl: 'summary/details/details.html',
      controller: 'detailsController',
      controllerAs: 'vm',
        params: {
      'referer': null
            }
    })
     .state('summary', {
      url: '/summary',
      templateUrl: 'summary/summary.html',
      controller: 'summaryController',
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
    .state('addordernew', {
      url: '/addordernew',
      templateUrl: 'orderdetails/addordernew/addordernew.html',
      controller: 'addordernewController',
      controllerAs: 'vm'
    })
    .state('editorder', {
      url: '/editorder',
      templateUrl: 'orderdetails/editorder/editorder.html',
      controller: 'editorderController',
      controllerAs: 'vm',
       params: {
      'referer': null
            }
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
     .state('edit', {
    url: '/edit',
    templateUrl: 'customerdetails/edit/edit.html',
    controller: 'editcustomerController',
    controllerAs: 'vm',
    params: {
      'referer': null
            }
    })
    .state('reset-password', {
      url: '/resetpassword',
      templateUrl: 'reset-password/resetpassword.html',
      controller: 'resetpasswordController',
       controllerAs: 'vm',
       params: {
      'referer': null
            }
      
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
   .state('password', {
      url: '/password/:data',
      templateUrl: 'password/password.html',
      controller: 'passwordController',
      controllerAs: 'vm',
    })
    .state('addclothtype', {
      url: '/addclothtype',
      templateUrl: 'clothtype/addnew/addnewcloth.html',
      controller: 'newclothController',
      controllerAs: 'vm'
    })
    .state('editclothtype', {
      url: '/editclothtype',
      templateUrl: 'clothtype/edit/editcloth.html',
      controller: 'editclothController',
      controllerAs: 'vm',
       params: {
      'referer': null
            }
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
      controller: 'editmaterialController',
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
    .state('addProduct', {
      url: '/addProduct',
      templateUrl: 'addProduct/addProduct.html',
      controller: 'addProductController',
      controllerAs: 'vm'
     })
  }
})();

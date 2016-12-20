angular.module('myra')
  .controller('logoutController', logoutController);

logoutController.$inject = ['$resource'];

function logoutController($resource) {
  localStorage.removeItem('token');
  window.location = '#/login';
}
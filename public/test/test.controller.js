angular.module('myra')
  .controller('testController', testController);

testController.$inject = [];

function testController() {
  var vm = this;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
    window.location = '#/login';
  }
   vm.addtable = [{}];
   vm.addcol=[{}];

   vm.add=add;
   function add(){
     vm.addtable.push([{}]);
   }

   vm.addc=addc;
   function addc(){
     vm.addcol.push([{}]);
   }

  }
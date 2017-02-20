angular.module('myra')
  .controller('testController', testController);

testController.$inject = [];

function testController() {
  var vm = this;
  vm.token = JSON.parse(localStorage.getItem('token'));
  if (!vm.token) {
    window.location = '#/login';
  }
  vm.addtable = [{}];
  vm.addcol = [{}];

  vm.add = add;
  function add() {
    alert(vm.addtable.length + '-' + vm.addcol.length);
    vm.addtable.push({});
  }

  vm.addc = addc;
  function addc() {
    vm.addcol.push({});
  }

  vm.addpair = [];
  vm.pair = pair;
  function pair() {
    vm.addpair.push([]);
  }

  vm.remove=remove;
  function remove(cbox){
    console.log(vm.cbox);
   for(var i=0;i<cbox.length;i++){
          if(cbox[i].selected==true)
          {
            cbox.splice(1);
          }
    }
  }

}
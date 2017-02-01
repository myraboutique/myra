angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource','$state'];

function addProductController($resource,$state) {
  var vm = this;
  
  var measurement = $resource('/api/measurement');
  measurement.query(function(info){
    vm.product = info;

  });

var addmaterial = $resource('/api/addmaterial')
  addmaterial.query(function(info){
      console.log(info)
      vm.product1 = info ;
        
   });

//    vm.pass=function(){
//        alert('sdfgdsfg');
//    }
    }


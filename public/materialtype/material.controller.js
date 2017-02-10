angular.module('myra')
  .controller('materialtypeController', materialtypeController);

materialtypeController.$inject = ['$resource','$state'];

function materialtypeController($resource,$state) {

  var vm = this;
  vm.materialdata = [] ;
   vm.editpage = editpage;
   vm.order = order;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
   
    window.location = '#/login';
    
  }
vm.predicate = '';
  vm.reverse = true;
  function order(predicate) {
    vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
    vm.predicate = predicate;
  };
  
   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);

      if(localStorage.getItem('editmaterial')){
       localStorage.removeItem('editmaterial');
       localStorage.setItem('editmaterial',vm.selectData);
     }
     else{
            localStorage.setItem('editmaterial',vm.selectData);       
     }
     $state.go("editmaterialtype",{ 'referer': vm.selectData});
   
   }
 
  var addmaterial = $resource('/api/addmaterial')
  addmaterial.query(function(info){
      vm.materialdata = info ;
   })
}

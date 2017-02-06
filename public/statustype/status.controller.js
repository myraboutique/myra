angular.module('myra')
  .controller('statusController', statusController);

   statusController.$inject = ['$resource','$state'];

function statusController($resource,$state) {

  var vm = this;
  vm.statusdata = [] ;
   vm.editpage = editpage;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
   
    window.location = '#/login';
    
  }

   function editpage(x)
   {
     vm.selectData = JSON.stringify(x);
     $state.go("editstatustype",{ 'referer': vm.selectData});
   
   }

   vm.predicate = '';
  vm.reverse = true;
  function order(predicate) {
    vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
    vm.predicate = predicate;
  };
 
  var addstatus = $resource('/api/addstatuses')
  addstatus.query(function(info){
    console.log(info);
     
      vm.statusdata = info ;
        
   })

}

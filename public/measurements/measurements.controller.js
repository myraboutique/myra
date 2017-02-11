angular.module('myra')
  .controller('measurementsController', measurementsController);

measurementsController.$inject = ['$resource','$state'];

function measurementsController($resource,$state) {

  var vm = this;
  vm.measurements = [] ;
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

      if(localStorage.getItem('editmeasurements')){
       localStorage.removeItem('editmeasurements');
       localStorage.setItem('editmeasurements',vm.selectData);
     }
     else{
            localStorage.setItem('editmeasurements',vm.selectData);       
     }
     $state.go("editmeasurements",{ 'referer': vm.selectData});
   
   }
 
  var addmaterial = $resource('/api/managemeasurements')
  addmaterial.query(function(info){
    console.log(info);
     
      vm.measurements = info ;
        
   })

}

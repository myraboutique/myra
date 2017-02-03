angular.module('myra')
  .controller('materialtypeController', materialtypeController);

materialtypeController.$inject = ['$resource','$state'];

function materialtypeController($resource,$state) {

  var vm = this;
  vm.materialdata = [] ;
   vm.editpage = editpage;
   vm.token = JSON.parse(localStorage.getItem('token'));
  if(!vm.token){
   
    window.location = '#/login';
    
  }

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
    console.log(info);
     
      vm.materialdata = info ;
        
   })

}

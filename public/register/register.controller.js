angular.module('myra')
  .controller('registerController', registerController)
   .directive('myDirective', function() {
     function link(scope, elem, attrs, ngModel) {
          ngModel.$parsers.push(function(viewValue) {
            var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/;            
            if (viewValue.match(reg)) {
              return viewValue;
            }
            var transformedValue = ngModel.$modelValue;
            ngModel.$setViewValue(transformedValue);
            ngModel.$render();
            return transformedValue;
          });
      }
      return {
          restrict: 'A',
          require: 'ngModel',
          link: link
      };      
  });

registerController.$inject = ['$resource','$state'];

function registerController($resource,$state) {
  var vm = this;
  vm.order = order;
  vm.check = false;
  vm.flag= false;
  vm.editpage = editpage;
  
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
  
 var vm = this;
  vm.submit = submit;
  vm.update = update;
  vm.data = [];
  // vm.data = JSON.parse($stateParams.referer);
  vm.confirm = confirm;
  vm.resetPassword = resetPassword;
  var Register = $resource('/api/register');
  
  vm.filters = {
    search: 'username'
  
  };

  Register.query(function(info){
    vm.user = info;
  })

  function confirm(){
    if(vm.password && vm.password1){
    if(vm.password1 == vm.password){
      vm.check = false;
    } else {
      vm.check = true;
    
    }
    }
  }

  function resetPassword(data){
     vm.selectData = JSON.stringify(data);
        $state.go("reset-password", { 'referer': vm.selectData });
  }
vm.active = true;
  function submit(userform){
    vm.formSubmitted = true;
    if(!vm.check && userform){
    var register = new Register()
    
       var i, c, txt = "";
       var x = vm.name;
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i ==0) {
                c = c.toUpperCase();
            }
            txt += c;
       }
      
   
    register.name = txt;
    register.email = vm.email;
    register.username = vm.username;
    register.type = vm.type;
    register.password = vm.password;
    register.number = vm.number;
    register.address = vm.address;
    register.isActive = vm.active;
    
    register.$save(function(info){
      // console.log(info.status);
      // console.log(info);
      // if(info.status){
      //   swal(info.status);
      // } else {
      // swal("Your record has been saved successfully.");
      //    window.location = '#/register';
      //}
       if (!info.status) {
          swal("Your record has been saved successfully.");
          window.location = '#/register';
        }
        else {
          vm.flag = true;
          vm.status = info.status;
        }
      
     
    });
  }
  }

 function editpage(x)
   {
     vm.selectData = JSON.stringify(x);

      if(localStorage.getItem('edituser')){
       localStorage.removeItem('edituser');
       localStorage.setItem('edituser',vm.selectData);
     }
     else{
            localStorage.setItem('edituser',vm.selectData);       
     }
     $state.go("edituser",{ 'referer': vm.selectData});
   
   }
 

 function update(userform){
   vm.formSubmitted = true;

   if(userform.$valid){
     $http.put('api/register', vm.data)
      .then(
              function(response){
                console.log(swal("Your record has been saved successfully."))
                window.location = '#/register';
              },
              function(response){
                  console.log("put unsuccessfull")
              }
          );

   }


 }


}
angular.module('myra')
  .controller('addProductController', addProductController);

addProductController.$inject = ['$resource', '$state', '$http' ,'Upload','$window'];

function addProductController($resource, $state, $http, Upload, $window) {
  var vm = this;

//============DON'T DELETE=========//
// vm.orderDetails =[{ xyz: []}];
//  vm.getVal = function(j, i){
//     var key = vm.customermeasurementname.indexOf(vm.measu[vm.newinex][j]);
//     var val = vm.customermeasurementvalue[key];
//     vm.orderDetails = vm.orderDetails || [{ xyz: []}];
//     if(!orderDetails[i]){
//       orderDetails[i] = {xyz:[]};
//     }
//     vm.orderDetails[i].xyz[j] = val;
//     return val;
//  };
//=================================//

  vm.clicked = function (info) {
    vm.order[vm.newinex].type2 = info;
  };

  vm.inexforprompt = function (index) {
    console.log(index);
    vm.indexforpromptbox = index;
  };

  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  vm.orderdate1 = myDate.getDate() + '/' + month + '/' + myDate.getFullYear();
  vm.uniqeno = myDate.getTime();

  vm.items = [{}];
  vm.order = [];
  vm.orderDetails = [];
  vm.measu = [];
  vm.tempimg =[];
  vm.hidepairbutton = [];
  vm.pairs = [];

  vm.designSelect = designSelect;
  vm.submit = submit;
  vm.final = final;
  vm.selectCustomer = selectCustomer;

  var measurement = $resource('/api/measurement');
  var addsubdesigns = $resource('/api/addsubdesign');
  var addmaterial = $resource('/api/addmaterial');
  var customerdetails = $resource('/api/customerdetails');
  var Orderdetails = $resource('/api/orderdetails');

  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  }
  
  Orderdetails.query(function (info) {
    vm.temp = info[info.length -1].timestamp;
    vm.pid1 = Number(vm.temp) + 1;
    vm.pid = pad(vm.pid1,5);
  });

  measurement.query(function (info) {
    vm.type = info;
  });

  addmaterial.query(function (info) {
    vm.material = info;
  });

  customerdetails.query(function (info) {
    vm.customer = info;
  });

  function selectCustomer(info) {
    vm.seleCust = info;
    vm.customermeasurementname = JSON.parse(info.measurementsname);
    vm.customermeasurementvalue = JSON.parse(info.measurementsvalue);

    if (localStorage.getItem('addProductscustomer')) {
     localStorage.removeItem('addProductscustomer');
     localStorage.setItem('addProductscustomer', JSON.stringify(info));
   }
   else {
     localStorage.setItem('addProductscustomer', JSON.stringify(info));
   }
  }

  function designSelect(info, index) {
    
    vm.newinex = index;
    vm.order[vm.newinex].type2 = '';

    addsubdesigns.query(function (subdesigns) {
      vm.subdesign = [];
      vm.subdesignimage = [];
      subdesigns.forEach(function (e) {
        if (e.design.trim() == info.title) {
          vm.subdesignimage.push(e.subdesignimage);
          vm.subdesign.push(e.subdesign);
        }
      });
    });

    vm.type.forEach(function (element) {
      if (element.title == info.title && element.isActive) {
        vm.measure = element.measurement;
        vm.measu[vm.newinex] = vm.measure.split(',');
      }
    }, this);

    var xyz = [];
    
    for (var j = 0; j < vm.measu[vm.newinex].length; j++) {
        var key = vm.customermeasurementname.indexOf(vm.measu[vm.newinex][j]);
        var val = vm.customermeasurementvalue[key];
        xyz.splice(key, 0, val);
    }
    if(vm.orderDetails[index]){
      vm.orderDetails[index] = xyz;
    }
    else{
      vm.orderDetails.push(xyz);
    }
  };

  function submit() {
    vm.items.push({});
  }

  vm.submit2 = function(info) {
    vm.items.push({});
    vm.hidepairbutton[info] = true;
    vm.hidepairbutton[info + 1] = true;
    vm.pairs[info] = vm.uniqeno + info;
    vm.pairs[info+1] = vm.uniqeno + info;
  }


 function beforefinal() {
    vm.designs = [];
    vm.infobuffer.forEach(function (element) {
      vm.designs.push(element.type.title + " (" + element.type2 + ")");
    }, this);

    if (localStorage.getItem('vmorder')) {
      localStorage.removeItem('vmorder');
      localStorage.setItem('vmorder', JSON.stringify(vm.designs));
    }
    else {
      localStorage.setItem('vmorder', JSON.stringify(vm.designs));
    }

    for (var index = 0; index < vm.infobuffer.length; index++) {
      vm.infobuffer[index].timestamp = vm.pid;
      vm.infobuffer[index].customerid = vm.seleCust.id;
      vm.infobuffer[index].customerName = vm.seleCust.customerName;
      vm.infobuffer[index].pair = vm.pairs[index];
      vm.infobuffer[index].measure = vm.orderDetails[index];
      console.log(vm.tempimg);
      vm.infobuffer[index].bimage = vm.tempimg[index];
      
      if (localStorage.getItem('vmorder' + index)) {
        localStorage.removeItem('vmorder' + index);
        localStorage.setItem('vmorder' + index, JSON.stringify(vm.infobuffer[index]));
      }
      else {
        localStorage.setItem('vmorder' + index, JSON.stringify(vm.infobuffer[index]));
      }
    }

    window.location = '#/addordernew';
 }


  function final(info) {
    vm.infobuffer = info;
    vm.fileup();
  }


  
  //file uploa ==========================================
   vm.fileup = function(){ //function to call on form submit
     for(var i=0;i<vm.order.length;i++){
       if (vm.order[i].image) { //check if from is valid
            vm.upload(vm.order[i].image); //call upload function
        }   
     }
    };
    
    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success       
      //           addsubdesigns.$save(function (info) {
      //   if (!info.status) {
      //     swal("Your record has been saved successfully.");
      //     window.location = '#/subdesign';
      //   }
      //   else {
      //     vm.flag = true;
      //     vm.status = info.status;
      //   }
      // });
            } 
        }, function (resp) { //catch error
            // console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            // console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });

        beforefinal();

    };
//file uploa ==========================================

}



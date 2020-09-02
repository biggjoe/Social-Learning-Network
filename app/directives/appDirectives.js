var zapp = angular.module('app.directives', [])

zapp.directive('loadHolder', function () {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/load-holder.html`,
scope:{layers:'=',toshow:'=',tohide:'='},
controller:function($scope,$rootScope){
$scope.isLoaded = false;
$rootScope.$watch('isLoaded',(value)=>{
$scope.isLoaded = value;
});
//
$scope.$watch('toshow',(value)=>{
$scope.isToShow = (value !== undefined) ? value:null;
});
$scope.$watch('tohide',(value)=>{
$scope.isToHide = (value !== undefined) ? value:null;
});
}
};
});


zapp.directive('stickyHeader', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="sticky border-bottom bg-white">
<div class="py10 px10 z-higher" layout="row" layout-align="start center">
<a ng-if="canGoBack == true" class="stik-back-btn" ng-click="goBack()"> <i class="fas fa-arrow-left"></i> </a>
<span class="bolder" flex><i class="fas {{page_icon}}"></i>&nbsp; {{page_title}}</span>

<span>
<button ng-click="toggAdd()" 
class="{{start_add_article ? 'md-warn':'md-primary'}} md-raised px15 mx0 my0 md-button md-ink-ripple">
<i class="fas {{start_add_article ? 'fa-chevron-up':'fa-edit'}}"></i>&nbsp; 
{{start_add_article ? 'CLOSE':'ASK QUESTION'}}</button>
</span>
</div><!--sticky-header-->
<div class="article_pad down_slider border-top" ng-show="start_add_article">
{{q | json}}
<textarea class="form-control px10 py10" rows="2" ng-model="q.question"></textarea>
<div class="py5" layout="row" layout-align="start center">
<span flex>
<select class="form-control input-sm" ng-model="q.department_id">
<option ng-repeat="itd in department_list"ng-value="itd.id">{{itd.name}}</option>
</select>
</span>
<span ng-show="is_fetched">
<button ng-click="askQ(q)" 
class="md-primary md-raised px15 mx0 my0 md-button">
<i class="fas fa-save"></i>&nbsp; SEND QUESTION</button>
</span>
</div>
</div>
</div><!--sticky-header-->`,
scope:{title:'@', icon:'@', goback:'=',},
controller:['$scope','toast', function($scope,toast){
  var app_url = 'modules/feed/feedApp.php';
$scope.page_icon = ($scope.icon) ? $scope.icon : 'fa-list';
$scope.page_title = ($scope.title) ? $scope.title : '-';
$scope.canGoBack = ($scope.goback) ? $scope.goback : false;
$scope.start_add_article = false;
$scope.toggAdd = function(){
$scope.start_add_article = !$scope.start_add_article;
if($scope.department_list.length == 0){$scope.fetch_departments();}
}

$scope.department_list = [];
$scope.is_fetching = $scope.is_fetched = false;
$scope.fetch_departments = function(){
$scope.is_fetching = true;
$scope.is_fetched = false;
$http.post(app_url,{action:'list_departments'}).then(function(res){
console.log(res)
$scope.is_fetching = false;
if(res.data.departments.length > 0){$scope.is_fetched = true;}
$scope.department_list = res.data.departments;
});
}//fetch_departments



$scope.askQ = function(data){
  data.action = 'saveQuestion';
console.log(data);
$scope.isLoading = true;
$http.post(app_url,data).then(function(res){
console.log(res);
var rs = res.data;
rs.message = `<div class="`+rs.class+`">`+rs.mess+`</div>`;
$scope.isLoading = false;
toast.show({title:'Info',message:rs.message})
})
}//saveQuestion

$scope.goBack = function() {
  window.history.back();
}
}]//controller
};

}]);//askPanel


zapp.directive('showPayment', function () {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/payment-details.html`,
scope:{modaldata:'=',icon:'@',sticky:'='},
controller:function($scope,$http,modal,toast,$rootScope){
$scope.isLoaded = false;
console.log($scope.modaldata)
$scope.$watch('modaldata',(value)=>{
$scope.vinItem = value
});//watch
$scope.doTranx = function(data){
data.page = 'modules/admin/adminApp.php';
console.log(data);
$scope.modaldata.isLoading = true;
$http.post(data.page,data).then(function(res){
console.log(res);
var rs = res.data;
rs.message = `<div class="`+rs.class+`">`+rs.mess+`</div>`;
$scope.modaldata.isLoading = false;
modal.close();
toast.show({title:'Notification',message:rs.message})
})
}

}//controller
};
});




zapp.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "^?ngModel",
    link: function(scope, element, attrs, ngModel) {
      if (ngModel !== null) {
      function read() {
        ngModel.$setViewValue(element.html());
      }
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };
      element.bind("blur keyup change", function() {
        scope.$apply(read);
});
}
}
};

});


zapp.directive('contenteditableFirst', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model
      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };
      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
     read(); // initialize
      // Write data to the model
      function read() {
       var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {html = '';}
        ngModel.$setViewValue(html);
           }
    }
  };
}])


zapp.directive('startPayBtn', function () {
    return {
      restrict: 'EMA',
      template: `<button ng-if="isLoaded" 
      ng-disabled="modalItem.isLoading" class="btn  {{btclass}}"
      ng-click="doPayNow()"><i class="fas {{bticon}}"></i>&nbsp;
      <span ng-bind-html="bttext"></span></button>`,
      scope: {
        cdata : '=', 
        btnclass : '@' 
      },
controllerAs:'vm',
controller: function ($scope, $rootScope, $http, $window, $mdDialog, 
 modal, doPay, $timeout, $mdDialog) {
var self = this;
console.log($scope)
//$scope.cdata.action = ($scope.cdata!==undefined) ? 'payDetails':null;
$scope.modalItem = 
{isLoading:false, isPaying:false,
  callback:'payCallback'};
$rootScope.$watch('userData.isLoaded',function(value){
$scope.isLoaded = value;
var item = $scope.cdata;
$scope.canJoin = false;
$scope.btnText = ($scope.label === '' || !$scope.label) ?  ' JOIN ':$scope.label;
$scope.canJoin = true;
$scope.btclass = 'btn-primary md-raised btn-md';
$scope.bticon = ' fa-shopping-cart ';
$scope.bttext = 'PAY NOW';  
;
  
});//watch


$scope.doPayNow = function(){
$scope.modalItem.isLoading = true;
$scope.bticon = ' fa-spin fa-circle-notch ';  
var actNow = ($scope.canJoin) ? showModal() : nullModal()
};


$scope.closeThisDialog = ()=>{modal.close();}
var nullModal = function(){
$scope.modalItem.isLoading = true;
alert('Already Joined!');
$scope.bticon = 'fa-exclamation-triangle status-cancelled';  
}
var showModal = function () {
$http.post('modules/payApp.php',
  {action:'payDetails',cart_data:$scope.cdata})
.then(function(res){
  console.log(res)
$scope.modalItem.isLoading = false;
$scope.modalItem.isPaying = false;
$scope.modalItem.page_title = 'VIN Report Purchase';
$scope.bticon = ' fa-shopping-cart ';
var old = $scope.modalItem, newer = res.data;
var iLoad = {...old,...newer};
$scope.modalItem = iLoad;
modal.show({
data:iLoad,
page:'templates/dialogs/start_payment.html',
},$scope);//$mdDialog.show
});//$http
}//showModal
$scope.is_sent = false;
$scope.did_well = false;

$scope.payCallback = function(response){
  console.log('payCallback::::: res:: ',response,  'Scope:: ', $scope)
doPay.setScope('modalItem',
    {message:'Processing Payment...',
    isLoading:true,isPaying:true},$scope);
doPay.verifyDirectPaystack(response.trxref).then(function(res) {
  console.log(res)
doPay.setScope('modalItem',
    {message:res.message,isLoading:false},$scope);
if(res.status == '1'){
doPay.fundWallet(response.trxref).then(function(res2){
console.log('activate_subscription :: ',res2);
doPay.setScope('modalItem',{message:res2.message,isLoading:false},$scope);
var tx = {status:res2.status,reference:res2.reference};
doPay.markTranx(tx).then(function(trx) {
  console.log(trx)
});
}, function(){
doPay.setScope('modalItem',{message:'Error Setting up subscription. Please Contact Admin.',isLoading:false},$scope);
 
});//creditWallet
}//status ==1 so save order
else{
doPay.setScope('modalItem',
  {message:res.message,isLoading:false},
  $scope);
}

}, function(error){
console.log(error);
doPay.setScope('modalItem',{message:'Payment Verifiation Error.<br> Please Requery this Payment Transaction',isLoading:false},$scope);
});//verifyPaystack

}//cardPayCallback

}//controller

}//return

});

zapp.directive('payBank',  [
            '$http', '$timeout',  'doPay',
function ($http, $timeout, doPay) {
return {
restrict: `EMA`,
template: `<a href class="btn btn-md {{payClass}}"
ng-click="startBank()"
ng-disabled="pbnk_data.isLoading || pbnk_data.isPaying">
<i class="fas fa-credit-card" ng-hide="pbnk_data.isLoading || modalItem.isPaying"></i> 
<i class="fas  faa-flash animated fa-circle" 
ng-if="pbnk_data.isLoading   || pbnk_data.isPaying"></i> &nbsp;BANK<span class="sm-hide"> DEPOSIT</span> </a>`,
replace: true,
scope: {
payload:'=',
btnclass: '@',
callback: '@',
text: '@'
},
controller: function ($scope, $rootScope, modal, doPay,cartApp) {
$scope.pbnk_data = {};
var par_scope = $scope.$parent.$parent;
$scope.payClass = ($scope.btnclass) ?  $scope.btnclass : ' btn-primary ';
var errorIcon = '<i class="fas fa-exclamation-triangle status-cancelled"></i>&nbsp; ';
var goodIcon = '<i class="fas fa-check-circle status-active"></i>&nbsp; ';
$scope.startPay = function(){
initPay();//allPay
}

$scope.startBank = function(){
$scope.payload.pay_mode = 'bank';
$scope.payload.pay_vendor = 'bank';
$scope.payload.callback = '...';
$scope.payload.date = new Date();
$scope.ld = $scope.payload;
modal.show({
data:$scope.payload,
page:'templates/dialogs/start_payment_bank.html',
},$scope)
}



$scope.isLoading = false;
$scope.submitPay = function(data){
data.action = 'submitPayment';
data.date = (new Date(data.date).getTime())/1000;
var iload = {...$scope.payload,...data} ;
console.log(iload);
$scope.isLoading = true;
$http.post('modules/payApp.php',iload).then(function(res){
$scope.isLoading = false;
var rs = res.data;
console.log(rs);
if(rs.uid > 0){
 $scope.imessage = `<div class="good px10 py10"> <i class="fas fa-check-circle status-active"></i> &nbsp;Your Payment notification has been received.
  You will be notified when it is approved</div>`;
  $scope.hideForm = true;
  cartApp.saveToDb();
}else{
 $scope.imessage = `<div class="error px10 py10"><i class="fas fa-exclamation-triangle status-cancelled"></i> &nbsp;Your Payment notification failed to be submitted at this time.
  Try again later</div>`;
    $scope.hideForm = false;
}  

});
}

  var togNeg = function(newArr,mode){
   for( var x = 0; x < newArr.length; x++){ 
   $scope[x] = mode; 
  }   
  }
$scope.showOpt = function(num){
  let skp = 'opted'+num;
  $scope.opted1 =   $scope.opted2 =   
  $scope.opted3 = false;
  var arr = [1,2,3];
  var newArr = '';
  for( var i = 0; i < arr.length; i++){ 
    if ( arr[i] === num) { 
      newArr = arr.splice(i, num); 
    }
  }

  console.log(newArr)
  if($scope[skp] == true){
    $scope[skp] = false;

  }else if($scope[skp] == false){
    $scope[skp] = true;
  };
  togNeg(newArr,false);
}


}//controller

}//return

}]);

/**/



zapp.directive('pressEnter', function () {

    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {

            if(event.which === 13 && !event.shiftKey) {

                scope.$apply(function (){

                    scope.$eval(attrs.pressEnter);

                });



                event.preventDefault();

            }

        });

    };

});


zapp.directive('sendStuff', ['run', function(run) {
    return {
        restrict: 'A',
        scope: {myAttribute: '='},
        template: '',
link: function (scope, element, attrs, ngModel) {
element.bind("click", function(event) {
var curClass = attrs.class;
var strx = attrs.class.split(' '); 
strx[2] = "btn-danger";
var newClass = attrs.class = strx.join(' ');
console.log(attrs.class);
//attrs.$set(iclass, '007');
//
//console.log(scope.$eval(attrs.actid))
element.css("border", "1px solid red");
var action_string = attrs.actid;
var acw = action_string.split('-'); 
var action_word = acw[1];
sendAct(acw[1],acw[0])
if(action_word ==='unfollow'){
var nvl = attrs.actid = acw[0]+'-follow';
var htmx = 'Unfollow';
}else if(action_word ==='follow'){
var nvl = attrs.actid = acw[0]+'-unfollow';
var htmx = 'Follow';
}
attrs.$set("actid", nvl);
attrs.$set("disabled", true);
element.html(htmx);
element.$addClass(newClass);
//element.$updateClass(newClass, curClass)
//element[0].attributes.class.nodeValue = newClass;
//element[0].attributes.actid.nodeValue = nvl;
return;
});
var sendAct = (action,data)=>{
console.log(action,data)
}

console.log()

attrs.$observe('sendState', function(value){
        if(value){
          console.log(value);

        }
      });


var obj = scope.$eval(attrs.sendState);
      //can also fallback as a string
      var string = scope.$eval(attrs.actid);
obj.uid = 1007;
      console.log(obj);
      console.log(string);

//  
}
}
}]);


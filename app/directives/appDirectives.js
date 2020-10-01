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

zapp.directive('homeAccounts', function () {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/home-accounts.html`
};
});


zapp.directive('itemAvatar', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<span class="profiler">
<span class="profile-{{size}}" style="background: url({{img}});"></span>
</span>`,
scope:{img:'=', size:'@'},
controller:['$scope', function($scope){
$scope.size = ($scope.size) ? $scope.size:'avatar';
}]//controller
}//return

}]);//itemHeader


zapp.directive('stickyHeader', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="sticky border-bottom bg-white plain-bg-pattern">
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
<div class="px10 py10" >


<textarea class="form-control asker-input" 
rows="1" ng-model="q.question" placeholder="Enter question here..."></textarea>

<div layout="row" class="bordered border-radius-4 mt10">
<md-input-container flex class="my0" 
ng-show="(q.question && q.question !=='') || q.department_id">
<md-select class="no-bottom-line" 
 ng-model="q.department_id" 
 ng-disabled="q.department_id && q.department_id != 0 && item.is_department_feed">
<md-option ng-value="0" ng-selected="q.department_id == 0">Select Department</md-option>
<md-option ng-repeat="itd in department_list" ng-value="itd.id">{{itd.name}}</md-option>
</md-select>
</md-input-container>
</div>

<div class="pt10" ng-show="q.department_id != 0 && q.question && q.question !==''" 
layout="row" layout-align="start center">
<span flex>
<button ng-click="askQ(q)" 
class="md-primary md-raised px15 mx0 my0 md-button">
<i class="fas fa-save"></i>&nbsp; SEND QUESTION</button>
</span>

<span>
<label>
<input type="checkbox"
 ng-true-value="0" ng-false-value="1" ng-model="q.is_public">&nbsp;
Make Private</label>
</span>

</div>
</div>

</div>

<!--department-details-->
<div class="border-top pxy5" ng-if="item.is_department_feed">
<div class="pb0 article-meta txt-gray" layout="row" 
layout-align="start center">
<span flex>
  <button class="md-raised btn btn-clear px10"> 
  <i class="fas fa-edit"></i>&nbsp;<span class="bolder sm-hide">Topics&nbsp;</span>{{item.topics_num}}</button>

 <button ng-click="sItem('follow_topic')" 
  class=" md-raised btn btn-clear px10">
  <span class="bolder"><i class="fas fa-rss"></i>&nbsp;Follow </span>{{item.department_follows}} </button> 

</span>

<div class="">
<span><button 
  class="btn {{topic_details.answer_num ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-comment"></i> </button> {{topic_details.answer_num | number}}
</span>
<span><button 
  class="btn {{topic_details.total_shares ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-share-alt"></i> </button> {{topic_details.total_shares | number}}
</span>
</div>
</div>
</div><!--department-details-->

</div><!--sticky-header-->`,
scope:{title:'@', icon:'@', item:'=?bind', goback:'=',},
controller:['$scope','toast', function($scope,toast){
$scope.item = ( angular.isDefined($scope.item) ) ? $scope.item:{department_id:0};
$scope.q = {department_id:$scope.item.department_id,is_public:1};
var app_url = 'modules/feed/feedApp.php';
  var app_url2 = 'modules/general/generalApp.php';
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
$http.post(app_url2,{action:'list_user_departments'}).then(function(res){
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



zapp.directive('articleMeta', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<div class="pb10 article-meta txt-gray" layout="row" 
layout-align="start center">
<span flex>
<span ng-if="item.mode !== 'blog'">
<start-buy-btn ng-if="item.for_sale == 1" item="item" 
btn_class="md-primary md-button md-raised btn-outline-primary px20" 
label="Buy This"></start-buy-btn> {{item.total_sales}}
</span>
</span>
<span>
<div class="px10 txt-sm">
  <span><span ng-if="item.mode !== 'blog'"><button ng-disabled="item.files.length === 0"
  class="btn {{item.files.length > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-paperclip"></i><md-tooltip>Files</md-tooltip> </button> {{item.files.length}}</span> &nbsp;</span>
  <span><button ng-click="sItem('rate_article')" ng-disabled="item.rated"
  class="btn {{item.total_ratings > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-star"></i> <md-tooltip>Rating</md-tooltip></button>  {{item.total_ratings}}</span> &nbsp;
  <span><button ng-click="sItem('save_article')" ng-disabled="item.saved" 
  class="btn {{item.total_saves > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-save"></i> <md-tooltip>Saves</md-tooltip></button> {{item.total_saves}}</span> &nbsp;
  <span><button ng-click="sItem('like_article')" ng-disabled="item.liked" 
  class="btn {{item.total_likes > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-heart"></i> <md-tooltip>Likes</md-tooltip></button> {{item.total_likes}}</span> &nbsp;
  
</div>
</span>

</div><!--meta-->

</div>`,
scope:{item:'='}
};

}]);//articleMeta




zapp.directive('departmentItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<md-list-item  class="md-1-line">
<span class="md-icon-avatar has-awesome"> <i class="fas fa-bank"></i> </span>
<div class="md-list-item-text" layout="column" flex>
<h3 style="margin: 0; line-height: 1.2;">{{item.name}}</h3>
</div>
<span class="md-secondary py10"> 
<department-follow-btn item="item"></department-follow-btn>
</span>
<md-divider></md-divider>
 </md-list-item>
</div>`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', '$filter', 
function($scope, $rootScope, $filter){
$scope.action_text = (angular.isDefined($scope.mode) && $scope.mode==='following') ? ' was followed ':
(angular.isDefined($scope.mode) && $scope.mode==='followers') ? ' follows ':'';
//console.log($scope.item)
$scope.isLoaded = false;

}]//controller
}
}]);//departmentItem






zapp.directive('followItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<md-list-item  class="md-1-line align-start">
<span class="md-avatar" style="background: url({{item.other_avatar}});"></span>
<div class="md-list-item-text pt15 pb10 my0">

<div style="margin: 0; line-height: 1.2;" class="">
<a class="bolder" href="{{item.other_url}}">{{item.other_name}}</a> {{action_text}}
</div>
<span class="txt-sm" flex> <i class="fa fa-clock"></i>&nbsp;{{item.fdate*1000 |  getTime}}</span>
</div>
<span class="md-secondary"> 
<user-follow-btn item="item"></user-follow-btn>
</span>
<md-divider></md-divider>
 </md-list-item>
</div>`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', 'toast', 
function($scope, $rootScope, toast){
$scope.action_text = (angular.isDefined($scope.mode) && $scope.mode==='following') ? ' was followed ':
(angular.isDefined($scope.mode) && $scope.mode==='followers') ? ' follows ':'';

}]//controller
}
}]);//followItem



zapp.directive('userFollowBtn', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<button ng-click="sItem(item.is_followed)" 
class="txt-sm {{item.is_followed ? 'btn-danger':'btn-primary'}} btn-raised btn-sm uppercase btn py7 px10 mx0 my0 btn">
<i class="fas {{item.icon}}"></i>&nbsp; 
{{item.is_followed ? 'Unfollow':'Follow'}}</button>
`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', 'toast', 
function($scope, $rootScope, toast){
$rootScope.$watch('userData.isLogged', function(value){
$scope.item.is_logged = value;
})
$scope.item.is_loading = false;
$scope.item.icon = ($scope.item.is_followed==true) ? 'fa-user-minus':
($scope.item.is_followed==false) ? 'fa-rss':'';
var cur_icon = $scope.item.icon;
$scope.isLoaded = false;
var app_url = 'modules/feed/feedApp.php';
$scope.sItem = (type) => {
if($scope.item.is_logged == false){return;}
if(type===false){
$scope.item.action = 'save_follow_user';
}else if(type===true){
$scope.item.action = 'save_unfollow_user';
}
$scope.item.is_loading = true;
$scope.item.icon = 'fa-spin fa-circle-notch';
$http.post(app_url,$scope.item).then((res)=>{
$scope.item.is_loading = false;
console.log(res);
let rs = res.data;
if(type === false && rs.status == '1' && rs['mode']=='follow'){
$scope.item.is_followed = true;
$scope.item.icon = 'fa-user-minus';
}else if(type === true && rs.status == '1' && rs['mode']=='unfollow'){
$scope.item.is_followed = false;
$scope.item.icon = 'fa-rss';
}else if(rs.status == '100'){
$scope.item.icon = cur_icon; 
toast.show({title:'Error',message:'You cannot follow yourself'}) 
}
},function(error){
$scope.item.is_loading = false;  
});
}//saveCommAns


}]//controller
}
}]);//userfollowBtn


zapp.directive('departmentFollowBtn', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<button ng-click="sItem(item.is_followed)" ng-show="item.can_follow"
class="txt-sm {{item.is_followed ? 'btn-danger':'btn-primary'}} btn-raised btn-sm uppercase btn py7 px10 mx0 my0 btn">
<i class="fas {{item.icon}}"></i>&nbsp; 
{{item.is_followed ? 'Unfollow':'Follow'}}</button>
`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', 'toast', 
function($scope, $rootScope, toast){
$scope.item.can_follow = (angular.isDefined($scope.item.is_followed)) ? true:false;

$scope.item.is_loading = false;
$scope.item.icon = ($scope.item.is_followed==true) ? 'fa-user-minus':
($scope.item.is_followed==false) ? 'fa-rss':'';
var cur_icon = $scope.item.icon;
$scope.isLoaded = false;
var app_url = 'modules/feed/feedApp.php';
$scope.sItem = (type) => {
//console.log(type)
let ivotes = ["upvote","downvote"];
if(type===false){
$scope.item.action = 'save_follow_department';
}
if(type===true){
$scope.item.action = 'save_unfollow_department';
}
console.log($scope.item);
$scope.item.is_loading = true;
$scope.item.icon = 'fa-spin fa-circle-notch';
$http.post(app_url,$scope.item).then((res)=>{
$scope.item.is_loading = false;
console.log(res);
let rs = res.data;
if(type === false && rs.status == '1' && rs['mode']=='follow'){
$scope.item.is_followed = true;
$scope.item.icon = 'fa-user-minus';
}else if(type === true && rs.status == '1' && rs['mode']=='unfollow'){
$scope.item.is_followed = false;
$scope.item.icon = 'fa-rss';
}else if(rs.status == '100'){
$scope.item.icon = cur_icon; 
toast.show({title:'Error',message:'You cannot follow yourself'}) 
}
},function(error){
$scope.item.is_loading = false;  
});
}//saveCommAns


}]//controller
}
}]);//departmentfollowBtn



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



zapp.directive('startBuyBtn', function () {
    return {
      restrict: 'EMA',
      template: `<button ng-if="isLoaded" 
      ng-disabled="modalItem.isLoading" class="{{btnClass}}"
      ng-click="doPayNow()"><i class="fas {{bticon}}"></i>&nbsp;
      <span ng-bind-html="btnText"></span></button>`,
      scope: {
        item : '=', 
        btn_class : '@',
        icon : '@',
        label : '@' 
      },
controllerAs:'vm',
controller: function ($scope, $rootScope, $http, $window, $mdDialog, 
 modal, doPay, $timeout, $mdDialog) {
var self = this;
$scope.btnClass = 
( angular.isDefined($scope.btn_class) && $scope.btn_class !=='') 
? $scope.btn_class : `md-warn md-raised px20 mx0 my0 py10 md-button`;
$scope.modalItem = 
{isLoading:false, isPaying:false,
  callback:'payCallback'};
$rootScope.$watch('isFetched',function(value){
if(value === true){
$scope.isLoaded = true;
$scope.canBuy = ($scope.item.has_bought) ? false:true;
$scope.btnText = ($scope.label === '' || !$scope.label) ?  ' BUY ':$scope.label;
$scope.canJoin = true;
$scope.bticon = ($scope.icon === '' && $scope.icon !='') ?  $scope.icon: ' fa-shopping-cart ';

;
}  
});//watch


$scope.doPayNow = function(){
$scope.modalItem.isLoading = true;
$scope.bticon = ' fa-spin fa-circle-notch ';  
var actNow = ($scope.canBuy) ? showModal() : nullModal()
};


$scope.closeThisDialog = ()=>{modal.close();}
var nullModal = function(){
$scope.modalItem.isLoading = true;
alert('Already Bought!');
$scope.bticon = 'fa-exclamation-triangle status-cancelled';  
}
var showModal = function () {
$scope.item.transactionName = $scope.modalItem.transactionName = 'Article Purchase ['+$scope.item.title+']';
$scope.modalItem.article_id = $scope.item.aid;
let paramx = {action:'getPayDetails',
article_data:{
  article_id:$scope.item.aid,
  price:$scope.item.price,
  transactionName: $scope.item.transactionName,
  title:$scope.item.title
}
};

$http.post('modules/payment/paymentApp.php',paramx).then(function(res){
  console.log(res)
$scope.modalItem.isLoading = false;
$scope.modalItem.isPaying = false;
$scope.modalItem.page_title = 'Article Purchase';
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




$scope.onCloseCallback = function(reference){
dopay.nullifyPay(reference).then(function(reks){
  console.log(reks)
});//nulifyPay
}//onCloseCallBack

}//controller

}//return

});

zapp.directive('payBank',  [
            '$http', '$timeout',  'doPay',
function ($http, $timeout, doPay) {
return {
restrict: `EMA`,
template: `<a href class="text-center {{payClass}}"
ng-click="startBank()"
ng-disabled="pbnk_data.isLoading || pbnk_data.isPaying">
<i class="fas fa-bank" ng-hide="pbnk_data.isLoading || modalItem.isPaying"></i> 
<i class="fas  faa-flash animated fa-circle" 
ng-if="pbnk_data.isLoading   || pbnk_data.isPaying"></i> &nbsp;BANK<span class="sm-hide">&nbsp;DEPOSIT</span> </a>`,
replace: true,
scope: {
payload:'=',
btn_class: '@',
callback: '@',
text: '@'
},
controller: function ($scope, $rootScope, modal, doPay,cartApp) {
console.log($scope)
$scope.pbnk_data = {};
var par_scope = $scope.$parent.$parent;
$scope.payClass = 
( angular.isDefined($scope.btn_class) && $scope.btn_class !=='') 
? $scope.btn_class : `md-primary md-raised px20 mx0 my0 py10 md-button`;

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

zapp.directive('fileMd', ['$parse', function ($parse) {

  return {

      restrict: 'A'

    , link: function (scope, element, attrs) {

    var model = $parse(attrs.fileMd);

    var modelSetter = model.assign;

    var onChangeFunc = scope.$eval(attrs.customOnChange);

    console.log(scope.isUploading);

    element.bind('change', function () {

      var files = [];

        angular.forEach(element[0].files,function(file){

               files.push(file);

               //console.log(file)

      })

      scope.$apply(function () {

          modelSetter(scope, files);

         onChangeFunc;

         scope.isUploading = false;

         

      

       });

      });

    }

  };

  }]);
zapp.directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);


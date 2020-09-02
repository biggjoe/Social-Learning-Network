var zapp = angular.module('admin.controller', [
'angular-loading-bar'
,'ui.router'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'admin.router'
,'app.services'
,'app.factories'
,'app.directives'
,'admin.directives'
,'app.filters'
,'ngWig'
,'general.controller'
]);
/*
,'ngWig'
,'duScroll'
,'widget.scrollbar'
,'paystack'
];
var expanded = [...[
'ui.router',
'account.router',
'general.controller'],...basic];
var zapp = angular.module('account.controller', expanded);
var mapp = angular.module('account.public', basic);
var options = {};

zapp.config(['ngWigToolbarProvider','$provide', function(ngWigToolbarProvider,$provide) {
ngWigToolbarProvider.addStandardButton('image', 'Insert Image', 'insertImage','fa-image' );
*/
var dt = {btn:{}}
dt.btn_text = 'btn_text';
dt.btn_icon = 'btn_icon';
dt.feed_end = 'false'; 
dt.feed_scope = '';
dt.feed_page = 'feed_page';
dt.feed_offset = 'feed_offset';
dt.feed_rows = 'feed_rows';
dt.loading = 'isLoading';
dt.action_name = 'action_name';

zapp.config(['ngWigToolbarProvider','$provide', function(ngWigToolbarProvider,$provide) {
ngWigToolbarProvider.addStandardButton('image', 'Insert Image', 'insertImage','fa-image' );

}]);
zapp.run([
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'cartApp',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  cartApp){

$rootScope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
console.log(toState,fromState)
});

$rootScope.perf_act = function(mode){
  console.log(mode)
}

$rootScope.module = 'admin';

$rootScope.jumpTo = function(url){
var ur  = '/account/'+url;
console.log(ur)
$window.location.assign(ur);
}

$rootScope.userData = {cartItems:[],isLoaded:false,notifs:0,messages:0};
run.getUserData('admin').then(function(res){

$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
//console.log('acc_controx ::: ',$rootScope.userData)
})


cartApp.getCart().then(function(res){
//console.log(res)
$rootScope.userData.cartItems = res;
},function(error){
  console.log(error)
})//cartApp.get

}]);//run



zapp.controller("dashboardCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}
var app_url = 'modules/admin/adminApp.php';
var glk = {
  scope:'dashboard',
  loading:'isFetching',
  loaded:'isFetched',
  url:app_url
}
run.getList(glk,$scope);  


}]);//dashboardCtrl

zapp.controller("checkoutCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'cartApp',
  'modal',
  'doBuy',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  cartApp,
  modal,
  doBuy,
  toast){
$scope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
cartApp.getCart().then(function(res){
$scope.cartItem = res;
sumPrice(res.selected);
checkCart();
},function(error){
  console.log(error)
})//cartApp.get
});

var app_url = 'modules/admin/adminApp.php';


$scope.cartItemPrice = 0;


var sumPrice = function(obj){
  var x = 0;
for(var i = 0; i < obj.length; i++){
x += parseFloat(obj[i].price);
} 
$scope.cartItemPrice = x;
}

$scope.sumPrice = function(obj){
sumPrice(obj);
}





var checkCart = function(){
cartApp.getCart().then(function(res){
if(res.selected.length < 1){
cartApp.emptyCart();
//$scope.launchQuery();
window.location.replace('./admin/dashboard');
}
},function(error){
  console.log(error)
})//cartApp.get
}

$scope.checkCart = ()=>{ checkCart(); }


$scope.emptyCart = function(){
$scope.checkCart();
//swindow.location.replace('./');
}

$scope.trashCart = function() {
cartApp.emptyCart();
}

$scope.removeItem = function(item) {
console.log(item)
var idx = $scope.cartItem.selected.indexOf(item);
if (idx > -1) {
$scope.cartItem.selected.splice(idx, 1);
$scope.sumPrice($scope.cartItem.selected);
let newCart = {};
newCart.vindata = $scope.cartItem.vindata;
newCart.selected = $scope.cartItem.selected;
console.log(newCart);
$scope.checkCart();
cartApp.save(newCart);
}
}

$scope.isLoading = false;
$scope.payFromWallet = function(cart){
  console.log(cart)
$scope.isLoading = true;
$scope.message = 'Checking Wallet...';
$http.post(app_url,{action:'check_bal',cart_data:cart}).then(function(rsbal){
  console.log(rsbal);
var rsi = rsbal.data;
if(rsi.is_enough){
doBuy.payAndDispatch(cart,rsi.cost,$scope).then(function(resx) {
console.log(resx);
toast.show({message:resx.mess, title:'Purchse Successful'});
if(resx.done){
$timeout(function() {
$scope.trashCart();
window.location.replace(resx.report_link);
}, 3000);
}//redirect to report page
},function(err) {
  console.log(err)
});
}//balance isEnough
else{//balance_isNotEnough
toast.show({message:'Insufficient Wallet Balance',title:'Order Purchse'})
}//balancenIsNot Enough
});//checkBalance
}


$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

}]);//checkoutCtrl

zapp.controller("notificationsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast){
$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

var app_url = 'modules/admin/adminApp.php';
var glk = {
  scope:'notifications',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
//run.getList(glk,$scope);   

dt['action_name'] = 'get_notifications';
dt['params'] = {action:'get_notifications'};
dt['feed_scope'] = 'notifications';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();


$scope.launchPreview = function(obj){
toast.show({message:obj.detail,title:'Notification'})
if(obj.status == '0'){
$http.post(app_url,
    {action:'mark_notificaion',
  id:obj.id,
  index:obj.index
}).then(function(res){
console.log(res);
if(res.data.state == '1'){
var indz = res.data.index;
$scope.notifications[indz].status = '1'
}
})
}
}

}]);//notificationsCtrlCtrl


zapp.controller("errorreportsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  '$stateParams',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  $stateParams){
$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

var app_url = 'modules/admin/adminApp.php';
var glk = {
  scope:'vin_reports',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
//run.getList(glk,$scope

$scope.url = $stateParams.url;
console.log($stateParams.url)
if(!$stateParams.url || $stateParams.url == ''){

dt['action_name'] = 'get_error_reports';
dt['params'] = {action:'get_error_reports'};
dt['feed_scope'] = 'error_reports';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();


}

else{

var appLink = app_url = 'modules/admin/adminApp.php';
$scope.listReport = function(){
para = {action:'listReport', url : $scope.url};
$http.post(appLink,para).then(function(res){
console.log(res); 
$scope.vindata = res.data.vindata.attributes;
$scope.selected_items = res.data.selected_items;
$scope.curData = res.data.data;
console.log(res.data.data);
});
}

$scope.isMailing = false;$scope.sentMess ='';
$scope.mailReport = function(uid){
$scope.isMailing = true;
para = {action:'mailReport', url : uid};
console.log(para)
$http.post(appLink,para).then(function(res){
  console.log(res)
$scope.isMailing = false;
console.log(res); 
$scope.sentMess = '<div class="'+res.data.class+'">'+res.data.mess+'</div>';
//$scope.curCheckout = res.data.status;
toast.show({message:$scope.sentMess,title:'Send Report'})
return;
});
}

$scope.downloadFile = function(obj){
console.log(obj);
$scope.selected_items[obj.index].isLoading = true;
obj.action = 'downloadMissing';
$timeout(function() {
toast.show(
    {message:`Your File is downloading...<br> 
      This will take a few minutes`,title:'Info'})
}, 5000);
console.log(app_url)
$http.post(app_url,obj).then(function(res){
console.log(res);
$scope.selected_items[obj.index].isLoading = false;
toast.close();
let rs = res.data;
toast.show(
    {message:rs.mess,title:'Info'})
if(rs.state == '1'){
$scope.selected_items[obj.index].file_downloaded = true;
}
})
}//download file


}

}]);//errorreportsCtrl


zapp.controller("reportCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

var app_url = 'modules/admin/adminApp.php';
var glk = {
  scope:'vin_reports',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
//run.getList(glk,$scope);   

dt['action_name'] = 'get_vin_reports';
dt['params'] = {action:'get_vin_reports'};
dt['feed_scope'] = 'vin_reports';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();




}]);//reportCtrl


zapp.controller("reportDetailsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  '$state',
  '$stateParams',
  'toast',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  $state,
  $stateParams,
  toast,
  modal){

$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

$scope.goTo = function(url){
var ur  = '/'+url;
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host+ur;
$window.location.assign(baseUrl);
}


$scope.url = $stateParams.url;
var appLink = app_url = 'modules/admin/adminApp.php';
$scope.listReport = function(){
para = {action:'listReport', url : $scope.url};
$http.post(appLink,para).then(function(res){
console.log(res); 
$scope.vindata = res.data.vindata.attributes;
$scope.selected_items = res.data.selected_items;
$scope.curData = res.data.data;
console.log(res.data.data);
});
}

$scope.isMailing = false;$scope.sentMess ='';
$scope.mailReport = function(uid){
$scope.isMailing = true;
para = {action:'mailReport', url : uid};
console.log(para)
$http.post(appLink,para).then(function(res){
  console.log(res)
$scope.isMailing = false;
console.log(res); 
$scope.sentMess = '<div class="'+res.data.class+'">'+res.data.mess+'</div>';
//$scope.curCheckout = res.data.status;
toast.show({message:$scope.sentMess,title:'Send Report'})
return;
});
}

$scope.downloadFile = function(obj){
console.log(obj);
$scope.selected_items[obj.index].isLoading = true;
obj.action = 'downloadMissing';
$timeout(function() {
toast.show(
    {message:`Your File is downloading...<br> 
      This will take a few minutes`,title:'Info'})
}, 5000);
console.log(app_url)
$http.post(app_url,obj).then(function(res){
console.log(res);
$scope.selected_items[obj.index].isLoading = false;
toast.close();
let rs = res.data;
toast.show(
    {message:rs.mess,title:'Info'})
if(rs.state == '1'){
$scope.selected_items[obj.index].file_downloaded = true;
}
})
}//download file

$scope.reportMissing = function(obj){
console.log(obj);
$scope.selected_items[obj.index].isLoading = true;
obj.action = 'reportMissing';
$http.post(app_url,obj).then(function(res){
console.log(res);
$scope.selected_items[obj.index].isLoading = false;
let rs = res.data;
toast.show(
    {message:rs.mess,title:'Info'})
})
}//reportMissing


}]);//reportDetailsCtrl


zapp.controller("queriesCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){

$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}
$scope.modalData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'queryCtrl',pageTitle:'VIN Query Details'};
options.data = {...item,...data};
$scope.modalData = options.data;
modal.show(options,$scope)
}


var glk = {
  scope:'vin_queries',
  loading:'isLoading',
  loaded:'isFetched',
  url:'modules/admin/adminApp.php'
}
//run.getList(glk,$scope);
///

dt['action_name'] = 'get_vin_queries';
dt['params'] = {action:'get_vin_queries'};
dt['feed_scope'] = 'vin_queries';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
    

}]);//queriesCtrl

zapp.controller("settingsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'modal',
  'run',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  modal,
  run,
  toast){
$scope.site_settings = $scope.isFetched = false;
var app_url = 'modules/admin/adminApp.php';
var glk = {
  scope:'site_settings',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
run.getList(glk,$scope);
var plk = {
  scope:'pages',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
run.getList(plk,$scope);
var flk = {
  scope:'faq',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
run.getList(flk,$scope);

$scope.settings = [];
var options = {};
$scope.$watch('isFetched',function(value){
if(value === true){
angular.forEach($scope.site_settings,function(value,key){
let obj = {};
obj['label'] = key;
obj['value'] = value;
$scope.settings.push(obj)
})
}
})


$scope.launchPad = function(mode,curval,field,name) {
let pg = (mode=='edit') ? 'edit-site.php' :  (mode=='upload') ? 'upload-stuff.php':'';
options.page = 'templates/admin/dialogs/'+pg;
options.data = {mode:mode,val:curval,field:field,name:name}
$scope.modalData = options.data;
modal.show(options,$scope)
};


$scope.launchPageEdit = function(item) {
options.page = 'templates/admin/dialogs/edit-page.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};

$scope.launchFaq = function(item) {
options.page = 'templates/admin/dialogs/add-faq.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};

$scope.launchFaqEdit = function(item) {
options.page = 'templates/admin/dialogs/edit-faq.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};


$scope.editField = function(data){
$http.post(app_url,data).then(function(res){
console.log(res);
var rs = res.data;
toast.show({message:rs.mess,title:'Admin Settings'})
})
}


}]);//apiCtrl

zapp.controller("payCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){
    var app_url = 'modules/admin/adminApp.php';
    var glk = {
      scope:'payments',
      loading:'isLoading',
      loaded:'isFetched',
      url:app_url
    }
//run.getList(glk,$scope);   
dt['action_name'] = 'get_payments';
dt['params'] = {action:'get_payments'};
dt['feed_scope'] = 'payments';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();


$scope.modalData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'paymentCtrl',pageTitle:'Payment Details'};
options.data = {...item,...data};
$scope.modalData = options.data;
modal.show(options,$scope)
}

$scope.submitPay = ()=>{
var options = {data:{}}
options.page = 'templates/dialogs/submit_pay.html';
modal.show(options,$scope);
}


$scope.sendPayment = function(data){
data.action = 'submitPayment';
data.date = (new Date(data.date).getTime())/1000;
data.amount = data.dueAmount*100;
data.transactionName = 'Wallet Funding';
console.log(data);
$http.post('modules/payApp.php',data).then(function(res){
var rs = res.data;
console.log(rs);
if(rs.uid > 0){
$scope.payments.unshift(rs.pay_data);
 $scope.imessage = `<div class="good px10 py10"> <i class="fas fa-check-circle status-active"></i> &nbsp;Your Payment notification has been received.
  You will be notified when it is approved</div>`;
  $scope.hideForm = true;
}else{
 $scope.imessage = `<div class="error px10 py10"><i class="fas fa-exclamation-triangle status-cancelled"></i> &nbsp;Your Payment notification failed to be submitted at this time.
  Try again later</div>`;
    $scope.hideForm = false;
}  

});
}


$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

}]);//payCtrl

zapp.controller("usersCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast){
    var app_url = 'modules/admin/adminApp.php';
    var glk = {
      scope:'users',
      loading:'isLoading',
      loaded:'isFetched',
      url:app_url
    }
    //run.getList(glk,$scope);   

   
dt['action_name'] = 'get_users';
dt['params'] = {action:'get_users'};
dt['feed_scope'] = 'users';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 100;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(fp){
$scope[dt['feed_rows']] = (fp && fp !=='') ? fp:$scope[dt['feed_rows']];
console.log(dt)
run.getloadMore(dt,$scope);
}


$scope.loadMore();




$scope.modalData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'subAccountCtrl',pageTitle:'Account Details'};
options.data = {...item,...data};
$scope.modalData = options.data;
modal.show(options,$scope)
}

$scope.launchSubber = function(item){
options.page = 'templates/dialogs/new_sub_account.html';
var data = {ctrl:'subAccountCtrl',pageTitle:'Account Details'};
options.data = data;
$scope.ldata = options.data;
modal.show(options,$scope)
}



$scope.isFinishedRegister = false;
$scope.createSubAccount = function(rdata){
console.log(rdata);
$scope.isLoading = true;
$scope.reg_notice = '';
rdata.action = 'createSubAccount';
$http.post(app_url,rdata).then(function(res) {
  console.log(res)
var rs = res.data,
rmess = rs.mess,
rclass = rs.class;
var ntc = '<div class="'+rclass+'">'+rmess+'</div><br>';
ntc += "";
rs.password = rdata.password;
$scope.reg_notice = ntc;
$scope.isLoading = false;
  toast.show({message:ntc,title:'New Sub Account'})
if(rs.state==1){
$scope.isFinishedRegister = true;
$scope.sub_accounts = $scope.sub_accounts.unshift(rs.account_data);
}else if(rs.state=='0'){
$scope.isFinishedRegister = false;
}
$scope.isLoading = false; 
}, function(e) {
  console.log(e)
var ntl = '<div class="error">Network Error! Please Try again later.</div>';
toast.show({message:ntl,title:'New Sub Account'})
});

}



$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}


$scope.editField = function(data){
$http.post(app_url,data).then(function(res){
console.log(res);
var rs = res.data;
toast.show({message:rs.mess, title:'User Account'})
})
}

$scope.launchUserDel = function(id) {
if (confirm('Are you sure you want to Remove this User?')) {
return $scope.editField({action:'delUser',id:id});
}
 return false;
}

$scope.launchUserBlock = function(id,type) {
if(type == '-1'){
var qxb = 'Are you sure you want to Block this User?';
}else{
var qxb = 'Are you sure you want to UnBlock this User?';
}
if (confirm(qxb)) {
return $scope.editField({action:'blockUser',id:id,type:type});
}
return false;
}


$scope.launchAdm = function(id,type) {
if(type=='user'){
var qx = 'Are you sure you want to make this person a normal user?';
}else{
var qx = 'Are you sure you want to make this person a site admin?';
}
if (confirm(qx)) {
return $scope.editField({action:'makeAdmin',id:id,type:type});
}
return false;
}

$scope.launchUlog = function(id) {
if (confirm('Are you sure you want to Login As this User?')) {
return $scope.editField({action:'loginAs',id:id});
}
return false;
}



$scope.launchUserEdit = function(item) {
options.page = 'templates/admin/dialogs/user-edit.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};



$scope.launchAcc = function(type,id) {
options.page = 'templates/admin/dialogs/acc-tranx.php';
options.data = {type:type,id:id}
$scope.modalData = options.data;
modal.show(options,$scope)
};


}]);//accountsCtrl

zapp.controller("messagesxxCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast){
    var app_url = 'modules/admin/adminApp.php';
    var glk = {
      scope:'messages',
      loading:'isLoading',
      loaded:'isFetched',
      url:app_url
    }
    //run.getList(glk,$scope);   

   
dt['action_name'] = 'get_messages';
dt['params'] = {action:'get_messages'};
dt['feed_scope'] = 'messages';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();

var options = {};

$scope.launchMess = function(obj){
obj.action = 'sendMail';
options.page = 'templates/dialogs/compose_message.html';
var data = obj;
options.data = data;
$scope.rp = options.data;
modal.show(options,$scope)
}

$scope.reply = function(ev,pid,mode,data,receiver){
  console.log(receiver)
$scope.launchSend(ev,pid,mode,data,receiver);  
};

$scope.doAct = function(ldata){
var applink = 'modules/admin/adminApp.php';
console.log(ldata);
$http.post(applink,ldata).then(function(res){
console.log(res);
var rs = res.data;
toast.show({message:rs.mess,title:'Message'})
})
}//doAct


}]);//messagesCtrl



